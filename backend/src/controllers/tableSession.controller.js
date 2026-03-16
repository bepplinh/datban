import { tableSessionService } from "../services/tableSession.service.js";

export const createTableSessionController = async (req, res) => {
  const { tableId } = req.body;
  try {
    const session = await tableSessionService.getOrCreateTableSession(tableId);
    res.json(session);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
