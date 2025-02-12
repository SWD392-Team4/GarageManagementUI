import React from "react";
import "@google/model-viewer"


const CarModelBMW = () => {

    return (
        <div className="flex justify-center items-center p-4 bg-black">
            <model-viewer
                src="/assets/model/mclaren.glb"
                alt="3D Car Model"
                // auto-rotate
                // camera-controls
                ar
                ar-modes="webxr"
                disable-tap
                disable-pan
                disable-zoom

                //goc nhin
                min-camera-orbit="auto 80deg auto"
                max-camera-orbit="auto 80deg auto"
                touch-action="none"
                shadow-intensity="0"
                camera-orbit="-25deg 45deg 2m"
                field-of-view="120deg"

                style={{ width: "850px", height: "520px" }}
            />
        </div>
    );
};

export default CarModelBMW;
