import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

export default function BlogCard({ title, description, date, image, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
      whileTap={{ scale: 0.98 }}  // Slight shrink on tap
      transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth animation
      className={`relative rounded-lg shadow-md w-full bg-cover bg-center flex flex-col ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Blur Effect on Background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-500" />

      {/* Content */}
      <CardContent className="relative p-6 flex flex-col gap-4 z-10">
        <CardTitle className="text-white text-xl md:text-2xl font-semibold break-words">
          {title}
        </CardTitle>
        <CardDescription>
          <p className="text-white">
            {description}
          </p>
        </CardDescription>

        <div className="flex justify-between items-center mt-auto">
          <motion.button
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}   
            className="text-blue-600 font-semibold hover:underline"
          >
            Learn More
          </motion.button>
          <span className="text-white">
            {date}
          </span>
        </div>
      </CardContent>
    </motion.div>
  );
}
