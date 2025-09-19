import React from "react";
import { FileText } from "lucide-react";

const ReportsPage = ({
  healthRecords = [], // ✅ Default to empty array
  reportTitle,
  setReportTitle,
  reportDetails,
  setReportDetails,
  handleAddReport,
  isSummarizing,
}) => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        My Digital Health Locker
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        This is your secure, personal health locker. You can add medical
        reports, lab results, or any other health-related documents here. Our
        system will automatically provide a summary for quick reference.
      </p>

      {/* Add Report Form */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Add a New Report
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Report Title
          </label>
          <input
            type="text"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="e.g., Blood Test Results, Doctor's Visit"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Detailed Report Notes
          </label>
          <textarea
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="Enter the full details of your medical report here."
          ></textarea>
        </div>
        <button
          onClick={handleAddReport}
          disabled={isSummarizing}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl 
            hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:bg-blue-300"
        >
          {isSummarizing ? "Processing..." : "Add Report & Summarize"}
        </button>
      </div>

      {/* Health Records */}
      <div className="w-full max-w-2xl">
        {healthRecords.length > 0 ? (
          healthRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {record.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Added on: {new Date(record.timestamp).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                AI Summary:
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {record.summary}
              </p>
              <div className="mt-4">
                <details>
                  <summary className="cursor-pointer text-blue-600 hover:underline font-semibold">
                    View Full Details
                  </summary>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {record.details}
                  </p>
                </details>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No medical reports found. Add your first report above.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
