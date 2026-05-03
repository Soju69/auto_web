export type ServiceOrderStatus =
  | "new"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "canceled";

export type ServiceOrder = {
  id: string;
  customerName: string;
  phone: string;
  car: string;
  plate: string;
  serviceType: string;
  appointmentAt: string;
  advisorId: string;
  mechanicId?: string;
  status: ServiceOrderStatus;
  note?: string;
  createdAt: string;
};
