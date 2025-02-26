export interface CardItem {
    // costForTwo: any;
    id:number,
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