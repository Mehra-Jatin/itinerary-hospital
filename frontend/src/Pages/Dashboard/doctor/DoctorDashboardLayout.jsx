
import { Card } from '@/components/ui/card';
import { Users, DollarSign, Calendar, Heart } from 'lucide-react';
import TodayAppoitments from './Components/TodayAppoitments';


function DoctorDashboardLayout() {


  return (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex justify-center items-center h-28">
            <Users className="text-violet-600 bg-gray-300 p-2 w-8 h-8 rounded-md" />
            <div className="text-center ml-4">
              <p>Patients</p>
              <p>666</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-center items-center h-28">
            <DollarSign className="text-blue-500 bg-sky-100 p-2 w-8 h-8 rounded-md" />
            <div className="text-center ml-4">
              <p>Income</p>
              <p>$1,200</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-center items-center h-28">
            <Calendar className="text-green-300 bg-green-100 p-2 w-8 h-8 rounded-md" />
            <div className="text-center ml-4">
              <p>Appointments</p>
              <p>211</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex justify-center items-center h-28">
            <Heart className="text-red-500 bg-red-100 p-2 w-8 h-8 rounded-md" />
            <div className="text-center ml-4">
              <p>Treatments</p>
              <p>400</p>
            </div>
          </div>
        </Card>
      </div>

    <TodayAppoitments />

    </>
  );
}

export default DoctorDashboardLayout;
