import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarAdmin from "../SidebarAdmin/SidebarAdmin";

export default function LayoutAdminHome() {
  const { i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Khi i18n.language thay đổi, React sẽ tự động cập nhật mà không cần lưu vào state riêng
  }, [i18n.language]);

  return (
    <div className="flex min-h-screen">
      <SideBarAdmin
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1 p-6 transition-all overflow-auto bg-gray-100 h-screen ${
          isSidebarOpen ? "md:ml-50" : "md:ml-13"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
