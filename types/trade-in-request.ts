export type TradeInRequestStatus =
  | "new"
  | "inspection"
  | "offer_prepared"
  | "accepted"
  | "declined"
  | "revaluation";

export type TradeInPhoto = {
  id: string;
  url: string;
  originalName: string;
};

export type TradeInRequest = {
  id: string;
  customerName: string;
  phone: string;
  currentCar: string;
  desiredCar?: string;
  year: number;
  mileage: number;
  vin?: string;
  appraiserId?: string;
  estimatedValue?: number;
  status: TradeInRequestStatus;
  photosCount: number;
  photos?: TradeInPhoto[];
  comment?: string;
  createdAt: string;
};
