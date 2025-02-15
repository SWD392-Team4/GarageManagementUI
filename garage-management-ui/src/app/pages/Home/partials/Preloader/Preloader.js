import React, { useEffect, useState } from "react";
import "./Preloader.css";
export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    setTimeout(() => setHidden(false), 2800);
  }, []);
  return (
    <div
      id="preloader"
      className={`preloader-content ${!loading ? "loaded" : ""} ${
        !hidden ? "hidden" : ""
      }`}
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
