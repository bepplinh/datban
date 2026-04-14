import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ClipboardList, Settings } from "lucide-react";
import useAuthStore from "@/features/auth/store/useAuthStore";
import LayoutClient from "@/shared/layouts/LayoutClient";
import TableLayout from "@/shared/layouts/TableLayout";
import StaffLayout from "@/shared/layouts/StaffLayout";
import StaffGuard from "@/shared/components/StaffGuard";
import AdminLayout from "./shared/layouts/AdminLayout";
import AdminGuard from "./shared/components/AdminGuard";

// Dynamic Imports (Lazy loading)
const HomePage = lazy(() => import("@/features/landing/pages/HomePage"));
const Menu = lazy(() => import("@/features/menu/pages/Menu"));
const QRHome = lazy(() => import("@/features/table-session/pages/QRHome"));
const MenuPage = lazy(() => import("@/features/orders/pages/MenuPage"));
const Test = lazy(() => import("@/features/test/Test"));
const POSDashboardPage = lazy(() => import("@/features/staff/pages/POSDashboardPage"));
const TableDetailPage = lazy(() => import("@/features/staff/pages/TableDetailPage"));
const StaffOrderMenu = lazy(() => import("@/features/staff/pages/StaffOrderMenu"));
const StaffLogin = lazy(() => import("@/features/staff/pages/StaffLogin"));
const AdminDashboardPage = lazy(() => import("./features/admin/pages/AdminDashboardPage"));
const KDSPage = lazy(() => import("@/features/kds/pages/KDSPage"));
const NotificationsPage = lazy(() => import("@/features/staff/pages/NotificationsPage"));
const StaffPayment = lazy(() => import("./features/staff/components/StaffPayment"));
const CategoryManagement = lazy(() => import("./features/admin/pages/CategoryManagement"));
const ProductManagement = lazy(() => import("./features/admin/pages/ProductManagement"));
const TableManagement = lazy(() => import("./features/admin/pages/TableManagement"));
const OrderManagement = lazy(() => import("./features/admin/pages/OrderManagement"));
const AdminLogin = lazy(() => import("./features/admin/pages/AdminLogin"));
const ReservationManagement = lazy(() => import("@/features/staff/pages/ReservationManagement"));

// Loading Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-500">Đang tải...</p>
    </div>
  </div>
);

function App() {
  const { checkAuth } = useAuthStore();
  const location = useLocation();
  const isTableRoute = location.pathname.startsWith("/table/");

  useEffect(() => {
    if (!isTableRoute) {
      checkAuth();
    }
  }, [checkAuth, isTableRoute]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route element={<LayoutClient />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

        <Route path="/table/:tableId" element={<TableLayout />}>
          <Route index element={<QRHome />} />
          <Route path="menu" element={<MenuPage />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route
          path="/staff"
          element={
            <StaffGuard>
              <StaffLayout />
            </StaffGuard>
          }
        >
          <Route index element={<POSDashboardPage />} />
          <Route path="tables" element={<POSDashboardPage />} />
          <Route path="tables/:tableId" element={<TableDetailPage />} />
          <Route path="tables/:tableId/menu" element={<StaffOrderMenu />} />
          <Route path="reservations" element={<ReservationManagement />} />
          <Route
            path="orders"
            element={
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ClipboardList className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Quản lý Đơn Hàng</h2>
                <p className="text-gray-400">Tính năng đang được phát triển</p>
              </div>
            }
          />
          <Route
            path="settings"
            element={
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">Cài đặt</h2>
                <p className="text-gray-400">Tính năng đang được phát triển</p>
              </div>
            }
          />
          <Route path="notifications" element={<NotificationsPage />} />
          
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/staff/payment" element={<StaffPayment />} />
        <Route
          path="/kds"
          element={
            <StaffGuard>
              <KDSPage />
            </StaffGuard>
          }
        />

        <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="tables" element={<TableManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
