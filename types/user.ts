export type UserRole =
  | "admin"
  | "sales_manager"
  | "service_manager"
  | "mechanic"
  | "trade_in_appraiser";

export type UserStatus = "active" | "vacation" | "blocked";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  password?: string;
  avatarUrl?: string;
  status: UserStatus;
  workload?: number;
};
