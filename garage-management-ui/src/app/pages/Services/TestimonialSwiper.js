import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { RiFeedbackLine } from "react-icons/ri";
import "swiper/css/pagination";
const testimonials = [
  {
    name: "Nguyễn Văn Hưng",
    role: "Chủ Gara Hưng Auto",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Từ khi sử dụng Turbo Track, tôi có thể theo dõi tình trạng sửa chữa của từng xe một cách dễ dàng. Không còn tình trạng chậm tiến độ hay mất thông tin khách hàng nữa!",
  },
  {
    name: "Trần Minh Quang",
    role: "Kỹ thuật viên",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Turbo Track giúp tôi quản lý công việc hàng ngày tốt hơn. Giờ đây, tôi biết chính xác xe nào cần làm gì, tránh nhầm lẫn và làm việc nhanh hơn rất nhiều.",
  },
  {
    name: "Lê Thị Mai",
    role: "Nhân viên lễ tân",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    review:
      "Tôi có thể dễ dàng theo dõi lịch hẹn của khách hàng và cập nhật tình trạng sửa chữa ngay trên hệ thống. Dịch vụ khách hàng của gara cải thiện rõ rệt nhờ Turbo Track!",
  },
  {
    name: "Phạm Văn Dũng",
    role: "Chủ Gara Dũng Auto",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    review:
      "Trước đây, tôi thường xuyên gặp vấn đề trong việc sắp xếp công việc cho thợ. Giờ đây, mọi thứ đã chuyên nghiệp hơn, khách hàng hài lòng hơn!",
  },
  {
    name: "Hoàng Thanh Tú",
    role: "Quản lý Gara",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    review:
      "Turbo Track giúp tôi quản lý phụ tùng tồn kho, theo dõi tiến độ sửa chữa và giao xe đúng hẹn. Công việc trở nên hiệu quả hơn bao giờ hết!",
  },
  {
    name: "Đặng Quốc Bảo",
    role: "Thợ sửa chữa",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
    review:
      "Trước đây, tôi phải ghi chép thủ công tình trạng xe. Giờ chỉ cần mở Turbo Track là có đầy đủ thông tin, tiết kiệm thời gian và tránh sai sót.",
  },
];

const TestimonialSwiper = () => {
  return (
    <section className="bg-white relative w-full min-h-screen overflow-hidden">
      {/* Phần Header */}
      <div className="h-24 md:h-20"></div>
      <div className="container mx-auto px-4">
        {/* Tiêu đề dịch vụ */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 lg:mb-12">
          <div className="lg:w-1/2">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl text-red-500 font-semibold uppercase mb-2 flex items-center justify-center lg:justify-start gap-2">
                <RiFeedbackLine className="text-4xl md:text-5xl" />
                Testimonials
              </h3>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                What Our Client Say About TurboTrack
              </h2>
            </div>
          </div>
          <div className="lg:w-1/2 text-gray-600 text-sm md:text-base mt-4 lg:mt-0 px-2 md:px-0 text-center lg:text-left">
            Our clients trust TurboTrack to streamline their repair process,
            manage appointments efficiently, and ensure their vehicles are
            serviced on time. With real-time updates and organized workflow
            management, we help garages provide top-notch service while reducing
            delays and errors.
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              nextEl: ".custom-button-next",
              prevEl: ".custom-button-prev",
            }}
            autoplay={{ delay: 5000 }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            speed={600}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              575: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="overflow-hidden"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="p-3 md:p-4 bg-white">
                <div className="relative flex flex-col items-center">
                  {/* Ảnh dịch vụ */}
                  <img
                    src={item.image}
                    alt="Service"
                    className="w-20 h-20 rounded-full relative z-10 top-16 -right-1/4 md:w-32  md:h-32 object-cover"
                  />

                  {/* Nội dung */}
                  <div className="p-4 pt-14 shadow-lg bg-white text-left border border-transparent hover:border-rose-700 rounded-lg transition-all group duration-300 relative w-full">
                    {/* Icon */}
                    <div className="flex justify-start mx-4 md:mx-10">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <span key={i} className="text-yellow-500 text-xl">
                            ★
                          </span>
                        ))}
                    </div>
                    <h3 className="text-xl md:text-3xl font-semibold text-gray-800 mt-6 md:mt-8 hover:text-rose-700 duration-300 transition-colors"></h3>
                    <p className="text-sm md:text-lg font-normal mx-4 md:mx-10 text-gray-600 mt-2">
                      {item.review}
                    </p>
                    <h4 className="font-semibold text-gray-900 mt-4 mx-4 md:mx-10">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-sm mx-4 md:mx-10">
                      {item.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiper-pagination pt-3"></div>
      </div>
    </section>
  );
};

export default TestimonialSwiper;
