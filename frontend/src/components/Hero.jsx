import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImg1 from "../components/Images/home1-img.jpg";
import heroImg2 from "../components/Images/home2-img.jpg";
import heroImg3 from "../components/Images/home3-img.jpg";

const heroImages = [heroImg1, heroImg2, heroImg3];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: {
      x: 1000,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -1000,
      opacity: 0,
    },
  };

  return (
    <div className="relative lg:h-screen h-[550px] flex flex-col items-start justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-left"
            style={{ backgroundImage: `url(${heroImages[index]})` }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 1.2,
            }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black opacity-15"></div>

      {/* Main Content Section */}
      <div className="flex flex-col items-start justify-center lg:mt-16 md:gap-20 gap-40 mt-32 z-10">
        <div className="relative w-fit lg:w-[70%] md:w-[60%] text-left text-white px-6 md:px-12 lg:pl-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white text-orange-500 text-lg font-extrabold px-4 py-2 inline-block rounded-lg"
          >
            WELCOME TO PAWSCARE!
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl lg:text-7xl w-full md:text-7xl font-extrabold mt-4 leading-tight"
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

      </div>
    </div>
  );
};

export default Hero;
