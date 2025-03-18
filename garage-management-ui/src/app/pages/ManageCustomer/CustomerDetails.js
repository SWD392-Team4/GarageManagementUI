import React, { useState } from 'react';
import Breadcrumb from '../AdminManageAppoinment/partials/Breadcrumb';
import CustomerAllInfomation from './partials/CustomerDetails/CustomerAllInfomation';

export default function CustomerDetails() {
    return (
        <div className="bg-white shadow-lg p-6">
            <Breadcrumb />
            <CustomerAllInfomation />
        </div>
    )
}
