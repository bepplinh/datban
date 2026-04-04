import NavBar from "../../features/admin/components/Layout/NavBar";
import SideBar from "../../features/admin/components/Layout/SideBar";
import { Outlet } from "react-router-dom"

function AdminLayout() {
    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <SideBar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <NavBar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;