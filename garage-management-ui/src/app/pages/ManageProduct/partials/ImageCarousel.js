import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion"; // Import thư viện cho hiệu ứng mượt

const ImageCarousel = ({ linkImage, imagesWatch, setImages, setImageFiles, isEditing }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
    const maxThumbnails = 6; // Hiển thị tối đa 6 ảnh nhỏ

    // Kiểm tra danh sách ảnh hợp lệ
    const validLinkImages = Array.isArray(linkImage) ? linkImage : [];
    const validWatchImages = Array.isArray(imagesWatch) ? imagesWatch : [];
    const imagesToShow = isEditing ? [...validLinkImages, ...validWatchImages] : validLinkImages;

    // Hiệu ứng chuyển ảnh
    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    // Xử lý khi upload ảnh mới
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));

        if (isEditing) {
            const newImages = [...validWatchImages, ...previews];
            setImages(newImages);
            setImageFiles((prevFiles) => [...prevFiles, ...files]);
            setCurrentIndex(newImages.length - 1); // Chuyển ngay sang ảnh vừa thêm
        }
    };

    // Xóa ảnh khi chỉnh sửa
    const handleRemoveImage = (index) => {
        const newImages = validWatchImages.filter((_, i) => i !== index);
        setImages(newImages);

        if (index === currentIndex) {
            setCurrentIndex(0); // Chuyển về ảnh đầu tiên nếu ảnh hiện tại bị xóa
        }
    };

    // Chuyển thumbnail khi có nhiều hơn 6 ảnh
    const nextThumbnails = () => {
        if (thumbnailStartIndex + maxThumbnails < imagesToShow.length) {
            setThumbnailStartIndex(thumbnailStartIndex + 1);
        }
    };

    const prevThumbnails = () => {
        if (thumbnailStartIndex > 0) {
            setThumbnailStartIndex(thumbnailStartIndex - 1);
        }
    };

    return (
        <div className="grid gap-4 w-full max-w-lg">
            {/* Ảnh chính */}
            <div className="relative flex justify-center">
                <motion.div
                    key={currentIndex}
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                    className="w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] bg-gray-100 rounded-lg flex items-center justify-center shadow-lg overflow-hidden relative"
                >
                    {imagesToShow.length > 0 ? (
                        <img
                            src={imagesToShow[currentIndex]}
                            alt="Main Product"
                            className={`w-full h-full object-cover rounded-lg ${isEditing && currentIndex >= validLinkImages.length ? "border-4 border-blue-500 shadow-lg glow" : ""
                                }`}
                        />
                    ) : (
                        <span className="text-gray-500">No Image Available</span>
                    )}

                    {/* Nút xóa ảnh khi chỉnh sửa */}
                    {isEditing && imagesToShow.length > 0 && (
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
                            onClick={() => handleRemoveImage(currentIndex)}
                        >
                            <FaTrash size={14} />
                        </button>
                    )}
                </motion.div>
            </div>

            {/* Danh sách ảnh nhỏ */}
            <div className="relative flex items-center w-full">
                {/* Nút chuyển ảnh nhỏ (chỉ hiển thị nếu có hơn 6 ảnh) */}
                {imagesToShow.length > maxThumbnails && (
                    <button
                        type="button"
                        onClick={prevThumbnails}
                        className="absolute left-[-30px] bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all z-10"
                        disabled={thumbnailStartIndex === 0}
                    >
                        <FaChevronLeft size={16} />
                    </button>
                )}

                <div className="grid grid-cols-6 gap-2 w-full">
                    {imagesToShow.slice(thumbnailStartIndex, thumbnailStartIndex + maxThumbnails).map((img, index) => (
                        <motion.div
                            key={index + thumbnailStartIndex}
                            whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0,0,0,0.3)" }}
                            className={`relative w-16 h-16 lg:w-20 lg:h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${index + thumbnailStartIndex === currentIndex ? "border-gray-900 scale-105" : "border-transparent"
                                }`}
                            onClick={() => setCurrentIndex(index + thumbnailStartIndex)}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Nút chuyển ảnh nhỏ (chỉ hiển thị nếu có hơn 6 ảnh) */}
                {imagesToShow.length > maxThumbnails && (
                    <button
                        type="button"
                        onClick={nextThumbnails}
                        className="absolute right-[-30px] bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-all z-10"
                        disabled={thumbnailStartIndex + maxThumbnails >= imagesToShow.length}
                    >
                        <FaChevronRight size={16} />
                    </button>
                )}
            </div>

            {/* Upload ảnh nếu đang chỉnh sửa */}
            {isEditing && (
                <div className="mt-4 flex flex-col items-center">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border p-2 rounded w-full max-w-sm"
                    />
                    <p className="text-sm text-gray-500 mt-2">Click vào ảnh để xem trước - Nhấn nút xóa để gỡ bỏ</p>
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
