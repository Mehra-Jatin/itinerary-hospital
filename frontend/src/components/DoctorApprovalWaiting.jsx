import React from 'react';
import { FaUserMd, FaClock } from 'react-icons/fa';

export default function DoctorApprovalWaiting() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-24 w-24 rounded-full bg-orange-100 flex items-center justify-center">
            <FaUserMd className="h-12 w-12 text-orange-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Thank You for Registering!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your application is pending admin approval.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-center space-x-4 text-orange-600">
            <FaClock className="h-8 w-8" />
            <span className="text-xl font-semibold">Approval Pending</span>
          </div>
          <p className="mt-4 text-center text-gray-600">
            We're reviewing your application. This process may take up to 48 hours. We'll notify you via email once your account is approved.
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}