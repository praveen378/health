import React from "react";
import { Phone, FileText, Calendar, Utensils } from "lucide-react";

const Dashboard = ({ user, setCurrentPage }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Your Health Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        Welcome! This is your central hub for managing all your health
        information. From here, you can access your medical reports, schedule
        medicine reminders, and find nutritional guidance. Your user ID for
        collaboration is: **{user.uid}**
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <div onClick={() => setCurrentPage("emergency")} className="card">
          <Phone size={36} className="text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Emergency Call</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Instantly connect with a doctor for urgent health concerns.
          </p>
        </div>
        <div onClick={() => setCurrentPage("reports")} className="card">
          <FileText size={36} className="text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">My Health Locker</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Add, view, and manage your medical reports and records.
          </p>
        </div>
        <div onClick={() => setCurrentPage("schedule")} className="card">
          <Calendar size={36} className="text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Medicine Schedule</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Set up reminders for your medications and never miss a dose.
          </p>
        </div>
        <div onClick={() => setCurrentPage("recipes")} className="card">
          <Utensils size={36} className="text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nutritional Plan</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Access healthy recipes and tailor a nutritional plan for yourself.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
