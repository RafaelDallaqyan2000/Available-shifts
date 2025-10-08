export interface ShiftType {
  id: string;
  logo?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  companyName?: string;
  dateStartByCity?: string;
  timeStartByCity?: string;
  timeEndByCity?: string;
  currentWorkers?: number;
  planWorkers?: number;
  workTypes?: WorkType[];
  priceWorker?: number;
  bonusPriceWorker?: number;
  customerFeedbacksCount?: number;
  customerRating?: number;
  isPromotionEnabled?: boolean;
}

export type WorkType = {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
};
