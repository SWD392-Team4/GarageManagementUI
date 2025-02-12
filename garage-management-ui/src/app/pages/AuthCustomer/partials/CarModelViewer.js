import React from "react";
import "@google/model-viewer"

const CarModelViewer = () => {

    return (
        <div className="flex justify-center items-center bg-black">
            <model-viewer
                src="/assets/model/supercar.glb"
                alt="3D Car Model"
                auto-rotate
                camera-controls
                ar
                ar-modes="webxr"
                disable-pan
                disable-zoom
                min-camera-orbit="auto 80deg auto"
                max-camera-orbit="auto 80deg auto"
                touch-action="none"
                shadow-intensity="1"
                camera-orbit="0deg 75deg 2m"
                field-of-view="50deg"
                style={{ width: "1000px", height: "350px" }}
            />
        </div>
    );
};

export default CarModelViewer;
