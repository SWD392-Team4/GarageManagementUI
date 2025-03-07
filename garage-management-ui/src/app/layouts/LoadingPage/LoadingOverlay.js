import React, { useEffect, useState } from "react";
import "./Preloader.css";
import { useLoading } from "../../routers/LoadingContext";

export default function LoadingOverlay() {
  const [loading, setLoading2] = useState(true);
  const [hidden, setHidden] = useState(true);
  const { setLoading } = useLoading();
  useEffect(() => {
    setTimeout(() => setLoading2(false), 2000);
    setTimeout(() => setHidden(false), 2800);
    setTimeout(() => setLoading(false), 6000);
  }, []);
  return (
    <div
      id="preloader"
      className={`preloader-content  inset-0 z-50  ${
        !loading ? "loaded" : ""
      } ${!hidden ? "hidden" : ""}`}
    >
      <div className="loading-window">
        <div className="car">
          <div className="strike"></div>
          <div className="strike strike2"></div>
          <div className="strike strike3"></div>
          <div className="strike strike4"></div>
          <div className="strike strike5"></div>
          <div className="car-detail spoiler"></div>
          <div className="car-detail back"></div>
          <div className="car-detail center"></div>
          <div className="car-detail center1"></div>
          <div className="car-detail front"></div>
          <div className="car-detail wheel"></div>
          <div className="car-detail wheel wheel2"></div>
          <div className="car-text pt-10 font-protest text-xl uppercase">
            Turbo track
          </div>
          <div className="strike"></div>
        </div>
      </div>
    </div>
  );
}
