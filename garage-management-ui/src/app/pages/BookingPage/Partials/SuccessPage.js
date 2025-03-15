import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const SuccessPage = () => {
  return (
    <div className="p-4 ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-black"
      >
        {/* Icon dấu tích xoay */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear" }}
        >
          <FiCheckCircle size={80} className="text-green-500" />
        </motion.div>

        {/* Nội dung */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-4"
        >
          <h2 className="text-2xl font-semibold">Thank you!</h2>
          <p className="text-lg font-medium">Request successfully sent!</p>
          <p className="text-sm text-gray-900">We will reply shortly.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
