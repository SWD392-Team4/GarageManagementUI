import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SidebarCustomer from "../SidebarCustomer/SidebarCustomer";
import { useTranslation } from "react-i18next";

export default function LayoutCustomer({ onLoad }) {
    const { i18n } = useTranslation();

    useEffect(() => {
        onLoad();
    }, [i18n.language]);

    return (
        <>
            <Header />
            <div className="bg-gray-100 pt-20 mt-4">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <SidebarCustomer />
                        <div className="col-span-4 sm:col-span-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
