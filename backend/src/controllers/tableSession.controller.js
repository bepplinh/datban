import { tableSessionService } from "../services/tableSession.service.js";

export const TableSessionController = {
  createTableSession: async (req, res) => {
    const { tableId, token } = req.body;
    const { tableSessionId } = req.cookies;
    try {
      const tableSession = await tableSessionService.getOrCreateTableSession(
        tableId,
        token,
        tableSessionId,
      );
      res.cookie("tableSessionId", tableSession.id, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // 2 giờ
      });
      res.json(tableSession);
    } catch (err) {
      res.status(err.statusCode || 400).json({ message: err.message });
    }
  },
};
