import React from 'react';
import { Phone, User } from 'lucide-react';

const EmergencyPage = ({ liveSessionActive, handleEmergencyCall, handleEndSession }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">Emergency Support</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        In case of an emergency, click the button below to connect with a qualified medical professional immediately. This service is designed to provide rapid assistance.
      </p>
      {liveSessionActive ? (
        <div className="w-full max-w-xl p-8 bg-blue-100 dark:bg-blue-900 rounded-2xl shadow-lg flex flex-col items-center justify-center animate-pulse">
          <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center mb-6">
            <User size={96} className="text-white" />
          </div>
          <p className="text-xl text-blue-800 dark:text-blue-200 font-semibold mb-4 text-center">Live Session with Doctor</p>
          <p className="text-blue-700 dark:text-blue-300 text-center">Please describe your symptoms and condition.</p>
          <button onClick={handleEndSession} className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-300 shadow-md">
            End Session
          </button>
        </div>
      ) : (
        <button onClick={handleEmergencyCall} className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
          <Phone className="inline-block mr-2" />
          Call a Doctor Now
        </button>
      )}
    </div>
  );
};

export default EmergencyPage;