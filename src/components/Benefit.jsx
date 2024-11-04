import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import catImage from '../components/Images/dog.png';

const BenefitSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const benefits = [
    {
      title: 'Quality toys & food for your pets',
      description: 'Please be aware that you will be charged for the rest of your pet’s meals up to $5/meal. If you do not bring your pet’s own food, we offer our Fromm’s house cuisine.',
    },
    { title: 'Premium pet care for your friend', description: 'High-quality care and attention for your beloved pet.' },
    { title: 'Incredible salon pet services', description: 'A range of salon services to pamper your pet.' },
    { title: 'Indoor & outdoor activities for pets', description: 'Fun and engaging activities for pets of all kinds.' },
  ];

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col md:flex-row items-center bg-[#FFF7ED] p-8 md:p-16 gap-10 font-poppins">
      {/* Text Section */}
      <div className="md:mx-[10%]">
        <div className="inline-block text-orange-500 bg-white font-bold py-2 px-4 rounded-md shadow text-2xl">
          BENEFITS
        </div>
        <h2 className="text-5xl font-bold text-gray-800 mt-4">
          Why Choose Our Pet Care Company?
        </h2>
        <div className="mt-8 space-y-4 w-full">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${openIndex === index ? 'bg-orange-100' : 'bg-[#FEF4E8]'}`}
              onClick={() => toggleOpen(index)}
            >
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800">
                  {benefit.title}
                </h3>
                <motion.span
                  className="text-orange-500 font-bold text-2xl"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 0 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? '-' : '+'}
                </motion.span>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="text-gray-600 mt-2 text-sm overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ maxHeight: '100px', overflowY: 'auto' }}
                  >
                    <p>{benefit.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 relative justify-center hidden md:block">
        <img
          src={catImage}
          alt="Cat with toy"
          className="w-full max-w-xs h-auto object-cover relative z-10"
        />
        {/* Optional floating icons */}
        <motion.div
          className="absolute top-10 right-10 text-orange-400 text-3xl"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          ❤️
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-16 text-orange-400 text-3xl"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          🧡
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitSection;
