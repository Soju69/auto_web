export type LeadSource =
  | "purchase"
  | "credit"
  | "test-drive"
  | "service"
  | "trade-in"
  | "insurance"
  | "consultation"
  | "contact";

export type LeadStatus =
  | "new"
  | "in_progress"
  | "meeting_scheduled"
  | "sold"
  | "declined";

export type LeadPriority = "high" | "medium" | "low";

export type Lead = {
  id: string;
  source: LeadSource;
  name: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  priority: LeadPriority;
  createdAt: string;
  updatedAt?: string;
  vehicleLabel?: string;
  comment?: string;
  appointmentAt?: string;
  managerId?: string;
  payload: Record<string, string | number | string[] | undefined>;
};
