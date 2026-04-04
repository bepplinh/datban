# Backend Development Rules - Datban Project

## 1. Architecture Overview

We follow a 4-layer architecture to ensure separation of concerns:

- **Routes**: Define API endpoints and apply middlewares (Auth, Validation).
- **Controllers**: Handle HTTP requests/responses, extract parameters, and call services.
- **Services**: Contain business logic, orchestrate multiple repositories, and handle complex operations.
- **Repositories**: Minimal layer for database interaction using Prisma.

## 2. Naming Conventions

- **Controllers**: `[name].controller.js` (e.g., `auth.controller.js`)
- **Services**: `[name].service.js` (e.g., `auth.service.js`)
- **Repositories**: `[name].repository.js` or `[name].repo.js` (Prefer `.repository.js`)
- **Routes**: `[name].route.js`
- **Schemas**: `[name].schema.js` (Zod validation schemas)

## 3. Coding Standards

### Async/Await & Error Handling

- Always use `async/await` for asynchronous operations.
- Controllers **must** wrap logic in `try-catch` and call `next(err)` to pass errors to the centralized error handler.
- Use custom error classes from `@/utils/AppError.js` (e.g., `NotFoundError`, `UnauthorizedError`).

```javascript
// Controller Example
export const myController = {
  getData: async (req, res, next) => {
    try {
      const data = await myService.fetchData(req.params.id);
      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  },
};
```

### Database Operations (Prisma)

- Use repositories to encapsulate Prisma logic.
- Avoid calling Prisma directly in services if possible.
- Use `include` or `select` to fetch only necessary related data.

### Validation

- Use **Zod** for request body/param validation.
- Validations should be applied as middleware in the route definition.

## 4. Authentication & Authorization

- Use JWT for session management.
- Store `refreshToken` in an **HttpOnly, Secure** cookie.
- Store `accessToken` in memory (frontend).
- Protect routes using `authMiddleware`.

## 5. Directory Structure

```text
backend/src/
├── config/         # Environment variables and app configuration
├── controllers/    # Request handlers
├── services/       # Business logic
├── repositories/   # Database access layer
├── routes/         # API route definitions
├── middlewares/    # Custom Express middlewares
├── utils/          # Helper functions and Error classes
├── validations/    # Zod schemas
└── libs/           # Library initializations (Prisma, etc.)
```
