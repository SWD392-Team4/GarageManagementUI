import React from "react";
import { HiCalendar, HiEye } from "react-icons/hi";
import { motion } from "framer-motion";

const ListCardService = ({ image, icon, title, description, onBook, onView }) => {
    return (
        <motion.div
            className="bg-white rounded-3xl overflow-hidden transition-transform group shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Ảnh */}
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Icon dịch vụ */}
            <div className="flex justify-center -mt-8 relative z-10">
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-full shadow-md">
                    <span className="text-3xl text-red-500">{icon}</span>
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-gray-600 text-lg my-4">{description}</p>

                {/* Nút hành động */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
                        onClick={onBook}
                    >
                        <HiCalendar className="text-xl" /> Book Now
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-all"
                        onClick={onView}
                    >
                        <HiEye className="text-xl" /> View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ListCardService;
