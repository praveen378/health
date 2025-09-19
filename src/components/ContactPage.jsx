import React from 'react';
import { Phone, Mail, Info } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">Get in Touch</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        We are here to help. If you have any questions, feedback, or need support, please do not hesitate to reach out to us.
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <div className="flex items-center mb-6">
          <Mail size={24} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Email Us</h3>
            <a href="mailto:support@healthconnect.com" className="text-blue-600 hover:underline">support@healthconnect.com</a>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <Phone size={24} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Call Us</h3>
            <p className="text-gray-600 dark:text-gray-400">+91 123 456 7890</p>
          </div>
        </div>
        <div className="flex items-center">
          <Info size={24} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Address</h3>
            <p className="text-gray-600 dark:text-gray-400">123 Health Blvd, Tech City, Kerala, India 682001</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;