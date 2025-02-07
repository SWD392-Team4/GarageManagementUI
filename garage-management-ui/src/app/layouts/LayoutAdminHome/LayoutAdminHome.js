import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarAdmin from "../SidebarAdmin/SidebarAdmin";

export default function LayoutAdminHome() {
    const { i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [languageKey, setLanguageKey] = useState(i18n.language);

    useEffect(() => {
        setLanguageKey(i18n.language);
    }, [i18n.language]);

    return (
        <div className="flex min-h-screen">
            <SideBarAdmin
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                onLanguageChange={() => setLanguageKey(i18n.language)}
            />

            <main className={`flex-1 p-6 transition-all overflow-auto h-screen ${isSidebarOpen ? "md:ml-50" : "md:ml-13"}`}>
                <Outlet key={languageKey} />
            </main>
        </div>
    );
}
