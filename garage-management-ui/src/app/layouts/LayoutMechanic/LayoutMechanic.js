import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarMechanic from "../SidebarMechanic/SidebarMechanic";

export default function LayoutMechanic() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <SidebarMechanic
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`flex-1  transition-all overflow-auto bg-gray-100 h-screen ${
          isSidebarOpen ? "md:ml-50" : "md:ml-13"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
