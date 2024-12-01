import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import api from '@/utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await api.post('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setErrorMessage('Failed to send your message. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full mx-3 p-6 bg-white rounded-lg shadow-lg ">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Column - 2 Grid Units */}
        <motion.div
          className="col-span-1 md:col-span-2 bg-gradient-to-b from-orange-400 to-[#ed8f12] p-8 rounded-lg text-white"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <p className="mb-8">
            Get in touch with Televets for any inquiries about our telemedicine services. 
            We're here to help you access quality healthcare from anywhere.
          </p>

          <div className="space-y-6">
            <div className="flex items-center">
              <Phone className="fill-orange-300 mr-3" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Mail className="fill-orange-300 mr-3" />
              <span><a href="mailto:contact@Televets.com">contact@televets.com</a></span>
            </div>
            <div className="flex items-center">
              <MapPin className="fill-orange-300 mr-3" />
              <span>123 Telemedicine Ave, Health City, HC 12345</span>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <motion.a
              href="#"
              className="text-white hover:text-gray-200"
              whileHover={{ scale: 1.1 }}
            >
              <Facebook size={24} className="fill-[#afff8d]" />
            </motion.a>
            <motion.a
              href="#"
              className="text-white hover:text-gray-200"
              whileHover={{ scale: 1.1 }}
            >
              <Twitter size={24} className="fill-[#afff8d]" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column - 3 Grid Units */}
        <motion.div
          className="col-span-1 md:col-span-3 p-8 bg-gray-50 rounded-lg shadow-md"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 shadow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 shadow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 shadow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Write your message here..."
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-700 via-orange-400 to-green-400 text-white py-3 px-6 rounded-md hover:from-orange-300 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>

          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
