export interface CardItem {
  id: number | null | undefined;
  card: [string];
  cards: [string];
  groupedCard: [string];
  restaurant: string;
  info: {
    id: number;
    name: string;
    price: number;
    defaultPrice: number | undefined;
    description: string;
    imageId: string;
    cloudinaryImageId: string;
    avgRating: string & number;
    costForTwoMessage: string;
    costForTwo: string;
    sla: {
      slaString: number;
      minDeliveryTime: number;
      maxDeliveryTime: number;
      DeliveryTime: string;
    };
    cuisines: [string];
    totalRatings: number;
    groupedCard?: boolean;
    qnty: string | number | readonly string[] | undefined;
  };
}
