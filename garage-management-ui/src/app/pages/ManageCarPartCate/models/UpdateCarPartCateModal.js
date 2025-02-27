import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateCarPartCate } from "../services/CategoryCarPart";

export default function UpdateCarPartCateModal({ isOpen, onClose, carPartCate, onCarPartCateUpdated }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (carPartCate) {
      reset({
        id: carPartCate.Id || "",
        createdAt: carPartCate.CreatedAt || "",
        updatedAt: carPartCate.UpdatedAt || "",
        status: carPartCate.Status || "",
        partCategory: carPartCate.PartCategory || ""
      });
    }
  }, [carPartCate, reset]);

  const onSubmit = async (data) => {
    try {
      const updateData = {
        PartCategory: data.partCategory,
        Status: data.status,
      };
      await updateCarPartCate(updateData, carPartCate?.Id);
      onCarPartCateUpdated();
    } catch (error) {
      console.error("Error updating Car Part Category:", error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? "visible" : "invisible"}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Car Part Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium">ID</label>
            <input type="text" value={carPartCate?.Id} disabled className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Created At</label>
            <input type="text" value={carPartCate?.CreatedAt} disabled className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Updated At</label>
            <input type="text" value={carPartCate?.UpdatedAt} disabled className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select {...register("status")} className="w-full border p-2 rounded">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Part Category</label>
            <input type="text" {...register("partCategory")} className="w-full border p-2 rounded" />
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}