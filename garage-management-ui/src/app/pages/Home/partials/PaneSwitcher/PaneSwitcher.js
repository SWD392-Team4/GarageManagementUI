import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GiAutoRepair } from "react-icons/gi";

const PaneSwitcher = ({
  title1,
  title2,
  beforeImg,
  afterImg,
  backgroundIMG,
}) => {
  const [leftPaneWidth, setLeftPaneWidth] = useState("w-1/2");
  const [rightPaneWidth, setRightPaneWidth] = useState("w-1/2");
  const { t } = useTranslation("ver1");

  const handleLeftClick = () => {
    setLeftPaneWidth("w-0");
    setRightPaneWidth("w-full");
  };

  const handleRightClick = () => {
    setLeftPaneWidth("w-full");
    setRightPaneWidth("w-0");
  };

  return (
    <div
      className="flex flex-col items-center text-center h-screen bg-gray-50 "
      style={{ backgroundImage: `url(${backgroundIMG})` }}
    >
      {/* Tiêu đề */}
      <div className="my-10">
        <h3 className="text-3xl md:text-4xl font-space text-red-500 font-semibold uppercase mb-2 flex items-center justify-center gap-4">
          <GiAutoRepair className="text-3xl md:text-2xl animate-spin-slow" />
          {t(`PaneSwitcher.title1`)}
          <GiAutoRepair className="text-3xl md:text-2xl  animate-spin-slow" />
        </h3>
        <h2 className="text-2xl font-handjet  lg:text-6xl font-bold py-4 text-white">
          {t(`PaneSwitcher.title2`)}
        </h2>
      </div>

      {/* Hình ảnh Before & After */}
      <div className="flex h-screen relative overflow-hidden w-full">
        {/* Left Pane */}
        <div
          className={`bg-black text-white text-center relative transition-all duration-1000 ${leftPaneWidth} bg-cover`}
          style={{ backgroundImage: `url(${beforeImg})` }}
        >
          <div className="absolute flex items-center h-screen right-0 w-48">
            <div
              className="w-full h-48 flex items-center cursor-pointer font-protest text-3xl transition duration-500 hover:bg-gray-300 bg-white text-black justify-center"
              onClick={handleLeftClick}
            >
              {t(`PaneSwitcher.After`)}
            </div>
          </div>
          <div className="flex items-center justify-center font-title p-48 h-screen bg-black bg-opacity-50 text-white text-2xl font-semibold">
            {/* {t(`PaneSwitcher.Before`)} */}
          </div>
        </div>

        {/* Right Pane */}
        <div
          className={`bg-white text-black text-center relative transition-all duration-1000 ${rightPaneWidth} bg-cover`}
          style={{ backgroundImage: `url(${afterImg})` }}
        >
          <div className="absolute flex items-center h-screen left-0 w-48">
            <div
              className="w-full h-48 flex font-protest text-3xl items-center cursor-pointer transition duration-500 hover:bg-gray-700 bg-black text-white justify-center"
              onClick={handleRightClick}
            >
              {t(`PaneSwitcher.Before`)}
            </div>
          </div>
          <div className="flex items-center font-semibold justify-center p-48 h-screen bg-white bg-opacity-50 text-black text-2xl ">
            {/* {t(`PaneSwitcher.After`)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaneSwitcher;
