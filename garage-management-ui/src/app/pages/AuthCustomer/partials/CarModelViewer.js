import React, { useEffect, useState } from "react";
import "@google/model-viewer";

const CarModelViewer = () => {
    const [viewerStyle, setViewerStyle] = useState({
        width: "1000px",
        height: "350px",
    });

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 640) {
                // Mobile
                setViewerStyle({ width: "100%", height: "200px" });
            } else if (window.innerWidth < 768) {
                // Tablet nhỏ
                setViewerStyle({ width: "100%", height: "250px" });
            } else if (window.innerWidth < 1024) {
                // Tablet lớn
                setViewerStyle({ width: "900px", height: "300px" });
            } else {
                // Laptop và PC
                setViewerStyle({ width: "1000px", height: "350px" });
            }
        };

        updateSize(); // Gọi lần đầu để thiết lập đúng kích thước
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div className="flex justify-center items-center bg-black w-full">
            <model-viewer
                src="/assets/model/supercar.glb"
                alt="3D Car Model"
                ar
                ar-modes="webxr"
                disable-tap
                disable-pan
                disable-zoom
                min-camera-orbit="auto 80deg auto"
                max-camera-orbit="auto 80deg auto"
                touch-action="none"
                shadow-intensity="1"
                camera-orbit="-25deg 45deg 2m"
                field-of-view="50deg"
                loading="eager"
                style={viewerStyle}
            />
        </div>
    );
};

export default CarModelViewer;
