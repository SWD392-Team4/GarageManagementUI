import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../SidebarAdmin/SidebarAdmin";

export default function LayoutAdminHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen ">
            {/* Sidebar */}
            <SideBarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Nội dung chính */}
            <main className={`flex-1 p-6 transition-all overflow-auto h-screen ${isSidebarOpen ? "md:ml-50" : "md:ml-13"}`}>
                <Outlet />
            </main>

        </div>
    );
}
