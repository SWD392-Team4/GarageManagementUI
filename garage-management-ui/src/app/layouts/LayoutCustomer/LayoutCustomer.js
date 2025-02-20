import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SidebarCustomer from "../SidebarCustomer/SidebarCustomer";
import PageTitle from "../../components/common/PageTitle";

export default function LayoutCustomer() {
    return (
        <>
            <Header />
            <PageTitle
                title={"Profile"}
                title1="Home"
                subtitle={"Profile"}
            />
            <div className="bg-black">
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
