import experiencesData from '../data/DoctorExperiences.json'
import { useState } from 'react';
const DoctorPracticeExperience = () => {
  const [experiences,setExperiences]=useState(experiencesData)

  return (
    <div className="max-w-2xl  mx-3 mb-5 ml-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Practice Experience</h2>
      
      <div className="space-y-4 ml-2">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white rounded-lg shadow border border-gray-100 p-6">
            <div className="flex gap-4">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={exp.logo} 
                  alt={`${exp.company} logo`} 
                  className="w-12 h-12 rounded-lg object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.company}
                </h3>
                
                <div className="flex flex-wrap gap-2 items-center mt-1">
                  <span className="text-gray-700">{exp.role}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-700">{exp.type}</span>
                </div>

                <div className="flex flex-wrap gap-2 items-center mt-1 text-gray-500 text-sm">
                  <span>{exp.period}</span>
                  <span className="text-gray-400">•</span>
                  <span>{exp.duration}</span>
                </div>

                <div className="mt-1 text-gray-500 text-sm">
                  {exp.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPracticeExperience;