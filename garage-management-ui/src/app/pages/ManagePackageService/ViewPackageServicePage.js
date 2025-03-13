import React from 'react'
import ViewPackagePartial from './partials/ViewPackagePartial'
import Breadcrumb from '../AdminManageAppoinment/partials/Breadcrumb'

export default function ViewPackageServicePage() {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg ">
      <Breadcrumb />
      <ViewPackagePartial />
    </div>
  )
}
