import React from "react";
import { Calendar } from "lucide-react";

const MedicineSchedule = ({
  medicines = [], // ✅ Default to empty array
  medicineName,
  setMedicineName,
  medicineDosage,
  setMedicineDosage,
  medicineTime,
  setMedicineTime,
  handleAddMedicine,
}) => {
  return (
    <div className="flex flex-col p-8 min-h-screen w-full">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Medicine Schedule
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-3xl mx-auto">
        Schedule your medications to receive automated reminders. We'll send a
        virtual push notification to help you stay on track.
      </p>

      {/* Medicine Form */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Add a New Medicine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Medicine Name
            </label>
            <input
              type="text"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="e.g., Paracetamol"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Dosage
            </label>
            <input
              type="text"
              value={medicineDosage}
              onChange={(e) => setMedicineDosage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              placeholder="e.g., 500mg, 1 tablet"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Time of Day
            </label>
            <input
              type="time"
              value={medicineTime}
              onChange={(e) => setMedicineTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>
        </div>
        <button
          onClick={handleAddMedicine}
          className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-xl 
            hover:bg-green-700 transition-colors duration-300 shadow-md"
        >
          Add Medicine Schedule
        </button>
      </div>

      {/* Upcoming Reminders */}
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Upcoming Reminders
        </h2>
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.map((med) => (
              <div
                key={med.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {med.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dosage: {med.dosage}
                  </p>
                </div>
                <div className="text-lg font-bold text-gray-800 dark:text-white mt-2">
                  {med.time}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No medicines scheduled. Add your first medicine above.
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicineSchedule;
