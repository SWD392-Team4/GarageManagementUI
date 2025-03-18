import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function CarConditionImages({
  appointmentDetails,
  selectedService,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {/* Car conditions image */}
      <h4 className="mt-4 font-semibold">Car Conditions Image :</h4>

      {appointmentDetails[selectedService]?.carConditionImages && (
        <div className="space-y-6">
          {["Before", "After"].map((stage) => {
            const stageImages = appointmentDetails[
              selectedService
            ].carConditionImages.filter((img) => img.conditionStage === stage);

            if (stageImages.length === 0) return null;

            return (
              <div key={stage}>
                <h5 className="text-lg font-semibold text-gray-700">
                  {stage} Condition:
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  {stageImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.imageLink}
                        alt={`Car Condition ${stage} - ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg shadow-md cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        onClick={() => setSelectedImage(image.imageLink)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4 max-w-3xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged Car Condition"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
