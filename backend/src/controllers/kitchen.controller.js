import { kitchenService } from "../services/kitchen.service.js";

export const kitchenController = {
  listQueue: async (req, res, next) => {
    try {
      const queue = await kitchenService.listQueue();
      res.json({ data: queue });
    } catch (err) {
      next(err);
    }
  },

  updateItemStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedItem = await kitchenService.updateItemStatus(id, status);
      res.json({ data: updatedItem });
    } catch (err) {
      next(err);
    }
  },
};
