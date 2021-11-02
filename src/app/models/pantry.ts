export type Basket = {
  name: string;
  ttl: number;
};

export type Pantry = {
  name: string;
  description: string;
  errors: string[];
  notifications: boolean;
  percentFull: number;
  baskets: Basket[];
};
