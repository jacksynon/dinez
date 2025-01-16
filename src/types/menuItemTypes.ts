export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  options?: {
    requiredOptions?: {
      name: string;
      options: {
        name: string;
        price: number;
      }[];
    }[];
    removableIngredients?: string[];
    additionalIngredients?: {
      name: string;
      price: number;
    }[];
  };
}
