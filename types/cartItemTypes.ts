import { MenuItemType } from './menuItemTypes';

export type SelectedOptions = {
  removable: string[];
  additional: string[];
};

export interface CartItemType extends MenuItemType {
  quantity: number;
  selectedOptions: SelectedOptions;
}
