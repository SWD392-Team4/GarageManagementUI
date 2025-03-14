import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

// import schema
import { bookingSchema } from "../schemas/bookingSchema";
import { createAppointmentApi } from "../Services/BookingPageService";

const BillingDetails = () => {
  const { t } = useTranslation("BookingOnline");

  // Khởi tạo form, thêm default value cho trường booking date
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema(t)),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhoneNumber: "",
      carLicensePlateNumber: "",
      mileage: "",
      estimatedAppointmentTime: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        mileage: formData.mileage ? Number(formData.mileage) : undefined,
        customerName: formData.customerName,
        customerPhoneNumber: formData.customerPhoneNumber,
        customerEmail: formData.customerEmail,
        // Chuyển đổi giá trị input datetime sang định dạng ISO
        estimatedAppointmentTime: new Date(
          formData.estimatedAppointmentTime
        ).toISOString(),
        carLicensePlateNumber: formData.carLicensePlateNumber || undefined,
      };

      const response = await createAppointmentApi(payload);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div>
      <h4 className="text-xl font-bold mb-4">{t("billingDetails")}</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-1">
              {t("fullName")}
              <sup className="text-red-800">*</sup>
            </label>
            <input
              type="text"
              className="w-full p-2 bg-white/40 outline-none"
              {...register("customerName")}
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Booking Date & Time */}
          <div>
            <label className="block font-semibold mb-1">
              {t("bookingDateTime")}
              <sup className="text-red-800">*</sup>
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 bg-white/40 outline-none"
              {...register("estimatedAppointmentTime")}
            />
            {errors.estimatedAppointmentTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.estimatedAppointmentTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-1">
              {t("emailAddress")}
              <sup className="text-red-800">*</sup>
            </label>
            <input
              type="text"
              className="w-full p-2 bg-white/40 outline-none"
              {...register("customerEmail")}
            />
            {errors.customerEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.customerEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">
              {t("phone")}
              <sup className="text-red-800">*</sup>
            </label>
            <input
              type="text"
              className="w-full p-2 bg-white/40 outline-none"
              {...register("customerPhoneNumber")}
            />
            {errors.customerPhoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.customerPhoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Car License Plate Number + Mileage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-1">
              {t("carLicensePlateNumber")}
            </label>
            <input
              type="text"
              className="w-full p-2 bg-white/40 outline-none"
              {...register("carLicensePlateNumber")}
            />
            {errors.carLicensePlateNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.carLicensePlateNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">{t("mileage")}</label>
            <input
              type="text"
              className="w-full p-2 bg-white/40 outline-none"
              {...register("mileage")}
            />
            {errors.mileage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mileage.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-300 text-2xl text-white px-4 py-2 font-shadows font-medium hover:text-orange-400 hover:bg-white/40 border border-orange-300 hover:border-orange-300 duration-200"
        >
          {t("placeOrder")}
        </button>
      </form>
    </div>
  );
};

export default BillingDetails;
