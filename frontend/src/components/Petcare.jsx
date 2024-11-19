import { useState } from 'react';
import img1 from '../components/Images/dog.png';
import img2 from '../components/Images/crown.png';
import img3 from '../components/Images/bone.png';
import { motion } from 'framer-motion';

const PetCareSection = () => {

  const [hove,sethove]=useState(false)
  return (
    <div className='mt-20 lg:mt-0'>
    {/* Cards Section */}
    <div className="relative z-20 mb-[-100px] mt-[-50px]  w-full flex flex-wrap items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-16 lg:px-32">
        <div className="bg-white w-fit p-6 rounded-lg shadow-lg text-left hover:bg-brown-600 hover:translate-y-[-10px] transition-all duration-300">
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

        <div className="bg-white p-6 rounded-lg shadow-lg text-left flex flex-col hover:bg-brown-500 transition-all duration-300 hover:translate-y-[-10px]">
          <div className="flex items-center mb-4 text-orange-500 hover:text-brown-800">
            <span className="material-icons-outlined text-3xl mr-2">
              content
            </span>
            <h3 className="text-xl font-bold text-gray-800">
              Pet Grooming
            </h3>
          </div>
          <p className="text-gray-600">
            Making dogs & cats look great is our passion!
          </p>
        </div>
      </div>
    </div>
    <section className="flex z-0 flex-col md:flex-row items-center justify-center p-8 bg-white space-y-6 md:space-y-0 md:space-x-12 md:mx-[10%] lg:pt-48 md:pt-96 pt-96">
      {/* Left Side - Image and Icons */}
      <div className="relative bg-white w-full md:w-2/4 h-auto md:h-[400px] lg:h-[500px] flex items-center justify-center ">
        <img src={img1} alt="Pug" className="w-3/4 h-auto md:w-64 lg:w-80" /> {/* Responsive size for img1 */}
        {/* Icons */}
        <motion.div
          className="absolute top-1 right-10 md:right-36"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <img src={img2} alt="Crown Icon" className="w-16 h-16 md:w-20 md:h-20" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-5 md:left-15"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <img src={img3} alt="Bone Icon" className="w-16 h-16 md:w-20 md:h-20" />
        </motion.div>
      </div>

      {/* Right Side - Text and Features */}
      <div className="text-left md:text-left md:w-2/4 md:mx-[10%]">
        <div className="font-bold text-orange-500 p-3 bg-white border inline-block rounded-md shadow-md drop-shadow-md text-xl">ABOUT US</div>
        <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mt-2">
          We Love to Take Care of Your Pets
        </h2>
        <p className="text-gray-600 mt-4 text-sm md:text-base lg:text-lg">
          Pawscare is the largest specialty pet retailer of services and solutions for the lifetime needs of pets. At Pawscare, we love pets, and we believe pets make us better people.
        </p>
        
        {/* Feature List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Feature title="Skilled Personal" />
          <Feature title="Pets Care 24/7" />
          <Feature title="Best Veterinarians" />
          <Feature title="Quality Food" />
        </div>
      </div>
    </section>
    </div>
  );
};

const Feature = ({ title }) => (
  <div className="flex items-center space-x-2 ">
    
    <div className="bg-orange-500 text-white rounded-md p-2" onMouseEnter={()=>{sethove(true)}} onMouseLeave={()=>{sethove(false)}}> 
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-gray-700 font-semibold">{title}</span>
  </div>
);

export default PetCareSection;
