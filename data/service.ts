import type { ServiceOrder, ServiceOrderStatus } from "@/types/service-order";

export const initialServiceOrders: ServiceOrder[] = [
  {
    id: "svc-001",
    customerName: "Сергей Хомяков",
    phone: "+7 977 018-09-90",
    car: "Hyundai Tucson",
    plate: "А777АА797",
    serviceType: "Диагностика подвески",
    appointmentAt: "2026-05-02T09:30:00.000Z",
    advisorId: "u-service",
    mechanicId: "u-mechanic",
    status: "new",
    note: "Посторонний шум спереди на неровностях.",
    createdAt: "2026-05-01T06:50:00.000Z"
  },
  {
    id: "svc-002",
    customerName: "Павел Емельянов",
    phone: "+7 965 006-44-88",
    car: "Xiaomi SU7 Pro",
    plate: "О312МО799",
    serviceType: "Проверка электроники",
    appointmentAt: "2026-05-02T11:00:00.000Z",
    advisorId: "u-service",
    mechanicId: "u-mechanic-2",
    status: "confirmed",
    note: "Проверить ассистенты и обновление системы.",
    createdAt: "2026-04-29T09:45:00.000Z"
  },
  {
    id: "svc-003",
    customerName: "Максим Филатов",
    phone: "+7 915 220-55-14",
    car: "KIA EV6 Long Range",
    plate: "Е210КХ799",
    serviceType: "Плановое ТО",
    appointmentAt: "2026-05-02T13:30:00.000Z",
    advisorId: "u-service-2",
    mechanicId: "u-mechanic",
    status: "in_progress",
    note: "Проверить тормоза и обновить сервисный интервал.",
    createdAt: "2026-05-01T10:25:00.000Z"
  },
  {
    id: "svc-004",
    customerName: "Ольга Шевцова",
    phone: "+7 903 777-18-44",
    car: "Zeekr 001 YOU Edition",
    plate: "М910УА799",
    serviceType: "Детейлинг",
    appointmentAt: "2026-05-02T15:00:00.000Z",
    advisorId: "u-service-2",
    mechanicId: "u-mechanic-2",
    status: "confirmed",
    note: "Подготовка к выдаче после покупки.",
    createdAt: "2026-05-01T11:10:00.000Z"
  },
  {
    id: "svc-005",
    customerName: "Игорь Самойлов",
    phone: "+7 926 008-63-90",
    car: "Hyundai Sonata",
    plate: "Н505ХЕ799",
    serviceType: "Шины и тормоза",
    appointmentAt: "2026-05-01T16:00:00.000Z",
    advisorId: "u-service",
    mechanicId: "u-mechanic",
    status: "completed",
    note: "Клиент ожидает фотоотчет по износу.",
    createdAt: "2026-04-30T13:30:00.000Z"
  }
];

export const serviceStatusLabels: Record<ServiceOrderStatus, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  in_progress: "В работе",
  completed: "Завершена",
  canceled: "Отменена"
};
