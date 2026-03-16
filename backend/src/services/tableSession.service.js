import tableRepo from "../repositories/table.repository.js";
import { sessionRepo } from "../repositories/session.repo.js";

export const tableSessionService = {
  getOrCreateTableSession: async (tableId) => {
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

    const session = await sessionRepo.upsertTableSession(tableId, expiresAt);

    await tableRepo.updateTableStatus(tableId, "OCCUPIED");

    return session;
  },
};
