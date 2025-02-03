import React from "react";
import { Link } from "react-router-dom";
import signInImage from "../../../assets/auth/sign-in.png";

export default function LogOut() {
  document.title = "Thank you | CLCA | TURBO TRACK";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-5xl">
        <section className="bg-auth">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left side with logos */}
                <div className="lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                  <div className="text-center">
                    <Link to="/">
                      <span>TURBO TRACK</span>
                    </Link>
                    <div className="mt-5">
                      <img
                        src={signInImage}
                        alt="Sign In"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Right side with form */}
                <div className="lg:w-1/2 p-8 bg-[#5E57c3] text-white flex items-center justify-center">
                  <div className="w-full text-center">
                    <h5 className="text-2xl font-semibold mb-6">
                      You are Logged Out!
                    </h5>
                    <p className="text-gray-300 mb-8">
                      Thank you for using CLCA.
                    </p>
                    <div>
                      <Link to="/worker">
                        <button
                          type="submit"
                          className="w-3/4 py-2 px-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-transform hover:translate-y-[-2px] mx-auto block"
                        >
                          Sign In
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
