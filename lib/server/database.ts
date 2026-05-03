import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { crmUsers, initialLeads } from "@/data/crm";
import { initialInventory } from "@/data/inventory";
import { initialServiceOrders } from "@/data/service";
import { initialTradeInRequests } from "@/data/trade-in";
import type { CreateEmployeeValues, CarInquiryValues, ContactFormValues, ServiceFormValues, TradeInFormValues } from "@/lib/form-schemas";
import type { InventoryItem } from "@/types/inventory-item";
import type { Lead } from "@/types/lead";
import type { ServiceOrder } from "@/types/service-order";
import type { TradeInPhoto, TradeInRequest } from "@/types/trade-in-request";
import type { User } from "@/types/user";

type DbLeadRow = {
  id: string;
  source: string;
  name: string;
  phone: string;
  email: string | null;
  status: Lead["status"];
  priority: Lead["priority"];
  created_at: string;
  updated_at: string | null;
  vehicle_label: string | null;
  comment: string | null;
  appointment_at: string | null;
  manager_id: string | null;
  payload: string;
};

type DbServiceRow = {
  id: string;
  customer_name: string;
  phone: string;
  car: string;
  plate: string;
  service_type: string;
  appointment_at: string;
  advisor_id: string;
  mechanic_id: string | null;
  status: ServiceOrder["status"];
  note: string | null;
  created_at: string;
};

type DbTradeInRow = {
  id: string;
  customer_name: string;
  phone: string;
  current_car: string;
  desired_car: string | null;
  year: number;
  mileage: number;
  vin: string | null;
  appraiser_id: string | null;
  estimated_value: number | null;
  status: TradeInRequest["status"];
  comment: string | null;
  created_at: string;
};

type DbPhotoRow = {
  id: string;
  request_id: string;
  url: string;
  original_name: string;
};

const storageDir = path.join(process.cwd(), "storage");
const databasePath = path.join(storageDir, "aurum.sqlite");

let database: DatabaseSync | null = null;
let databaseInitialized = false;

function toLeadSource(source: string) {
  return source === "test-drive"
    ? "test-drive"
    : source === "trade-in"
      ? "trade-in"
      : source;
}

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getDatabase() {
  if (!database) {
    mkdirSync(storageDir, { recursive: true });
    database = new DatabaseSync(databasePath);
    database.exec("PRAGMA foreign_keys = ON");
  }

  if (!databaseInitialized) {
    initializeDatabase(database);
    databaseInitialized = true;
  }

  return database;
}

