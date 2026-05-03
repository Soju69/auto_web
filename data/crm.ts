import type { Lead, LeadSource, LeadStatus } from "@/types/lead";
import type { User, UserRole } from "@/types/user";

export const crmUsers: User[] = [
  {
    id: "u-admin",
    name: "Мария Белова",
    email: "admin@aurummotors.ru",
    role: "admin",
    status: "active",
    workload: 4
  },
  {
    id: "u-sales-1",
    name: "Илья Орлов",
    email: "sales1@aurummotors.ru",
    role: "sales_manager",
    status: "active",
    workload: 7
  },
  {
    id: "u-sales-2",
    name: "Анна Трофимова",
    email: "sales2@aurummotors.ru",
    role: "sales_manager",
    status: "active",
    workload: 5
  },
  {
    id: "u-service",
    name: "Роман Соколов",
    email: "service@aurummotors.ru",
    role: "service_manager",
    status: "active",
    workload: 6
  },
  {
    id: "u-service-2",
    name: "Наталья Егорова",
    email: "service2@aurummotors.ru",
    role: "service_manager",
    status: "active",
    workload: 4
  },
  {
    id: "u-mechanic",
    name: "Олег Сафонов",
    email: "mechanic@aurummotors.ru",
    role: "mechanic",
    status: "active",
    workload: 8
  },
  {
    id: "u-mechanic-2",
    name: "Кирилл Лавров",
    email: "mechanic2@aurummotors.ru",
    role: "mechanic",
    status: "active",
    workload: 5
  },
  {
    id: "u-appraiser",
    name: "Дмитрий Волков",
    email: "tradein@aurummotors.ru",
    role: "trade_in_appraiser",
    status: "active",
    workload: 3
  },
  {
    id: "u-appraiser-2",
    name: "Елена Самойлова",
    email: "tradein2@aurummotors.ru",
    role: "trade_in_appraiser",
    status: "active",
    workload: 5
  }
];

export const initialLeads: Lead[] = [
  {
    id: "lead-001",
    source: "purchase",
    name: "Александр Кунин",
    phone: "+7 916 555-11-24",
    email: "kunin@example.com",
    status: "new",
    priority: "high",
    createdAt: "2026-05-01T09:15:00.000Z",
    vehicleLabel: "Xiaomi SU7 Max",
    comment: "Хочет быстрый показ и расчёт по кредиту.",
    managerId: "u-sales-1",
    payload: {
      channel: "сайт",
      budget: "до 8 млн ₽"
    }
  },
  {
    id: "lead-002",
    source: "purchase",
    name: "Екатерина Лебедева",
    phone: "+7 926 111-40-88",
    status: "in_progress",
    priority: "medium",
    createdAt: "2026-05-01T08:30:00.000Z",
    updatedAt: "2026-05-01T10:40:00.000Z",
    vehicleLabel: "Zeekr 001 YOU Edition",
    comment: "Просит бронь до субботы.",
    managerId: "u-sales-2",
    payload: {
      channel: "telegram",
      city: "Москва"
    }
  },
  {
    id: "lead-003",
    source: "test-drive",
    name: "Игорь Демин",
    phone: "+7 903 220-14-77",
    status: "meeting_scheduled",
    priority: "high",
    createdAt: "2026-05-01T07:10:00.000Z",
    appointmentAt: "2026-05-02T12:30:00.000Z",
    vehicleLabel: "KIA EV6 Long Range",
    managerId: "u-sales-1",
    payload: {
      requestedDate: "2026-05-02",
      requestedTime: "12:30"
    }
  },
  {
    id: "lead-004",
    source: "service",
    name: "Сергей Хомяков",
    phone: "+7 977 018-09-90",
    status: "new",
    priority: "medium",
    createdAt: "2026-05-01T06:50:00.000Z",
    vehicleLabel: "Hyundai Tucson",
    comment: "Нужна диагностика подвески и посторонний шум.",
    managerId: "u-service",
    payload: {
      serviceType: "Диагностика",
      plate: "А777АА797"
    }
  },
  {
    id: "lead-005",
    source: "trade-in",
    name: "Владимир Белкин",
    phone: "+7 915 880-15-15",
    status: "in_progress",
    priority: "medium",
    createdAt: "2026-04-30T16:15:00.000Z",
    vehicleLabel: "Hyundai Sonata 2021",
    comment: "Интересует обмен на Zeekr X.",
    managerId: "u-appraiser",
    payload: {
      mileage: 54000,
      desiredModel: "Zeekr X"
    }
  },
  {
    id: "lead-006",
    source: "contact",
    name: "Николай Тихонов",
    phone: "+7 999 310-22-41",
    status: "declined",
    priority: "low",
    createdAt: "2026-04-30T12:20:00.000Z",
    updatedAt: "2026-04-30T13:15:00.000Z",
    comment: "Запрашивал общую консультацию, выбрал другой салон.",
    managerId: "u-sales-2",
    payload: {
      topic: "подбор семейного SUV"
    }
  },
  {
    id: "lead-007",
    source: "purchase",
    name: "Дарья Медведева",
    phone: "+7 926 010-77-32",
    status: "sold",
    priority: "high",
    createdAt: "2026-04-29T10:10:00.000Z",
    updatedAt: "2026-04-30T18:00:00.000Z",
    vehicleLabel: "KIA K5 GT-Line",
    managerId: "u-sales-1",
    payload: {
      dealValue: "3,89 млн ₽"
    }
  },
  {
    id: "lead-008",
    source: "service",
    name: "Павел Емельянов",
    phone: "+7 965 006-44-88",
    status: "meeting_scheduled",
    priority: "medium",
    createdAt: "2026-04-29T09:45:00.000Z",
    appointmentAt: "2026-05-03T11:00:00.000Z",
    vehicleLabel: "Xiaomi SU7 Pro",
    managerId: "u-service",
    payload: {
      serviceType: "Проверка электроники"
    }
  }
];

export const adminNav = [
  { href: "/admin", label: "Обзор", description: "Сводка по салону" },
  { href: "/admin/leads", label: "Заявки", description: "Покупка и тест-драйв" },
  { href: "/admin/service", label: "Сервис", description: "Очередь и записи" },
  { href: "/admin/trade-in", label: "Trade-In", description: "Оценка и обмен" },
  { href: "/admin/catalog", label: "Каталог", description: "Наличие и статусы" },
  { href: "/admin/team", label: "Команда", description: "Роли и загрузка" }
] as const;

export const leadSourceLabels: Record<LeadSource, string> = {
  purchase: "Покупка",
  credit: "Кредит",
  "test-drive": "Тест-драйв",
  service: "Сервис",
  "trade-in": "Trade-In",
  insurance: "Страхование",
  consultation: "Консультация",
  contact: "Контакт"
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  meeting_scheduled: "Встреча назначена",
  sold: "Продано",
  declined: "Отказ"
};

export const roleLabels: Record<UserRole, string> = {
  admin: "Админ",
  sales_manager: "Менеджер продаж",
  service_manager: "Сервис-менеджер",
  mechanic: "Механик",
  trade_in_appraiser: "Оценщик trade-in"
};
