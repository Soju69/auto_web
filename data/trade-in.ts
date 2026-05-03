import type { TradeInRequest, TradeInRequestStatus } from "@/types/trade-in-request";

export const tradeInStatusLabels: Record<TradeInRequestStatus, string> = {
  new: "Новая",
  inspection: "Осмотр",
  offer_prepared: "Оценка готова",
  accepted: "Принято",
  declined: "Отказ",
  revaluation: "Дооценка"
};

export const initialTradeInRequests: TradeInRequest[] = [
  {
    id: "ti-001",
    customerName: "Владимир Белкин",
    phone: "+7 915 880-15-15",
    currentCar: "Hyundai Sonata 2021",
    desiredCar: "Zeekr X",
    year: 2021,
    mileage: 54000,
    vin: "KMHL341CBMA123456",
    appraiserId: "u-appraiser",
    estimatedValue: 2180000,
    status: "inspection",
    photosCount: 12,
    comment: "Клиент готов обменять быстро, если разница останется в пределах бюджета.",
    createdAt: "2026-04-30T16:15:00.000Z"
  },
  {
    id: "ti-002",
    customerName: "Артур Малыгин",
    phone: "+7 926 330-19-55",
    currentCar: "KIA Sportage 2020",
    desiredCar: "Hyundai Tucson",
    year: 2020,
    mileage: 76000,
    vin: "KNDPB3AC7L7654321",
    appraiserId: "u-appraiser",
    estimatedValue: 1690000,
    status: "offer_prepared",
    photosCount: 9,
    comment: "Нужно согласовать финальную сумму после диагностики кузова.",
    createdAt: "2026-05-01T11:25:00.000Z"
  },
  {
    id: "ti-003",
    customerName: "Ирина Данилова",
    phone: "+7 905 210-73-10",
    currentCar: "BMW X3 2019",
    desiredCar: "Xiaomi SU7 Pro",
    year: 2019,
    mileage: 88400,
    appraiserId: "u-appraiser-2",
    status: "new",
    photosCount: 5,
    comment: "Ожидаем дополнительные фото салона и VIN.",
    createdAt: "2026-05-02T07:30:00.000Z"
  },
  {
    id: "ti-004",
    customerName: "Максим Прохоров",
    phone: "+7 903 550-01-44",
    currentCar: "Mercedes-Benz E 2018",
    desiredCar: "Zeekr 001 YOU Edition",
    year: 2018,
    mileage: 101200,
    appraiserId: "u-appraiser-2",
    estimatedValue: 2480000,
    status: "revaluation",
    photosCount: 16,
    comment: "После осмотра нужен пересчет из-за окраса заднего крыла.",
    createdAt: "2026-05-01T09:00:00.000Z"
  }
];
