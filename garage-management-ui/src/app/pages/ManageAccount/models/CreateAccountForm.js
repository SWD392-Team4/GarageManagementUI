import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function CreateAccountForm({ onClose }) {
    const { t } = useTranslation();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        alert(t("manage_account.created"));
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">{t("manage_account.create_title")}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">{t("manage_account.name")}</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">{t("manage_account.email")}</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                            onClick={onClose}
                        >
                            {t("manage_account.cancel")}
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-900"
                        >
                            {t("manage_account.submit")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}