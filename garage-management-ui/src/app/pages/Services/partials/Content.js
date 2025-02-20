import React from "react";

const Content = () => {
  return (
    <div className="flex-1 p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold">Damage Roof Repair</h1>
      <p className="text-gray-600 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Nội dung chính */}
      <div className="mt-6 flex flex-col md:flex-row items-start">
        {/* Phần text */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold">Approach</h2>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Hình ảnh */}
        <div className="md:w-1/3 mt-4 md:mt-0 md:ml-6">
          <img
            src="https://source.unsplash.com/400x300/?construction,worker"
            alt="Construction worker"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Marriage Counselling</h2>
        <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-2">
          <li>Do enim minim veniam quis nostrud exercitation?</li>
          <li>
            What commodo consequat duis aute dolor in voluptate velit esse?
          </li>
          <li>How officia deserunt mollit anim id est laborum?</li>
          <li>Are sint occaecat cupidatat non proident?</li>
        </ul>
      </div>
    </div>
  );
};

export default Content;
