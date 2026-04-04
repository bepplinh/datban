import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useAuthStore from "@/features/auth/store/useAuthStore";
import HomePage from "@/features/landing/pages/HomePage";
import Menu from "@/features/menu/pages/Menu";
import LayoutClient from "@/shared/layouts/LayoutClient";
import TableLayout from "@/shared/layouts/TableLayout";

import QRHome from "@/features/table-session/pages/QRHome";
import MenuPage from "@/features/orders/pages/MenuPage";
import Test from "@/features/test/Test";

import StaffLayout from "@/shared/layouts/StaffLayout";
import POSDashboardPage from "@/features/staff/pages/POSDashboardPage";
import TableDetailPage from "@/features/staff/pages/TableDetailPage";
import StaffOrderMenu from "@/features/staff/pages/StaffOrderMenu";
import StaffLogin from "@/features/staff/pages/StaffLogin";
import StaffGuard from "@/shared/components/StaffGuard";
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";
import KDSPage from "@/features/kds/pages/KDSPage";
import NotificationsPage from "@/features/staff/pages/NotificationsPage";
import StaffPayment from "./features/staff/components/StaffPayment";
import AdminLayout from "./shared/layouts/AdminLayout";
import CategoryManagement from "./features/admin/pages/CategoryManagement";
import ProductManagement from "./features/admin/pages/ProductManagement";
import TableManagement from "./features/admin/pages/TableManagement";
import OrderManagement from "./features/admin/pages/OrderManagement";
import AdminLogin from "./features/admin/pages/AdminLogin";
import AdminGuard from "./shared/components/AdminGuard";

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
        <Route
          path="orders"
          element={<div className="p-4">Quản lý Đơn Hàng (Đang xây dựng)</div>}
        />
        <Route
          path="settings"
          element={<div className="p-4">Cài đặt (Đang xây dựng)</div>}
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
  );
}

export default App;
