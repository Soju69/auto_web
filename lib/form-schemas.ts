import { z } from "zod";

function isValidServiceDate(value: string) {
  const selectedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return selectedDate >= today && selectedDate <= maxDate;
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  phone: z.string().min(7, "Укажите телефон"),
  topic: z.string().min(2, "Укажите тему"),
  message: z.string().min(5, "Добавьте короткий комментарий"),
  clientId: z.string().optional().default("")
});

export const carInquirySchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  phone: z.string().min(7, "Укажите телефон"),
  requestType: z.enum(["purchase", "credit", "test-drive"]),
  carId: z.string().min(1),
  carLabel: z.string().min(2),
  comment: z.string().optional().default(""),
  preferredDate: z.string().optional().default(""),
  preferredTime: z.string().optional().default(""),
  clientId: z.string().optional().default("")
});

export const serviceFormSchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  phone: z.string().min(7, "Укажите телефон"),
  car: z.string().min(2, "Укажите автомобиль"),
  plate: z.string().min(5, "Укажите госномер"),
  date: z.string().min(1, "Выберите дату").refine(isValidServiceDate, "Выберите дату в пределах ближайшего года"),
  serviceType: z.string().min(1, "Выберите услугу"),
  note: z.string().optional().default(""),
  clientId: z.string().optional().default("")
});

export const tradeInFormSchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  phone: z.string().min(7, "Укажите телефон"),
  brand: z.string().min(2, "Укажите марку"),
  model: z.string().min(1, "Укажите модель"),
  year: z.coerce.number().min(1980, "Слишком ранний год").max(2035, "Проверьте год"),
  mileage: z.coerce.number().min(0, "Пробег не может быть отрицательным"),
  vin: z.string().optional().default(""),
  desiredCar: z.string().optional().default(""),
  comment: z.string().optional().default(""),
  clientId: z.string().optional().default("")
});

export const createEmployeeSchema = z.object({
  name: z.string().min(2, "Укажите ФИО"),
  email: z.string().email("Укажите email"),
  phone: z.string().optional().default(""),
  role: z.enum(["admin", "sales_manager", "service_manager", "mechanic", "trade_in_appraiser"]),
  status: z.enum(["active", "vacation", "blocked"]).default("active")
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type CarInquiryValues = z.infer<typeof carInquirySchema>;
export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
export type TradeInFormValues = z.infer<typeof tradeInFormSchema>;
export type CreateEmployeeValues = z.infer<typeof createEmployeeSchema>;
