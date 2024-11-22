import React from 'react';
import { Phone, FileText, MessageSquare } from 'lucide-react';

const NextPatient = () => {
  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-sm ">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1606166228927-3feafb447265?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Beth Mccoy</h2>
          <p className="text-gray-500 text-sm">
            2235 Avondale Ave Pasadena,<br />
            Oklahoma 93900
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">D.O.B</p>
          <p className="font-medium">29 February 1999</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Sex</p>
          <p className="font-medium">Female</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Weight</p>
          <p className="font-medium">56 kg</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Height</p>
          <p className="font-medium">172 cm</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Last Appointment</p>
          <p className="font-medium">02 Jan 2020</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Register Date</p>
          <p className="font-medium">19 Des 2018</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
          Asthma
        </span>
        <span className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-full">
          Hypertension
        </span>
        <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
          Asam Urat
        </span>
      </div>

      <div className="flex gap-2 flex-wrap">
  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm leading-none">
    <Phone size={18} />
    (308) 555-0121
  </button>
  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm leading-none">
    <FileText size={18} />
    Documents
  </button>
  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm leading-none">
    <MessageSquare size={18} />
    Chat
  </button>
</div>

    </div>
  );
};

export default NextPatient;