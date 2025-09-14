import { Outlet } from "react-router";
import HeaderAdmin from "../Components/Admin/HeaderAdmin";
function AdminLayout() {
    
    return (
        <div className="flex h-screen bg-white">
          <HeaderAdmin/>
                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <Outlet />
                </main>
        </div>
    );
}

export default AdminLayout;