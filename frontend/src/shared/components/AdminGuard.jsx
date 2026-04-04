import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";

export default function AdminGuard({ children }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-vh-100 h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated && user?.role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? children : <Outlet />;
}
