import tableRepo from "../repositories/table.repository.js";
import { sessionRepo } from "../repositories/session.repo.js";
import {
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from "../utils/AppError.js";

export const tableSessionService = {
  getOrCreateTableSession: async (tableId, token, currentSessionId) => {
    const table = await tableRepo.findTableById(tableId);
    if (!table) {
      throw new NotFoundError("Table not found");
    }

    if (table.status === "EMPTY") {
      throw new ForbiddenError(
        "Bàn chưa được mở. Vui lòng liên hệ nhân viên để được hỗ trợ.",
      );
    }

    // Nếu đã có session trong cookie, kiểm tra tính hợp lệ
    if (currentSessionId) {
      const existingSession =
        await sessionRepo.findActiveSessionById(currentSessionId);
      if (existingSession && existingSession.tableId === tableId) {
        return existingSession;
      }
    }

    // Nếu không có session hợp lệ trong cookie thì mới check token
    if (table.token !== token) {
      throw new ForbiddenError("Mã bảo mật không đúng. Vui lòng thử lại.");
    }

    let session = await sessionRepo.findActiveSession(tableId);
    if (!session) {
      const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
      session = await sessionRepo.createTableSession(tableId, expiresAt);
    }

    return session;
  },
};
