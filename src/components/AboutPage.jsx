import React from 'react';
import { Info } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">About Our Mission</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        Our mission is to provide comprehensive, accessible, and fair healthcare to underserved populations, starting with the migrant community in Kerala. We believe that everyone, regardless of their background or migratory status, deserves access to quality healthcare.
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Public Health & SDGs</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Kerala hosts a significant migrant population that often lacks comprehensive health record systems. This poses a serious public health risk, as infectious diseases can spread rapidly. By digitizing health records, we aim to support the achievement of Sustainable Development Goals (SDGs), prevent disease transmission, and enhance public health surveillance.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Our platform ensures that every individual has a digital health locker, making their health data portable and accessible to authorized professionals. This not only assists in the elimination of diseases but also guarantees fair and impartial healthcare access for all.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;