// functions to fetch the menu data from the server
// which is actually just the menu.json file for now
import menuData from "@/data/menu.json";

export const fetchMenuItems = async () => {
  return menuData;
};

export const fetchMenuItem = async (id: string) => {
  return menuData.find((item) => item.id === id);
};
