import prisma from "../libs/prisma.js";

export const checkTableSession = async (req, res, next) => {
  const tableSessionId =
    req.cookies.tableSessionId || req.headers["x-table-session-id"];

  if (!tableSessionId) {
    return res.status(401).json({
      message: "Table session not found",
    });
  }

  try {
    const session = await prisma.tablesession.findUnique({
      where: { id: tableSessionId },
    });

    if (!session || session.status !== "ACTIVE") {
      return res.status(401).json({
        message: "Table session is invalid or expired",
      });
    }

    req.tableSessionId = tableSessionId;
    next();
  } catch (err) {
    next(err);
  }
};
