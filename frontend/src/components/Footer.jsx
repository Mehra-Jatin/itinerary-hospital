import { Phone, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const workingHours = [
    { day: 'Mon - Fri:', hours: '7am - 6pm' },
    { day: 'Saturday:', hours: '9am - 4pm' },
    { day: 'Sunday:', hours: 'Closed' },
  ];

  const galleryImages = [
    'https://media.istockphoto.com/id/517696693/photo/pitbull-kiss.webp?s=612x612&w=is&k=20&c=RXiQI9VCajhZ6di0NERc0_GMlY0fpG3EdlK0YNJf0AM=',
    'https://media.istockphoto.com/id/517696693/photo/pitbull-kiss.webp?s=612x612&w=is&k=20&c=RXiQI9VCajhZ6di0NERc0_GMlY0fpG3EdlK0YNJf0AM=',
    'https://media.istockphoto.com/id/1344021882/photo/portrait-of-happy-multiracial-couple-scratching-their-pet-dog-sitting-on-floor-at-home.webp?s=612x612&w=is&k=20&c=v_qqZasduqvHQ3vdk3rTiLBgUmIBQkuLVe3mXPG1yvY=',
    'https://media.istockphoto.com/id/1344021882/photo/portrait-of-happy-multiracial-couple-scratching-their-pet-dog-sitting-on-floor-at-home.webp?s=612x612&w=is&k=20&c=v_qqZasduqvHQ3vdk3rTiLBgUmIBQkuLVe3mXPG1yvY=',
    'https://media.istockphoto.com/id/1595889544/photo/happy-asian-woman-enjoying-her-dog-pet-in-the-home-friendship-pet-and-human-lifestyle-concept.webp?s=612x612&w=is&k=20&c=XA6k246DMTxIR3wLk7aYBWEJP7kWSP-dNqzdyBL_NtE=',
    'https://media.istockphoto.com/id/942616500/photo/young-woman-with-dog.webp?s=612x612&w=is&k=20&c=JSlW5M2GCo76C-DuULyv8Jt0Ye0F-LIqsHQhFjJbnyw=',
  ];

  const helpLinks = [
    'Pet Services',
    'Careers',
    'Help Center',
    'Treats Program',
    'Charities',
    'Privacy',

  ];
  const helpLinks2 = [
    
    'Company',
    'Our Services',
    'Sitemap',
    'Careers',
    'Contacts',
    'FAQ',

  ];

  return (
    <footer className="bg-gray-800 text-white py-12 md:mt-24">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between"> 
          {/* Logo and Contact Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 ">
              <div className="bg-white rounded-full p-2 w-12 h-12 flex items-center justify-center">
                <img src="https://www.shutterstock.com/shutterstock/photos/1731072460/display_1500/stock-vector-dog-paw-logo-on-a-white-background-1731072460.jpg" alt="Paws Care Logo" className="w-8 h-8"/>
              </div>
              <div>
                <h2 className="font-bold text-xl">Televets</h2>
                <p className="text-sm text-gray-400">Care for the Pets</p>
              </div>
            </div>
            
            {/* Phone Number */}
            <div className="flex items-center space-x-2">
              <div className="text-orange-400">
                <Phone className="h-10 w-10 " />
              </div>
              <div>
                <p className="font-bold text-xl">+1800 123 456 789</p>
                <p className="text-sm text-gray-400">Got Questions? Call us 24/7</p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-bold mb-2">Our Address</h3>
              <p className="text-gray-400">92 Bowery St., New York, NY 10013</p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-400">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-400">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-400">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-400">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Help Section */}
          <div className=''>
            <h3 className="font-bold text-xl mb-4 text-center">Help</h3>
            <div className='flex justify-evenly'>
            <ul className="space-y-2">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-orange-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {helpLinks2.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-orange-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            </div>
          </div>

          {/* Gallery Section */}
          <div>
            <h3 className="font-bold text-xl mb-4">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((src, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-md">
                  <img 
                    src={src} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours Section */}
          <div className="bg-gray-700 p-6 rounded">
            <h3 className="font-bold text-xl mb-4">Working Hours</h3>
            <div className="space-y-2 ">
              {workingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between">
                  <span>{schedule.day}</span>
                  <span className='font-extrabold text-base'>{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400">
                Terms of use
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-gray-400 hover:text-orange-400">
                Privacy Environmental Policy
              </a>
            </div>
            <div className="text-gray-400 mt-4 md:mt-0">
              Copyright © 2024 Televets by{' '}
              <a href="#" className="text-white hover:text-orange-400">
                WebGeniusLab
              </a>
              . All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;