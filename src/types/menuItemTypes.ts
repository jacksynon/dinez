export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  options?: {
    removableIngredients?: string[];
    additionalIngredients?: {
      name: string;
      price: number;
    }[];
  };
}
