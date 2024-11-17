
import { Clock, DollarSign, ThumbsUp } from 'lucide-react';
import DoctorPracticeExperience from '../components/DoctorPracticeExperience';
import DoctorReviews from '../components/DoctorReviews';
import { FiChevronDown } from 'react-icons/fi';

const DoctorProfile = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow overflow-hidden  mb-5">
      {/* Header Image */}
      <div className="relative h-48 bg-gray-200">
        <img 
          src="https://img.freepik.com/premium-photo/photograph-depicting-doctor_931878-158329.jpg?w=1380"
          className="w-full h-full object-cover"
          alt="Doctor Header"
        />
        
        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8">
          <div className="w-40 h-40 rounded-full bg-mint-100 border-4 border-white overflow-hidden">
            <img 
              src="https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?t=st=1731730807~exp=1731734407~hmac=fcd411ee3c4fc9de3594bec32eb1e593cd51a4c5a8c93bb1d09e15b3f5de59e8&w=740" 
              alt="Doctor profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Info */}
        <div className='col-span-2'>
            <div className='flex flex-wrap'>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Rayna Westervelt M.Psi</h1>
            <div className="flex items-center gap-2 text-blue-600 mt-1">
              <span className="text-sm">ENT Doctor</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">Siloam Hospitals, West Bekasi, Bekasi</p>
          </div>

          <div className="flex gap-6 mt-4 ">
            <div className="flex items-center gap-2 mt-10">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Full-time</span>
            </div>
            <div className="flex items-center gap-2 mt-10">
              <DollarSign className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">250k - 350k</span>
            </div>
            <div className="flex items-center gap-2 mt-10">
              <ThumbsUp className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">94%</span>
            </div>
          </div>
          </div>
          {/* Doctor Profile */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Doctor Profile</h2>
            <p className="text-gray-600">
              With a seasoned career spanning four years, our ENT specialist brings a wealth of experience and
              expertise to the field. Having dedicated their professional journey to ear, nose, and throat health, they
              have honed their skills in diagnosing and treating a wide range of ENT conditions. Their commitment to
              staying abreast of the latest advancements in the field ensures that patients receive cutting-edge care...
            </p>
            <button className="text-green-600 mt-2 text-sm hover:underline flex">
             <div> See More</div> <FiChevronDown className="mt-1 ml-1 text-xl" />
            </button>
          </div>
        </div>

        {/* Medical Actions */}
        <div className='col-span-1 border  px-4 pl-5 py-3 rounded-lg shadow-sm text-sm'>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Actions</h2>
          <ul className="space-y-2 mb-6">
            {[
              'BERA (Brainstem Evoked Response Audiometry)',
              'ENT Surgery',
              'ENT Corpus Alienum Extraction',
              'Ear Endoscopy',
              'Ear Irrigation',
              'Tiltoplasty',
              'Hearing Test'
            ].map((action, index) => (
              <li key={index} className="text-gray-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                {action}
              </li>
            ))}
          </ul>
          {/* Appointment Button */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
            Make Appointments
          </button>
        </div>
      </div>
      <DoctorPracticeExperience />
      <DoctorReviews />
    </div>
  );
};

export default DoctorProfile;
