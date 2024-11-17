import {useState} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import reviewsData from '../data/DoctorReviews.json'

const DoctorReviews = () => {
  
  const [reviews,setReaviews]=useState(reviewsData)
  return (
    <div className="max-w-3xl mx-3 ml-6 mb-5 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Doctor's Review</h2>

      <div className="space-y-6 mb-8">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-lg shadow border border-gray-100 p-6">
            <div className="flex items-start gap-8 flex-wrap justify-center">
              {/* <div></div> */}
              <img 
                src={review.avatar}
                alt={`${review.name}'s avatar`}
                className="w-16 h-16 rounded-full object-cover"
              />
              
              <div className=" flex-initial w-5/6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                  <div className="text-sm text-gray-500">
                    {review.date} • {review.time}
                  </div>
                </div>
                
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {review.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between flex-wrap">
        <button className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex-wrap">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-green-700 text-white">
            1
          </button>
          {[2, 3, '...', 8, 9, 10].map((page, index) => (
            <button 
              key={index}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600"
            >
              {page}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex-wrap">
         <p>Next</p> 
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DoctorReviews;