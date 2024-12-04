import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import testeMonialsData from '../data/testimonials.json'


const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-6 h-6 ${
          i < rating ? 'text-[#FF9853]' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ReviewSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [testimonials,setTestemonials]=useState(testeMonialsData)

  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:mt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#f97316] mb-4">Televets Reviews</h1>
        <p className="text-dark max-w-2xl mx-auto">
        Televets is the largest specialty pet retailer of services and solutions
          for the lifetime needs of pets. At Televets, we love pets.
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div className={`flex items-center justify-center p-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-600'}`}>
            <div className="rounded-lg shadow-lg p-8 max-w-4xl shadow-gray-500 max-h-[55vh]">
              <div className="flex flex-wrap items-start gap-6 p-6">
                <div className="relative">
                  <div className="absolute -left-8 top-0">
                    <div className="text-8xl text-[#FF9833] font-serif">&#8220;</div>
                  </div>
                  <div className="relative w-30 h-30">
                    <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={testimonials[currentSlide].img}
                        alt={testimonials[currentSlide].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                        <img
                          src={testimonials[currentSlide].pet}
                          alt="Pet"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#FF9853] mb-1">
                    {testimonials[currentSlide].name}
                  </h3>
                  <p className="text-[#FF9873] font-medium mb-4">
                    {testimonials[currentSlide].petType}
                  </p>
                  <p className="mb-4">
                    &#8220; {testimonials[currentSlide].quote} &#8221;
                  </p>
                  <StarRating rating={testimonials[currentSlide].rating} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 sm:bg-white bg-orange-500 hover:bg-orange-700 rounded-full p-2 sm:hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 sm:text-gray-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 sm:bg-white bg-orange-500 hover:bg-orange-700 rounded-full p-2 sm:hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 sm:text-gray-600" />
        </button>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
              }}
              className={`hover:bg-[#FF9853]  w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-[#FF9853]' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSlider;
