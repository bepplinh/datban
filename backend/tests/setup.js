// ─── Global Test Setup ────────────────────────────
// Set env vars before any module loads
process.env.JWT_ACCESS_SECRET = "test_access_secret";
process.env.JWT_REFRESH_SECRET = "test_refresh_secret";
process.env.NODE_ENV = "test";

import { beforeEach } from "vitest";

beforeEach(() => {
  vi.restoreAllMocks();
});
