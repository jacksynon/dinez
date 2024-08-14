import { MenuItemType } from './menuItemTypes';

export type RootStackParamList = {
  Menu: undefined;
  Cart: undefined;
  Payment: undefined;
  MenuItemDetails: { item: MenuItemType };
};