function initializeDatabase(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      avatar_url TEXT,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      workload INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT,
      vehicle_label TEXT,
      comment TEXT,
      appointment_at TEXT,
      manager_id TEXT,
      payload TEXT NOT NULL,
      FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS service_orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      car TEXT NOT NULL,
      plate TEXT NOT NULL,
      service_type TEXT NOT NULL,
      appointment_at TEXT NOT NULL,
      advisor_id TEXT NOT NULL,
      mechanic_id TEXT,
      status TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(advisor_id) REFERENCES employees(id) ON DELETE RESTRICT,
      FOREIGN KEY(mechanic_id) REFERENCES employees(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS trade_in_requests (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      current_car TEXT NOT NULL,
      desired_car TEXT,
      year INTEGER NOT NULL,
      mileage INTEGER NOT NULL,
      vin TEXT,
      appraiser_id TEXT,
      estimated_value INTEGER,
      status TEXT NOT NULL,
      comment TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY(appraiser_id) REFERENCES employees(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS trade_in_photos (
      id TEXT PRIMARY KEY,
      request_id TEXT NOT NULL,
      url TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(request_id) REFERENCES trade_in_requests(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS inventory_items (
      car_id TEXT PRIMARY KEY,
      visible INTEGER NOT NULL,
      featured INTEGER NOT NULL,
      status TEXT NOT NULL,
      location TEXT NOT NULL,
      manager_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(manager_id) REFERENCES employees(id) ON DELETE SET NULL
    );
  `);
}

function withTransaction<T>(callback: (db: DatabaseSync) => T) {
  const db = getDatabase();
  db.exec("BEGIN");

  try {
    const result = callback(db);
    db.exec("COMMIT");
    return result;
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function mapUser(row: Record<string, unknown>): User {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone ? String(row.phone) : undefined,
    avatarUrl: row.avatar_url ? String(row.avatar_url) : undefined,
    role: row.role as User["role"],
    status: row.status as User["status"],
    workload: typeof row.workload === "number" ? row.workload : undefined
  };
}

function mapLead(row: DbLeadRow): Lead {
  return {
    id: row.id,
    source: toLeadSource(row.source) as Lead["source"],
    name: row.name,
    phone: row.phone,
    email: row.email ?? undefined,
    status: row.status,
    priority: row.priority,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? undefined,
    vehicleLabel: row.vehicle_label ?? undefined,
    comment: row.comment ?? undefined,
    appointmentAt: row.appointment_at ?? undefined,
    managerId: row.manager_id ?? undefined,
    payload: parseJson(row.payload, {})
  };
}

function mapServiceOrder(row: DbServiceRow): ServiceOrder {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    car: row.car,
    plate: row.plate,
    serviceType: row.service_type,
    appointmentAt: row.appointment_at,
    advisorId: row.advisor_id,
    mechanicId: row.mechanic_id ?? undefined,
    status: row.status,
    note: row.note ?? undefined,
    createdAt: row.created_at
  };
}

function mapInventory(row: Record<string, unknown>): InventoryItem {
  return {
    carId: String(row.car_id),
    visible: Number(row.visible) === 1,
    featured: Number(row.featured) === 1,
    status: row.status as InventoryItem["status"],
    location: String(row.location),
    managerId: row.manager_id ? String(row.manager_id) : undefined
  };
}

function mapTradeInRequest(row: DbTradeInRow, photosByRequestId: Map<string, TradeInPhoto[]>): TradeInRequest {
  const photos = photosByRequestId.get(row.id) ?? [];

  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    currentCar: row.current_car,
    desiredCar: row.desired_car ?? undefined,
    year: row.year,
    mileage: row.mileage,
    vin: row.vin ?? undefined,
    appraiserId: row.appraiser_id ?? undefined,
    estimatedValue: row.estimated_value ?? undefined,
    status: row.status,
    photosCount: photos.length,
    photos,
    comment: row.comment ?? undefined,
    createdAt: row.created_at
  };
}

function getLowestWorkloadEmployee(role: User["role"]) {
  const db = getDatabase();
  const row = db
    .prepare(
      `
        SELECT id
        FROM employees
        WHERE role = ? AND status = 'active'
        ORDER BY COALESCE(workload, 0) ASC, created_at ASC
        LIMIT 1
      `
    )
    .get(role) as { id?: string } | undefined;

  return row?.id ?? null;
}

export function ensureDatabaseSeeded() {
  const db = getDatabase();
  const countRow = db.prepare("SELECT COUNT(*) AS count FROM employees").get() as {
    count: number;
  };

  if (countRow.count > 0) {
    return;
  }

  withTransaction((tx) => {
    const employeeStatement = tx.prepare(`
      INSERT INTO employees (id, name, email, phone, avatar_url, role, status, workload, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const user of crmUsers) {
      const now = new Date().toISOString();
      employeeStatement.run(
        user.id,
        user.name,
        user.email,
        user.phone ?? null,
        user.avatarUrl ?? null,
        user.role,
        user.status,
        user.workload ?? 0,
        now,
        now
      );
    }

    const leadStatement = tx.prepare(`
      INSERT INTO leads
        (id, source, name, phone, email, status, priority, created_at, updated_at, vehicle_label, comment, appointment_at, manager_id, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const lead of initialLeads) {
      leadStatement.run(
        lead.id,
        lead.source,
        lead.name,
        lead.phone,
        lead.email ?? null,
        lead.status,
        lead.priority,
        lead.createdAt,
        lead.updatedAt ?? null,
        lead.vehicleLabel ?? null,
        lead.comment ?? null,
        lead.appointmentAt ?? null,
        lead.managerId ?? null,
        JSON.stringify(lead.payload)
      );
    }

    const serviceStatement = tx.prepare(`
      INSERT INTO service_orders
        (id, customer_name, phone, car, plate, service_type, appointment_at, advisor_id, mechanic_id, status, note, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const order of initialServiceOrders) {
      serviceStatement.run(
        order.id,
        order.customerName,
        order.phone,
        order.car,
        order.plate,
        order.serviceType,
        order.appointmentAt,
        order.advisorId,
        order.mechanicId ?? null,
        order.status,
        order.note ?? null,
        order.createdAt
      );
    }

    const tradeInStatement = tx.prepare(`
      INSERT INTO trade_in_requests
        (id, customer_name, phone, current_car, desired_car, year, mileage, vin, appraiser_id, estimated_value, status, comment, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const request of initialTradeInRequests) {
      tradeInStatement.run(
        request.id,
        request.customerName,
        request.phone,
        request.currentCar,
        request.desiredCar ?? null,
        request.year,
        request.mileage,
        request.vin ?? null,
        request.appraiserId ?? null,
        request.estimatedValue ?? null,
        request.status,
        request.comment ?? null,
        request.createdAt
      );
    }

    const inventoryStatement = tx.prepare(`
      INSERT INTO inventory_items
        (car_id, visible, featured, status, location, manager_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of initialInventory) {
      const now = new Date().toISOString();
      inventoryStatement.run(
        item.carId,
        item.visible ? 1 : 0,
        item.featured ? 1 : 0,
        item.status,
        item.location,
        item.managerId ?? null,
        now,
        now
      );
    }
  });
}

export function getAdminSnapshot() {
  ensureDatabaseSeeded();
  const db = getDatabase();

  const users = db
    .prepare("SELECT * FROM employees ORDER BY created_at ASC")
    .all()
    .map((row) => mapUser(row as Record<string, unknown>));

  const leads = db
    .prepare("SELECT * FROM leads ORDER BY created_at DESC")
    .all()
    .map((row) => mapLead(row as DbLeadRow));

  const serviceOrders = db
    .prepare("SELECT * FROM service_orders ORDER BY appointment_at ASC")
    .all()
    .map((row) => mapServiceOrder(row as DbServiceRow));

  const tradeRows = db
    .prepare("SELECT * FROM trade_in_requests ORDER BY created_at DESC")
    .all() as DbTradeInRow[];

  const photoRows = db
    .prepare("SELECT id, request_id, url, original_name FROM trade_in_photos ORDER BY created_at DESC")
    .all() as DbPhotoRow[];

  const photosByRequestId = new Map<string, TradeInPhoto[]>();

  for (const photo of photoRows) {
    const bucket = photosByRequestId.get(photo.request_id) ?? [];
    bucket.push({
      id: photo.id,
      url: photo.url,
      originalName: photo.original_name
    });
    photosByRequestId.set(photo.request_id, bucket);
  }

  const tradeInRequests = tradeRows.map((row) => mapTradeInRequest(row, photosByRequestId));

  const inventory = db
    .prepare("SELECT * FROM inventory_items ORDER BY car_id ASC")
    .all()
    .map((row) => mapInventory(row as Record<string, unknown>));

  return {
    users,
    leads,
    serviceOrders,
    tradeInRequests,
    inventory
  };
}

export function createEmployee(values: CreateEmployeeValues) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO employees (id, name, email, phone, avatar_url, role, status, workload, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, values.name, values.email, values.phone || null, null, values.role, values.status, 0, now, now);

  return {
    id,
    name: values.name,
    email: values.email,
    phone: values.phone || undefined,
    role: values.role,
    status: values.status,
    workload: 0
  } satisfies User;
}

export function updateEmployee(
  id: string,
  updates: Partial<Pick<User, "role" | "status">>
) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const fields: string[] = [];
  const values: Array<string> = [];

  if (updates.role) {
    fields.push("role = ?");
    values.push(updates.role);
  }

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  fields.push("updated_at = ?");
  values.push(new Date().toISOString(), id);

  db.prepare(`UPDATE employees SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  const row = db.prepare("SELECT * FROM employees WHERE id = ?").get(id);
  return mapUser(row as Record<string, unknown>);
}

export function updateLeadRecord(
  id: string,
  updates: Partial<Pick<Lead, "status" | "managerId">>
) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const fields: string[] = [];
  const values: Array<string | null> = [];

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  if (updates.managerId !== undefined) {
    fields.push("manager_id = ?");
    values.push(updates.managerId || null);
  }

  fields.push("updated_at = ?");
  values.push(new Date().toISOString(), id);

  db.prepare(`UPDATE leads SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as DbLeadRow;
  return mapLead(row);
}

export function updateServiceOrderRecord(
  id: string,
  updates: Partial<Pick<ServiceOrder, "advisorId" | "mechanicId" | "status">>
) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const fields: string[] = [];
  const values: Array<string | null> = [];

  if (updates.advisorId) {
    fields.push("advisor_id = ?");
    values.push(updates.advisorId);
  }

  if (updates.mechanicId !== undefined) {
    fields.push("mechanic_id = ?");
    values.push(updates.mechanicId || null);
  }

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  values.push(id);
  db.prepare(`UPDATE service_orders SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  const row = db.prepare("SELECT * FROM service_orders WHERE id = ?").get(id) as DbServiceRow;
  return mapServiceOrder(row);
}

export function updateTradeInRequestRecord(
  id: string,
  updates: Partial<Pick<TradeInRequest, "appraiserId" | "status" | "estimatedValue">>
) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const fields: string[] = [];
  const values: Array<string | number | null> = [];

  if (updates.appraiserId !== undefined) {
    fields.push("appraiser_id = ?");
    values.push(updates.appraiserId || null);
  }

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  if (updates.estimatedValue !== undefined) {
    fields.push("estimated_value = ?");
    values.push(updates.estimatedValue || null);
  }

  values.push(id);
  db.prepare(`UPDATE trade_in_requests SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  const requestRow = db.prepare("SELECT * FROM trade_in_requests WHERE id = ?").get(id) as DbTradeInRow;
  const photos = db
    .prepare("SELECT id, request_id, url, original_name FROM trade_in_photos WHERE request_id = ? ORDER BY created_at DESC")
    .all(id) as DbPhotoRow[];

  const photoMap = new Map<string, TradeInPhoto[]>([
    [
      id,
      photos.map((photo) => ({
        id: photo.id,
        url: photo.url,
        originalName: photo.original_name
      }))
    ]
  ]);

  return mapTradeInRequest(requestRow, photoMap);
}

export function updateInventoryRecord(
  carId: string,
  updates: Partial<Pick<InventoryItem, "visible" | "featured" | "status" | "managerId">>
) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const fields: string[] = [];
  const values: Array<string | number | null> = [];

  if (updates.visible !== undefined) {
    fields.push("visible = ?");
    values.push(updates.visible ? 1 : 0);
  }

  if (updates.featured !== undefined) {
    fields.push("featured = ?");
    values.push(updates.featured ? 1 : 0);
  }

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  if (updates.managerId !== undefined) {
    fields.push("manager_id = ?");
    values.push(updates.managerId || null);
  }

  fields.push("updated_at = ?");
  values.push(new Date().toISOString(), carId);
  db.prepare(`UPDATE inventory_items SET ${fields.join(", ")} WHERE car_id = ?`).run(...values);
  const row = db.prepare("SELECT * FROM inventory_items WHERE car_id = ?").get(carId);
  return mapInventory(row as Record<string, unknown>);
}

export function createContactLead(values: ContactFormValues) {
  ensureDatabaseSeeded();
  const db = getDatabase();

  db.prepare(`
    INSERT INTO leads
      (id, source, name, phone, email, status, priority, created_at, updated_at, vehicle_label, comment, appointment_at, manager_id, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    crypto.randomUUID(),
    "contact",
    values.name,
    values.phone,
    null,
    "new",
    "medium",
    new Date().toISOString(),
    null,
    null,
    values.message,
    null,
    null,
    JSON.stringify({ topic: values.topic })
  );
}

export function createCarInquiryLead(values: CarInquiryValues) {
  ensureDatabaseSeeded();
  const db = getDatabase();
  const appointmentAt =
    values.requestType === "test-drive" && values.preferredDate && values.preferredTime
      ? `${values.preferredDate}T${values.preferredTime}:00.000Z`
      : null;

  db.prepare(`
    INSERT INTO leads
      (id, source, name, phone, email, status, priority, created_at, updated_at, vehicle_label, comment, appointment_at, manager_id, payload)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    crypto.randomUUID(),
    values.requestType === "test-drive" ? "test-drive" : values.requestType === "credit" ? "credit" : "purchase",
    values.name,
    values.phone,
    null,
    "new",
    values.requestType === "test-drive" ? "high" : "medium",
    new Date().toISOString(),
    null,
    values.carLabel,
    values.comment || null,
    appointmentAt,
    null,
    JSON.stringify({
      requestType: values.requestType,
      carId: values.carId,
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime
    })
  );
}

export function createServiceRequest(values: ServiceFormValues) {
  ensureDatabaseSeeded();
  const defaultAdvisorId = getLowestWorkloadEmployee("service_manager");

  if (!defaultAdvisorId) {
    throw new Error("Не найден сервис-менеджер");
  }

  const appointmentAt = `${values.date}T10:00:00.000Z`;

  withTransaction((db) => {
    db.prepare(`
      INSERT INTO service_orders
        (id, customer_name, phone, car, plate, service_type, appointment_at, advisor_id, mechanic_id, status, note, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      values.name,
      values.phone,
      values.car,
      values.plate,
      values.serviceType,
      appointmentAt,
      defaultAdvisorId,
      null,
      "new",
      values.note || null,
      new Date().toISOString()
    );

    db.prepare(`
      INSERT INTO leads
        (id, source, name, phone, email, status, priority, created_at, updated_at, vehicle_label, comment, appointment_at, manager_id, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      "service",
      values.name,
      values.phone,
      null,
      "new",
      "medium",
      new Date().toISOString(),
      null,
      values.car,
      values.note || null,
      appointmentAt,
      defaultAdvisorId,
      JSON.stringify({
        plate: values.plate,
        serviceType: values.serviceType,
        preferredDate: values.date
      })
    );
  });
}

export function createTradeInRequestRecord(
  values: TradeInFormValues,
  photos: Array<{ url: string; originalName: string; mimeType: string; size: number }>
) {
  ensureDatabaseSeeded();
  const defaultAppraiserId = getLowestWorkloadEmployee("trade_in_appraiser");

  if (!defaultAppraiserId) {
    throw new Error("Не найден оценщик trade-in");
  }

  const currentCar = `${values.brand} ${values.model}`.trim();
  const requestId = crypto.randomUUID();

  withTransaction((db) => {
    db.prepare(`
      INSERT INTO trade_in_requests
        (id, customer_name, phone, current_car, desired_car, year, mileage, vin, appraiser_id, estimated_value, status, comment, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      requestId,
      values.name,
      values.phone,
      currentCar,
      values.desiredCar || null,
      values.year,
      values.mileage,
      values.vin || null,
      defaultAppraiserId,
      null,
      "new",
      values.comment || null,
      new Date().toISOString()
    );

    const photoStatement = db.prepare(`
      INSERT INTO trade_in_photos (id, request_id, url, original_name, mime_type, size, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const photo of photos) {
      photoStatement.run(
        crypto.randomUUID(),
        requestId,
        photo.url,
        photo.originalName,
        photo.mimeType,
        photo.size,
        new Date().toISOString()
      );
    }

    db.prepare(`
      INSERT INTO leads
        (id, source, name, phone, email, status, priority, created_at, updated_at, vehicle_label, comment, appointment_at, manager_id, payload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      crypto.randomUUID(),
      "trade-in",
      values.name,
      values.phone,
      null,
      "new",
      "medium",
      new Date().toISOString(),
      null,
      currentCar,
      values.comment || null,
      null,
      defaultAppraiserId,
      JSON.stringify({
        desiredCar: values.desiredCar,
        vin: values.vin,
        mileage: values.mileage,
        photosCount: photos.length
      })
    );
  });

  return {
    requestId,
    photosCount: photos.length
  };
}
