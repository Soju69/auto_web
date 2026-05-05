-- PostgreSQL schema for АВТО СИТИ ПРО
-- Run in psql or pgAdmin after creating the database:
-- CREATE DATABASE auto_city_pro;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'sales_manager', 'service_manager', 'mechanic', 'trade_in_appraiser');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE user_status AS ENUM ('active', 'vacation', 'blocked');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_source AS ENUM ('purchase', 'credit', 'test_drive', 'service', 'trade_in', 'insurance', 'consultation', 'contact');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'in_progress', 'meeting_scheduled', 'sold', 'declined');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_priority AS ENUM ('high', 'medium', 'low');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE service_order_status AS ENUM ('new', 'confirmed', 'in_progress', 'completed', 'canceled');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE trade_in_request_status AS ENUM ('new', 'inspection', 'offer_prepared', 'accepted', 'declined', 'revaluation');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE inventory_status AS ENUM ('available', 'reserved', 'sold', 'hidden');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE warehouse_category AS ENUM ('part', 'accessory');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name varchar(160) NOT NULL,
  email varchar(180) NOT NULL UNIQUE,
  phone varchar(40),
  password_hash varchar(255) NOT NULL,
  role user_role NOT NULL,
  status user_status NOT NULL DEFAULT 'active',
  workload integer NOT NULL DEFAULT 0 CHECK (workload >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name varchar(160) NOT NULL,
  phone varchar(40) NOT NULL UNIQUE,
  email varchar(180),
  password_hash varchar(255) NOT NULL,
  passport_series varchar(20),
  passport_number varchar(20),
  address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cars (
  id varchar(80) PRIMARY KEY,
  brand varchar(80) NOT NULL,
  model varchar(120) NOT NULL,
  trim varchar(120),
  year integer NOT NULL CHECK (year BETWEEN 1980 AND 2035),
  vin varchar(40) UNIQUE,
  color varchar(80),
  body_type varchar(80),
  fuel_type varchar(80),
  transmission varchar(80),
  drivetrain varchar(80),
  mileage integer NOT NULL DEFAULT 0 CHECK (mileage >= 0),
  price numeric(12, 2) NOT NULL CHECK (price >= 0),
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS car_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id varchar(80) NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory_items (
  car_id varchar(80) PRIMARY KEY REFERENCES cars(id) ON DELETE CASCADE,
  visible boolean NOT NULL DEFAULT true,
  featured boolean NOT NULL DEFAULT false,
  status inventory_status NOT NULL DEFAULT 'available',
  location varchar(120) NOT NULL,
  manager_id uuid REFERENCES employees(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source lead_source NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  customer_name varchar(160) NOT NULL,
  phone varchar(40) NOT NULL,
  email varchar(180),
  status lead_status NOT NULL DEFAULT 'new',
  priority lead_priority NOT NULL DEFAULT 'medium',
  vehicle_label varchar(220),
  car_id varchar(80) REFERENCES cars(id) ON DELETE SET NULL,
  comment text,
  appointment_at timestamptz,
  manager_id uuid REFERENCES employees(id) ON DELETE SET NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS service_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  customer_name varchar(160) NOT NULL,
  phone varchar(40) NOT NULL,
  car varchar(180) NOT NULL,
  plate varchar(40) NOT NULL,
  service_type varchar(120) NOT NULL,
  appointment_at timestamptz NOT NULL,
  advisor_id uuid REFERENCES employees(id) ON DELETE RESTRICT,
  mechanic_id uuid REFERENCES employees(id) ON DELETE SET NULL,
  status service_order_status NOT NULL DEFAULT 'new',
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS trade_in_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  customer_name varchar(160) NOT NULL,
  phone varchar(40) NOT NULL,
  current_car varchar(180) NOT NULL,
  desired_car varchar(180),
  year integer NOT NULL CHECK (year BETWEEN 1980 AND 2035),
  mileage integer NOT NULL CHECK (mileage >= 0),
  vin varchar(40),
  appraiser_id uuid REFERENCES employees(id) ON DELETE SET NULL,
  estimated_value numeric(12, 2) CHECK (estimated_value >= 0),
  status trade_in_request_status NOT NULL DEFAULT 'new',
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS trade_in_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES trade_in_requests(id) ON DELETE CASCADE,
  url text NOT NULL,
  original_name varchar(255) NOT NULL,
  mime_type varchar(120) NOT NULL,
  size integer NOT NULL CHECK (size >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS warehouse_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku varchar(120) NOT NULL UNIQUE,
  name varchar(180) NOT NULL,
  category warehouse_category NOT NULL,
  compatible_with varchar(220) NOT NULL DEFAULT 'Все модели',
  quantity integer NOT NULL DEFAULT 0 CHECK (quantity >= 0),
  min_quantity integer NOT NULL DEFAULT 0 CHECK (min_quantity >= 0),
  unit varchar(40) NOT NULL DEFAULT 'шт.',
  location varchar(120) NOT NULL,
  supplier varchar(160) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_manager_id ON leads(manager_id);
CREATE INDEX IF NOT EXISTS idx_service_orders_status ON service_orders(status);
CREATE INDEX IF NOT EXISTS idx_service_orders_advisor_id ON service_orders(advisor_id);
CREATE INDEX IF NOT EXISTS idx_trade_in_requests_status ON trade_in_requests(status);
CREATE INDEX IF NOT EXISTS idx_trade_in_requests_appraiser_id ON trade_in_requests(appraiser_id);
CREATE INDEX IF NOT EXISTS idx_warehouse_items_category ON warehouse_items(category);
CREATE INDEX IF NOT EXISTS idx_warehouse_items_low_stock ON warehouse_items(quantity, min_quantity);

INSERT INTO employees (id, full_name, email, phone, password_hash, role, status, workload)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Мария Белова', 'admin@autocitypro.ru', NULL, 'admin123', 'admin', 'active', 4),
  ('00000000-0000-0000-0000-000000000002', 'Илья Орлов', 'sales1@autocitypro.ru', NULL, 'admin123', 'sales_manager', 'active', 7),
  ('00000000-0000-0000-0000-000000000003', 'Роман Соколов', 'service@autocitypro.ru', NULL, 'admin123', 'service_manager', 'active', 6),
  ('00000000-0000-0000-0000-000000000004', 'Олег Сафонов', 'mechanic@autocitypro.ru', NULL, 'admin123', 'mechanic', 'active', 8),
  ('00000000-0000-0000-0000-000000000005', 'Дмитрий Волков', 'tradein@autocitypro.ru', NULL, 'admin123', 'trade_in_appraiser', 'active', 3)
ON CONFLICT (email) DO NOTHING;

INSERT INTO cars (id, brand, model, trim, year, vin, color, fuel_type, transmission, drivetrain, mileage, price, description)
VALUES
  ('kia-k5-gt-line', 'KIA', 'K5', 'GT-Line', 2024, 'KIAK5DEMO00000001', 'Белый', 'Бензин', 'Автомат', 'Передний', 8200, 3890000, 'Бизнес-седан с комплектацией GT-Line.'),
  ('hyundai-tucson-visioner', 'Hyundai', 'Tucson', 'Visioner', 2023, 'HYUTUCSONDEMO001', 'Серый', 'Бензин', 'Автомат', 'Полный', 15200, 4190000, 'Кроссовер для ежедневной эксплуатации.'),
  ('zeekr-001-you-edition', 'Zeekr', '001', 'YOU Edition', 2024, 'ZEEKR001DEMO0001', 'Черный', 'Электро', 'Редуктор', 'Полный', 5400, 7190000, 'Премиальный электрический лифтбек.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO inventory_items (car_id, visible, featured, status, location, manager_id)
VALUES
  ('kia-k5-gt-line', true, true, 'available', 'Шоурум A-01', '00000000-0000-0000-0000-000000000002'),
  ('hyundai-tucson-visioner', true, false, 'available', 'Шоурум B-02', '00000000-0000-0000-0000-000000000002'),
  ('zeekr-001-you-edition', true, true, 'reserved', 'Шоурум EV-01', '00000000-0000-0000-0000-000000000002')
ON CONFLICT (car_id) DO NOTHING;

INSERT INTO warehouse_items (sku, name, category, compatible_with, quantity, min_quantity, unit, location, supplier)
VALUES
  ('KIA-OIL-25GDI', 'Масляный фильтр 2.5 GDI', 'part', 'KIA K5, Hyundai Sonata', 18, 6, 'шт.', 'A-01-03', 'Mobis Parts'),
  ('HYU-BRK-TUC', 'Комплект передних колодок', 'part', 'Hyundai Tucson', 5, 8, 'компл.', 'A-02-01', 'Hyundai Genuine'),
  ('EV-CABLE-GB', 'Зарядный кабель Type 2', 'accessory', 'KIA EV6, Zeekr, Xiaomi SU7', 12, 4, 'шт.', 'B-04-02', 'EV Service')
ON CONFLICT (sku) DO NOTHING;
