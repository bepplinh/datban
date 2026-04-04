import { menuService } from "../services/menu.service.js";

export const menuController = {
  getMenu: async (req, res, next) => {
    try {
      const menu = await menuService.getMenu();
      res.json({ data: menu });
    } catch (err) {
      next(err);
    }
  },
};
