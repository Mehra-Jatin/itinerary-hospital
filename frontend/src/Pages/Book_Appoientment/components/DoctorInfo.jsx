import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, User, Stethoscope } from 'lucide-react';

const DoctorInfo = ({ doctor }) => {
    
  return (
    <Card className="md:col-span-1
    ">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            {doctor.image ? (
              <img src={doctor.image} alt="Doctor" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl capitalize">Dr. {doctor.FirstName} {doctor.LastName}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Stethoscope className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{doctor.specialization}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="about">
          <div className='py-3 text-lg font-semibold'>Consultation Fees : <span className='hover:underline '>{doctor.fees}/-</span></div>
          <TabsList className="grid w-full grid-cols-2 bg-orange-50">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">
                Experience: {doctor.experience} years
              </Badge>
              <Badge variant="secondary" className="flex items-center text-sm">
                <Star className="w-4 h-4 mr-1" />
                <span>{doctor.rating} / 5</span>
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{doctor.about}</p>
            <div>
              <h4 className="font-semibold mb-2">Education</h4>
              <ul className="text-sm space-y-2">
                {doctor.education ? (
                  doctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-orange-400 mt-2" />
                      {edu}
                    </li>
                  ))
                ) : (
                  <li>N/A</li>
                )}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{doctor.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{doctor.PhoneNo}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{doctor.email}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DoctorInfo;

