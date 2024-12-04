import { useState } from 'react';
import { motion } from 'framer-motion';
import catImage from '../components/Images/dog.png';
import vetImage from '../components/Images/dog.png';
import dogImage from '../components/Images/dog.png';
import { FaPaw } from "react-icons/fa";

const PetServices = () => {
  return (
    <section className="bg-[#FFF7ED] py-12 px-4 text-center">
      {/* Header */}
      <div className="mb-12">
        <div className="font-bold text-orange-500 p-2 bg-white border inline-block rounded-md shadow-md drop-shadow-md text-2xl">
          SERVICES
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 m-4">What We Can Offer</h2>
        <p className="text-gray-600 mt-2 max-w-lg mx-auto text-sm md:text-base">
        Televets is the largest specialty pet retailer of services and solutions for the lifetime needs of pets. At Televets, we love pets.
        </p>
      </div>

      {/* Service Cards */}
      <div className="flex flex-wrap justify-center items-center w-full"> 
        <ServiceCard 
          image={catImage} 
          title="Hotel For Pets" 
          description="Televets is the largest specialty pet retailer of services and solutions."
        />
        <ServiceCard 
          image={vetImage} 
          title="Veterinary Care" 
          description="Televets is the largest specialty pet retailer of services and solutions."
        />
        <ServiceCard 
          image={dogImage} 
          title="Best Activity" 
          description="Televets is the largest specialty pet retailer of services and solutions."
        />
      </div>
    </section>
  );
};

const ServiceCard = ({ image, title, description }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-full sm:w-80 md:w-96 m-4"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-orange-600 rounded-md text-center hover:bg-orange-400 cursor-pointer"
        
      >
        <h3 className="text-xl md:text-2xl font-bold text-white p-4 flex items-center justify-center">
          {title}
          <div className="pl-2">
            <FaPaw xHeight={10} />
          </div>
        </h3>
      </motion.div>

      <div className="p-4">
        <p className="text-gray-700 text-start text-sm md:text-base">{description}</p>
        <button className="text-orange-500 mt-4 font-semibold flex items-center justify-center">
          <div className="flex">LEARN MORE</div>
          <motion.div
            className="ml-2"
            animate={{ rotateZ: hover ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaPaw />
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default PetServices;
