import React, { useEffect, useState } from "react";
import ApointmentPartial from "./ApointmentPartial";
import CarHasPackageRegister from "./CarHasPackageRegister";
import CustomerInfo from "./CustomerInfo";
import InvoiceInfo from "./InvoiceInfo";
import { getCustomerDetails } from "../../services/CustomerService";
import { useParams } from "react-router-dom";
import { sAccount } from "../../../AuthCustomer/services/store";
import Navbar2 from "../../../AdminManageAppoinment/partials/Navbar2";

export default function CustomerAllInfomation() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {
    const response = await getCustomerDetails(id);
    setCustomer(response.data.value);
  };

  useEffect(() => {
    fetchCustomer();
    setLoading(false);
  }, [id]);

  return (
    <>
      <CustomerInfo customer={customer} loading={loading} />

      {sAccount.value.role === "Administrator" && <Navbar2 />}
      {customer && <ApointmentPartial customer={customer} />}
      <CarHasPackageRegister />
      <InvoiceInfo />
    </>
  );
}
