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
      <div class="loading-window">
        <div class="car">
          <div class="strike"></div>
          <div class="strike strike2"></div>
          <div class="strike strike3"></div>
          <div class="strike strike4"></div>
          <div class="strike strike5"></div>
          <div class="car-detail spoiler"></div>
          <div class="car-detail back"></div>
          <div class="car-detail center"></div>
          <div class="car-detail center1"></div>
          <div class="car-detail front"></div>
          <div class="car-detail wheel"></div>
          <div class="car-detail wheel wheel2"></div>
          <div class="car-text pt-10 font-protest text-xl uppercase">
            Turbo track
          </div>
          <div class="strike"></div>
        </div>
      </div>
    </div>
  );
}
