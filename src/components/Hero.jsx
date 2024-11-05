// Hero.js
import React from "react";
import { motion } from "framer-motion";
import heroImg from "../components/Images/home1-img.jpg";

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-left lg:h-screen h-[550px] flex flex-col items-start justify-center"
      style={{ backgroundImage: "url(" + heroImg + ")" }}
    >
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="flex  flex-col items-start justify-center lg:mt-32 w-screen gap-40 md:gap-20 sm:gap-40 mt-32">
        <div className="relative  w-fit lg:w-[60%] md:w-[60%] z-10  text-left text-white px-6 md:px-12 lg:pl-24 ">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white text-orange-500  text-lg font-extrabold px-4 py-2 inline-block rounded-lg"
          >
            WELCOME TO PAWSCARE!
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl lg:text-7xl w-full  md:text-7xl font-extrabold mt-4 leading-tight"
          >
            Best Care of Our Little Friends
          </motion.h1>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 bg-orange-400 rounded-sm hover:bg-gray-600 transition-all duration-500 text-white font-bold py-4 px-10"
          >
            LEARN MORE
          </motion.button>
        </div>

        <div className="relative z-10 mt-16 w-full flex flex-wrap items-center justify-center">
          <div className="absolute -bottom-20  transform translate-y-1/2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16 lg:px-32">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-left hover:bg-brown-600 hover:translate-y-[-10px] transition-all duration-300">
              <div className="flex items-center mb-4 text-orange-500 hover:text-brown-800">
                <span className="material-icons-outlined text-3xl mr-2">
                  home
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  Pet Boarding
                </h3>
              </div>
              <p className="text-gray-600">
                Place for dogs & cats to stay while you’re away!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-left hover:bg-brown-600 transition-all duration-300 hover:translate-y-[-10px]">
              <div className="flex items-center mb-4 text-orange-500 hover:text-brown-800">
                <span className="material-icons-outlined text-3xl mr-2">
                  healing
                </span>
                <h3 className="text-xl font-bold text-gray-800">
                  Veterinary Care
                </h3>
              </div>
              <p className="text-gray-600">
                Pet health and wellness that’s one step ahead.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-left flex flex-col hover:bg-brown-500 transition-all duration-300 hover:translate-y-[-10px] hover:bg-brown-600">
          <div className="flex items-center mb-4 text-orange-500 hover:text-brown-800">
            <span className="material-icons-outlined text-3xl mr-2">content</span>
            <h3 className="text-xl font-bold text-gray-800">Pet Grooming</h3>
          </div>
          <p className="text-gray-600">Making dogs & cats look great is our passion!</p>
        </div>
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
