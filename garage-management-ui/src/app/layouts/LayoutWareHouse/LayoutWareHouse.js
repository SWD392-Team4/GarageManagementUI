import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarWareHouse from "../SideBarWarehouse/SideBarWareHouse";

export default function LayoutWareHouse() {
  const { i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {}, [i18n.language]);

  return (
    <div className="flex min-h-screen">
      <SideBarWareHouse
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1  transition-all z-50 overflow-auto bg-gray-100 h-screen ${
          isSidebarOpen ? "md:ml-50" : "md:ml-13"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
