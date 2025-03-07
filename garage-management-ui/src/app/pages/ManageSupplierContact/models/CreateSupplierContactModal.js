import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { createSupplierContact, getAllSupplier } from "../services/SupliersContactService";

export default function CreateSupplierContactModal({ isOpen, onClose, onSupplierCreated }) {
  const { t } = useTranslation("manage_supplier_contact");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch danh sách Supplier khi mở modal
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSupplier();
        setSuppliers(response.data.value);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    if (isOpen) {
      fetchSuppliers();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    if (!selectedSupplier) {
      return;
    }

    try {
      await createSupplierContact({ ...data, supplierId: selectedSupplier.value });
      onSupplierCreated();
      reset();
      setSelectedSupplier(null);
      onClose();
    } catch (error) {
      console.error("Error creating supplier contact:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{t("manage_supplier_contact.create")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Supplier Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.supplierId")}</label>
            <Select
              options={suppliers.map(supplier => ({
                value: supplier.id,
                label: `${supplier.name} - ${supplier.taxCode} - ${supplier.address}`
              }))}
              value={selectedSupplier}
              onChange={(option) => {
                setSelectedSupplier(option);
                setValue("supplierId", option.value);
              }}
              placeholder={t("manage_supplier_contact.select_supplier")}
              className="react-select-container"
              classNamePrefix="react-select"
            />
            {!selectedSupplier && <p className="text-red-500 text-sm">{t("manage_supplier_contact.required")}</p>}
          </div>

          {/* Contact Person Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactPersonName")}</label>
            <input
              type="text"
              {...register("contactPersonName", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.contactPersonName && <p className="text-red-500 text-sm">{t("manage_supplier_contact.required")}</p>}
          </div>

          {/* Contact Position */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactPosition")}</label>
            <input
              type="text"
              {...register("contactPosition", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.contactPosition && <p className="text-red-500 text-sm">{t("manage_supplier_contact.required")}</p>}
          </div>

          {/* Contact Phone Number */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactPhoneNumber")}</label>
            <input
              type="text"
              {...register("contactPhoneNumber", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.contactPhoneNumber && <p className="text-red-500 text-sm">{t("manage_supplier_contact.required")}</p>}
          </div>

          {/* Contact Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactEmail")}</label>
            <input
              type="email"
              {...register("contactEmail", { required: true })}
              className="p-2 border rounded-md"
            />
            {errors.contactEmail && <p className="text-red-500 text-sm">{t("manage_supplier_contact.required")}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              {t("manage_supplier_contact.cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isSubmitting ? t("manage_supplier_contact.creating") : t("manage_supplier_contact.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
