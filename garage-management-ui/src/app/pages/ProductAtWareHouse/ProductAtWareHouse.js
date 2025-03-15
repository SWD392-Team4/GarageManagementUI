import React from 'react'
import Breadcrumb from '../AdminManageAppoinment/partials/Breadcrumb';
import AtWareHouse from './partials/AtWareHouse';

export default function ManageProductAtWareHouse() {
  return (
    <div className="bg-white shadow-lg p-6">
      <Breadcrumb />
      <AtWareHouse />
    </div>
  )
}
