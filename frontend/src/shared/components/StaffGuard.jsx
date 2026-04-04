import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";

export default function StaffGuard({ children }) {
  const { isAuthenticated, accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/staff/login" replace />;
  }

  return children ? children : <Outlet />;
}
