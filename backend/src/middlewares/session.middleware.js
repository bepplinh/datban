import tableSessionRepo from "../repositories/tableSession.repository.js";

export const sessionMiddleware = async (req, res, next) => {
  const sessionId =
    req.cookies?.tableSession || req.headers["x-table-session-id"];

  if (!sessionId) {
    return res.status(401).json({ message: "Missing table session" });
  }

  const session = await tableSessionRepo.findById(sessionId);
  if (!session) {
    return res.status(401).json({ message: "Session not found" });
  }

  if (new Date(session.expiresAt) < new Date()) {
    return res.status(401).json({ message: "Session expired" });
  }

  req.tableSession = session;
  next();
};
