import React from "react";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo và Mô tả */}
        <div>
          <h2 className="text-2xl font-bold mb-4">LOGO</h2>
          <p className="text-gray-400 text-sm mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's stan. Lorem Ipsum is.
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-orange-700 p-3 rounded-full">
              <FaPhone />
            </div>
            <span className="text-lg font-bold">+84 111-111-11</span>
          </div>
        </div>

        {/* Quick Links - 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">QUICK LINK</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links - 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">QUICK LINK</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Appointment
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FA Question
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog/ News
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Team
              </a>
            </li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">LOCATION & CONTACT</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-3">
              <span>📍</span>
              <span>FPT TP. HCM Long Thành Mỹ, Thành Phố Thủ Đức</span>
            </li>
            <li className="flex items-center gap-3">
              <span>📧</span>
              <span>email@email.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span>⏰</span>
              <span>Mon - Sat: Open 24/7</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-red-950 mt-12 pt-6 text-center text-gray-500 text-sm max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p>Copyright 2025, All Right reserved</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white">
              Facebook
            </a>
            <a href="#" className="hover:text-white">
              Twitter
            </a>
            <a href="#" className="hover:text-white">
              Instagram
            </a>
            <a href="#" className="hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
