import { ImLocation2 } from "react-icons/im";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import parse from "html-react-parser";
import { MdHomeRepairService } from "react-icons/md";

const Contact1 = ({
  Title,
  subTitle,
  address,
  email,
  number,
  img,
  clientNumber,
  client,
  subtitle2,
  title2,
  submit,
  thankyou,
}) => {
  return (
    <section className="bg-gray-50 relative w-full min-h-screen overflow-hidden">
      <div className="container mx-auto ">
        <div className="flex flex-wrap -mx-4 ">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 px-5 pt-20">
            <div class="grid grid-cols-3 gap-4 relative z-20">
              <div className="col-span-2 relative z-20">
                {/* Contact Info Card */}
                <div className="bg-white p-6 shadow-lg rounded-tl-[90px] px-10 ring-1 ring-red-500 ">
                  <div className="bg-red-500 h-1 w-20 my-6"></div>
                  <h3 className=" font-bold my-4 text-3xl md:text-3xl">
                    {Title}
                  </h3>
                  <p className="py-6 text-lg text-gray-600">{subTitle}</p>

                  {/* Address */}
                  <div className="flex items-start py-4 group">
                    <ImLocation2 className="w-6 h-6 text-red-500 mr-3 group-hover:animate-slideRotate" />
                    <p className="text-lg text-gray-600">{parse(address)}</p>
                  </div>

                  {/* Email */}
                  <div className="flex items-start py-4 group">
                    <IoMailOpenOutline className="w-6 h-6 text-red-500 mr-3 group-hover:animate-slideRotate" />

                    <div className="text-lg text-gray-600">{parse(email)}</div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start group md:pb-7">
                    <FaPhoneVolume className="w-6 h-6 text-red-500 mr-3 group-hover:animate-slideRotate" />
                    <p className="text-lg text-gray-600">{parse(number)}</p>
                  </div>
                </div>
              </div>

              {/* Client Info */}
              <div className=" flex justify-center items-center text-center  col-span-1">
                <div className="bg-white shadow-lg p-6">
                  <h3 className="text-3xl  font-bold text-red-500">
                    {clientNumber}
                  </h3>
                  <p className="text-gray-500">{client}</p>
                </div>
              </div>
              {/* Image Thumbnail */}
              <div className=" col-span-3 flex justify-end ">
                <img
                  src={img}
                  alt="Contact Thumbnail"
                  className="shadow-lg max-w-full w-full z-10 hidden lg:block relative z-0 -top-1/2 md:w-2/3 h-48 md:h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 px-4">
            {/* Heading */}
            <div className="my-20">
              <h3 className="text-lg font-raleway font-bold text-red-500 uppercase mb-2 flex md:items-center  justify-start gap-2">
                <MdHomeRepairService className="text-3xl md:text-4xl animate-bounce" />

                {subtitle2}
              </h3>
              <h2 className="animate-typing overflow-hidden whitespace-nowrap  pr-5 text-4xl text-blue-950 font-medium">
                {title2}
              </h2>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full p-3 bg-slate-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full p-3 bg-slate-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-3 bg-slate-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
                <select
                  className="w-full p-3 bg-slate-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  <option value="car-service">Car Service</option>
                  <option value="car-wash">Car Wash</option>
                  <option value="engine-oil">Engine Oil</option>
                  <option value="motor-service">Motor Service</option>
                </select>
              </div>
              <textarea
                name="message"
                rows="6"
                placeholder="Message"
                className="w-full p-3 bg-slate-200/70 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              ></textarea>

              <div class="flex justify-start">
                <button
                  class=" group p-5 cursor-pointer  relative      text-xl     border-0  flex  items-center 
      justify-center bg-transparent text-red-600 font-shadows font-bold  h-auto   w-[170px]   overflow-hidden    transition-all duration-100"
                >
                  <span class="group-hover:w-full  absolute left-0  h-full w-5 border-y-2 border-l-2 border-red-500 transition-all duration-500"></span>
                  <p
                    class="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
                  >
                    {submit}
                  </p>
                  <span class="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
                    {thankyou}
                  </span>
                  <span class="group-hover:w-full absolute right-0 h-full w-5  border-y-2 border-r-2  border-red-500 transition-all duration-500"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact1;
