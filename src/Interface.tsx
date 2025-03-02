export interface CardItem {
  info: any;
  // info: any;
  // info: { name: any; cuisines: any; cloudinaryImageId: any; };
  // costForTwo: any;

  id: number;
  name: string;

  avgRating: number;
  costForTwoMessage: string;
  sla: { minDeliveryTime: number; maxDeliveryTime: number };
  cuisines: string;
  totalRatings: number;
  groupedCard?: boolean;
}

export interface CartDetailsResponse {
  cards: Array<CardItem[]>;
}
