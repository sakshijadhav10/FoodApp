export interface CardItem {
  price: number;
  qnty: string | number;
  item: string;
  restaurant: string;
  id: number | null | undefined | string;
  card: [string];
  groupedCard: [string];
  info: {
    id: number;
    name: string;
    price: number;
    defaultPrice: number;
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

export interface CartDetailsResponse {
  cards: Array<CardItem[]>;
}

export type SortBy =
  | "Relevance"
  | "Delivery Time"
  | "Rating"
  | "Low to High"
  | "High to Low"
  | "";
export type FilterBy = "Ratings 4.5+" | "Ratings 4.0+" | "Ratings 3.5+" | "";
export interface Filter {
  handleApply: () => void;
  handleClear: () => void;
  sortBy: SortBy | undefined;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
  filterBy: FilterBy | undefined;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
}
