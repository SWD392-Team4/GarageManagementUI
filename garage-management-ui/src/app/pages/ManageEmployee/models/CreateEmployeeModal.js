import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createEmployee, getWorkPlace } from "../services/EmployeeService";

export default function CreateEmployeeModal({ isOpen, onClose, onEmployeeCreated }) {
  const { t } = useTranslation("manage_employee");
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [workplaces, setWorkplaces] = useState([]);
  const roles = ["Mechanic", "Cashier", "Warehouse Manager"];

  useEffect(() => {
    const fetchWorkplaces = async () => {
      const data = await getWorkPlace();
      if (data) {
        setWorkplaces(data);
      }
    };
    fetchWorkplaces();
  }, []);

  const onSubmit = async (data) => {
    const validData = {
      userName: data.userName.trim(),
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber.trim(),
      role: data.role,
      citizenIdentification: data.citizenIdentification.trim(),
      dateOfBirth: data.dateOfBirth,
      gender: data.gender === "true",
      workplaceId: data.workplaceId,
    };

    try {
      console.log("Submitting Data: ", validData);
      const response = await createEmployee(validData);
      reset();
      onEmployeeCreated();
      onClose();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{t("manage_employee.create_employee")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* User Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.username")}</label>
              <input type="text" {...register("userName", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.userName && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.password")}</label>
              <input type="password" {...register("password", { required: true, minLength: 6 })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.password && <span className="text-red-500 text-sm">{t("manage_employee.password_error")}</span>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.confirm_password")}</label>
              <input type="password" {...register("confirmPassword", { required: true, validate: (value) => value === watch("password") })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{t("manage_employee.confirm_password_error")}</span>}
            </div>

            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.firstName")}</label>
              <input type="text" {...register("firstName", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.firstName && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.lastName")}</label>
              <input type="text" {...register("lastName", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.lastName && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.email")}</label>
              <input type="email" {...register("email", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.email && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.phoneNumber")}</label>
              <input type="text" {...register("phoneNumber", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.role")}</label>
              <select {...register("role", { required: true })} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">{t("manage_employee.select_role")}</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>


            {/* Citizen Identification */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.citizen_id")}</label>
              <input type="text" {...register("citizenIdentification", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
              {errors.citizenIdentification && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.dob")}</label>
              <input type="date" {...register("dateOfBirth", { required: true })} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.gender")}</label>
              <select {...register("gender")} className="w-full p-2 border border-gray-300 rounded-md">
                <option value={true}>{t("manage_employee.male")}</option>
                <option value={false}>{t("manage_employee.female")}</option>
              </select>
            </div>

            {/* Workplace ID */}
            <div>
              <label className="text-sm font-medium text-gray-700">{t("manage_employee.workplace_id")}</label>
              <select {...register("workplaceId", { required: true })} className="w-full p-2 border border-gray-300 rounded-md">
                <option value="">{t("manage_employee.select_workplace")}</option>
                {workplaces.map((workplace) => (
                  <option key={workplace.id} value={workplace.id}>
                    {workplace.name}
                  </option>
                ))}
              </select>
              {errors.workplaceId && <span className="text-red-500 text-sm">{t("manage_employee.required")}</span>}
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={onClose}>
              {t("manage_employee.cancel")}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              {t("manage_employee.create")}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
