export default function AppointmentCard({ user, appointment }) {
    return (
        <div className="shadow-lg rounded-lg p-4 bg-white">
        <div className="flex justify-between mb-4 bg-blue-100 py-3 px-4 rounded-md">
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover w-16 h-16 rounded-full"
              alt="user profile"
            />
            <div>
              <p className="font-semibold">{user.FirstName} {user.LastName}</p>
              <p className="text-sm text-gray-500">{appointment.status}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="font-medium">{appointment.time}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-lg font-semibold text-gray-900">{appointment.title}</div>
          <div className="text-sm text-gray-700">{appointment.description}</div>
          <div className="text-xs text-gray-500">Doctor: {appointment.doctor}</div>
          <div className="text-xs text-gray-500">
            Appointment Date: {new Date(appointment.date).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    );
  }