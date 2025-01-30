import React, { useState, useEffect } from "react";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { FaPhone } from "react-icons/fa6";
import "./TextHoverAnimation.scss";
const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const menuItems = ["home", "about", "service", "contact"];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`fixed top-0 left-0  w-full z-[100001] transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-white/5 backdrop-blur-sm shadow-md border-b border-gray-200`}
    >
      <div className="w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <div className="max-w-[180px]">
              <a href="/" className="inline-block">
                <img
                  src="assets/img/logo.svg"
                  alt="Logo"
                  className="h-[45px]"
                />
              </a>
            </div>

            <ul className=" flex-col  font-bold font-title text-base lg:flex-row lg:space-x-6 text-white lg:space-y-0 space-y-4 mt-16 lg:mt-0 lg:flex hidden">
              {menuItems.map((key) => (
                <li key={key}>
                  <a
                    href={`/${key}`}
                    className="text-hover-animaiton  hover:text-red-500"
                  >
                    <span className="menu-text">
                      {t(`home_page_menu.${key}`)
                        .split("")
                        .map((char, index) => (
                          <div key={index}>{char}</div>
                        ))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Menu Items */}
            <ul
              className={`${
                isMenuOpen ? "flex animate-slide-down" : "hidden"
              } absolute z-20 top-24 left-0 w-full backdrop-blur-sm bg-black/50 shadow-lg text-white font-bold font-title text-base p-4 lg:hidden justify-evenly transition-all duration-500`}
            >
              {menuItems.map((key) => (
                <li key={key} className="hover:text-red-500">
                  <a
                    href={`/${key}`}
                    className="text-hover-animaiton hover:text-red-500"
                  >
                    <span className="menu-text">
                      {t(`home_page_menu.${key}`)
                        .split("")
                        .map((char, index) => (
                          <div key={index}>{char}</div>
                        ))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact + Menu Button */}
            <div className="flex items-center space-x-6">
              <a
                href="tel:1-800-915-6271"
                className="flex items-center space-x-2 text-base text-white hover:text-red-500"
              >
                <div className="bg-red-500 p-2 rounded-full text-white">
                  <FaPhone />
                </div>
                <span>1-800-915-6271</span>
              </a>
              <LanguageSwitcher />

              <div>
                {/* Hamburger Menu */}
                <button
                  className="relative z-20 lg:hidden p-2 bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
