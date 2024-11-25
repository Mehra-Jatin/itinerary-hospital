import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Clock,
  DollarSign,
  ThumbsUp,
  ChevronDown,
  MapPin,
  Calendar,
  Star,
  Stethoscope,
  Award,
  MessageSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useDoctor } from '@/contexts/DoctorContext';
import { useAuth } from '@/hooks/useAuth';
import Loading from '@/components/Loading';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  // Get doctors directly from context
  const { doctors, loading, error } = useDoctor();
  const { user } = useAuth();

  // Find the specific doctor using the ID
  const doctor = doctors.find((doc) => doc._id === id);

  const [activeTab, setActiveTab] = useState('overview');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // If doctor not found
  if (loading) {
    return (
      <Loading />
    );
  }
  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor Not Found</h2>
        <p className="text-gray-600 mb-4">The doctor profile you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/doctors')}>
          View All Doctors
        </Button>
      </div>
    );
  }

  // Handle appointment booking
  const handleBookAppointment = () => {
    try {
      navigate(`/doctor/appointment/${id}`);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "Unable to proceed with booking. Please try again."
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-orange-200 to-orange-600 rounded-t-lg" />
        <div className="absolute -bottom-10 left-8 w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
          <img
            src={doctor.profileImage || "https://cdn-icons-png.flaticon.com/512/6660/6660279.png"}
            alt={`Dr. ${doctor.FirstName} ${doctor.LastName}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Doctor Info Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">
                    Dr. {doctor.FirstName} {doctor.LastName}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Stethoscope className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-500 font-medium">
                      {doctor.specialization}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.hospital}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">Available</div>
                      <div className="text-xs text-gray-600">
                        {doctor.availability || 'Full-time'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">Fee Range</div>
                      <div className="text-xs text-gray-600">{doctor.fee || '250k - 350k'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <ThumbsUp className="w-5 h-5 text-yellow-500" />
                    <div>
                      <div className="text-sm font-medium">Rating</div>
                      <div className="text-xs text-gray-600">{doctor.rating || '94%'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">About Doctor</h2>
                  <div className="relative">
                    <p className={`text-gray-600 leading-relaxed ${!isDescriptionExpanded && 'line-clamp-3'}`}>
                      {doctor.profileDescription || 'Doctor details are not available.'}
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-2"
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    >
                      {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                      <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-semibold">Experience & Qualifications</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-2 bg-blue-500 rounded" />
                      <div>
                        <h3 className="font-medium">{doctor.specialization}</h3>
                        <p className="text-sm text-gray-600">{doctor.hospital}</p>
                        <p className="text-sm text-gray-500">Current Position</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-semibold">Patient Reviews</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{doctor.rating || '94%'}</span>
                      <span className="text-gray-600">(Overall Rating)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Book Appointment</h2>
            </CardHeader>
            {user ? (
              <CardContent>
                {/* <div className="space-y-3">
                  {doctor.services?.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span className="text-gray-600">{service}</span>
                    </div>
                  ))}
                </div> */}
                <Separator className="my-6" />
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBookAppointment}
                >
                  Book An Appointment
                </Button>
              </CardContent>
            ) : (
              <div className='p-4 border-t'>
                <Separator className="my-6" />
                <Button
                className="w-full bg-orange-100 border-2 border-orange-500 hover:bg-orange-50"
                variant="outline"
                size="lg"
                onClick={() => navigate('/auth/register')}
              >
                Please Login to Book Appointment
              </Button></div>
              
            )}

          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Next Available</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="outline" className="justify-center">
                    Today, 2:00 PM
                  </Badge>
                  <Badge variant="outline" className="justify-center">
                    Tomorrow, 10:00 AM
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;