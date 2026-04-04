export const checkTableSession = (req, res, next) => {
  const tableSessionId =
    req.cookies.tableSessionId || req.headers["x-table-session-id"];

  if (!tableSessionId) {
    return res.status(401).json({
      message: "Table session not found",
    });
  }

  req.tableSessionId = tableSessionId;

  next();
};
