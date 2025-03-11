import React from 'react';

const FeatureSection = () => {
  return (
    <div className="bg-black relative overflow-hidden">

      <div className="container-fluid">
        <div className="flex justify-center">
          {/* Feature Image */}
          <div className="w-full lg:w-1/2 p-0 relative">
            <div className="bg-cover bg-center bg-no-repeat w-full h-full" style={{ backgroundImage: "url('/assets/img/feature-bg.jpg')" }}>
              <div className="absolute right-[-170px] top-[-70px] w-[285px] h-[700px] bg-black transform rotate-[-19deg]"></div>
            </div>
          </div>

          {/* Feature Content */}
          <div className="w-full lg:w-1/2 p-0">
            <div className="max-w-[670px] mr-auto pt-[100px] pb-[100px] relative z-10">
              <h2 className="font-semibold text-[38px] text-white mb-10">Our Features</h2>
              <ul className="list-none p-0">
                <li className="relative pl-[70px] mb-10 ml-[50px]">
                  <i className="absolute left-0 top-0 w-[50px] h-[50px] leading-[50px] text-center text-black bg-[#fdb819] rounded-[10px] text-[27px]">📦</i>
                  <h3 className="font-semibold text-[20px] text-white mb-2">Trusted & Quality Work</h3>
                  <p className="text-[#aeadad] text-[14px] max-w-[380px]">Lorem ipsum the dolor sit amet, consectetur adising elit, sed do.the dolor sit amet, consectetur</p>
                </li>
                <li className="relative pl-[70px] mb-10 ml-[100px]">
                  <i className="absolute left-0 top-0 w-[50px] h-[50px] leading-[50px] text-center text-black bg-[#fdb819] rounded-[10px] text-[27px]">🚚</i>
                  <h3 className="font-semibold text-[20px] text-white mb-2">Fast Service Delivery</h3>
                  <p className="text-[#aeadad] text-[14px] max-w-[380px]">Lorem ipsum the dolor sit amet, consectetur adising elit, sed do.the dolor sit amet, consectetur</p>
                </li>
                <li className="relative pl-[70px] mb-0 ml-[150px]">
                  <i className="absolute left-0 top-0 w-[50px] h-[50px] leading-[50px] text-center text-black bg-[#fdb819] rounded-[10px] text-[27px]">💵</i>
                  <h3 className="font-semibold text-[20px] text-white mb-2">Money Back Guaranty</h3>
                  <p className="text-[#aeadad] text-[14px] max-w-[380px]">Lorem ipsum the dolor sit amet, consectetur adising elit, sed do.the dolor sit amet, consectetur</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;