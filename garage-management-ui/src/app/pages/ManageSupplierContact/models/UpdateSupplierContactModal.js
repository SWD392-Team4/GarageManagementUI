import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { getAllSupplier, updateSupplierContact } from "../services/SupliersContactService";
import { FaTimes } from "react-icons/fa"; // Import icon đóng modal

export default function UpdateSupplierContactModal({ isOpen, onClose, supplierContact, onSupplierUpdated }) {
  const { t } = useTranslation("manage_supplier_contact");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch danh sách Supplier
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getAllSupplier();
        const formattedSuppliers = response.data.value.map(supplier => ({
          value: supplier.id,
          label: `${supplier.name} - ${supplier.taxCode} - ${supplier.address}, ${supplier.province}, ${supplier.district}, ${supplier.wards}`
        }));
        setSuppliers(formattedSuppliers);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    if (isOpen) {
      fetchSuppliers();
    }
  }, [isOpen]);

  // Khi mở modal, load dữ liệu cũ vào form
  useEffect(() => {
    if (supplierContact && suppliers.length > 0) {
      const matchingSupplier = suppliers.find(supplier => supplier.value === supplierContact.supplierId);

      setSelectedSupplier(matchingSupplier || null);

      reset({
        supplierId: supplierContact.supplierId || "",
        contactPersonName: supplierContact.contactPersonName || "",
        contactPosition: supplierContact.contactPosition || "",
        contactPhoneNumber: supplierContact.contactPhoneNumber || "",
        contactEmail: supplierContact.contactEmail || "",
      });
    }
  }, [supplierContact, suppliers, reset]);

  const onSubmit = async (data) => {
    try {
      await updateSupplierContact(supplierContact.id, {
        ...data,
        supplierId: selectedSupplier?.value || supplierContact.supplierId,
      });
      onSupplierUpdated();
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating supplier contact:", error);
    }
  };

  const handleCancelEdit = () => {
    reset();
    if (supplierContact && suppliers.length > 0) {
      const matchingSupplier = suppliers.find(supplier => supplier.value === supplierContact.supplierId);
      setSelectedSupplier(matchingSupplier || null);
    }
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4">{t("manage_supplier_contact.edit")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Supplier Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.supplierId")}</label>
            <Select
              options={suppliers}
              value={selectedSupplier}
              onChange={(option) => {
                setSelectedSupplier(option);
                setValue("supplierId", option.value);
              }}
              isDisabled={!isEditing}
              placeholder={t("manage_supplier_contact.select_supplier")}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {/* Contact Person Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactPersonName")}</label>
            <input
              type="text"
              {...register("contactPersonName", { required: true })}
              disabled={!isEditing}
              className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Contact Position */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactPosition")}</label>
            <input
              type="text"
              {...register("contactPosition", { required: true })}
              disabled={!isEditing}
              className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Contact Phone Number */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactPhoneNumber")}</label>
            <input
              type="text"
              {...register("contactPhoneNumber", { required: true })}
              disabled={!isEditing}
              className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Contact Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">{t("manage_supplier_contact.contactEmail")}</label>
            <input
              type="email"
              {...register("contactEmail", { required: true })}
              disabled={!isEditing}
              className={`p-2 border rounded-md ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                {t("manage_supplier_contact.cancel")}
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {t("manage_supplier_contact.save")}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              {t("manage_supplier_contact.edit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
