# Frontend Development Rules - Datban Project

## 1. Architecture Overview

We use a **Feature-based** structure to maintain scalability and organization.

- **Features**: Self-contained modules that include components, hooks, services, and state related to a specific domain (e.g., `auth`, `menu`, `staff`).
- **Shared**: Common components, layouts, services, and hooks used across multiple features.

## 2. Naming Conventions

- **Feature folders**: `kebab-case` (e.g., `table-session`).
- **Hooks**: `use[Name].js` (e.g., `useLoginAdmin.js`).
- **Components**: `PascalCase.jsx`.
- **Services**: `[name].service.js`.
- **Stores**: `use[Name]Store.js`.

## 3. Technology Stack & Patterns

### State Management

- Use **Zustand** for global state.
- Keep stores focused and avoid massive "god" stores.
- Use `useAuthStore` for authentication state.

### Data Fetching

- Use **TanStack Query** (React Query) for server state.
- Use `useQuery` for fetching data and `useMutation` for creating/updating/deleting.
- Abstract API calls into service files within the feature folder.

```javascript
// Service
import api from "@/shared/services/api";
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// Hook
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
export const useLogin = () => {
  return useMutation({ mutationFn: login });
};
```

### Inter-component Communication

- Use **Socket.io** for real-time updates (especially for POS dashboards).
- Use the `useSocket` hook from the shared context.

### Styling

- Use **Tailwind CSS** for all styling.
- Follow a consistent design system (colors, spacing, typography).

## 4. Routing

- Defined centrally in `src/App.jsx`.
- Use `react-router-dom`.
- Protect staff/admin routes using Guard components (e.g., `StaffGuard`).

## 5. Directory Structure

```text
frontend/src/
├── features/       # Modular feature folders
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       ├── pages/
│       └── store/
├── shared/         # Shared assets, hooks, layouts, components
│   ├── components/
│   ├── layouts/
│   ├── hooks/
│   └── services/
├── assets/         # Static files
└── App.jsx         # Main routing and entry point
```

## 6. Best Practices

- **Aliases**: Use `@` to refer to `src/` (e.g., `import api from "@/shared/services/api"`).
- **Memoization**: Use `React.memo`, `useMemo`, and `useCallback` strategically to prevent unnecessary re-renders in heavy components (like POS dashboards).
- **SEO**: Ensure proper semantic HTML and meta tags.
