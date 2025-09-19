import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { setLogLevel } from "@firebase/firestore";
import {
  XCircle,
  Phone,
  FileText,
  Calendar,
  Utensils,
  Info,
  Mail,
  LogIn,
  LogOut,
  UserPlus,
  Home,
  User,
} from "lucide-react";

// Setting Firebase debug logging for development
setLogLevel("debug");

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [healthRecords, setHealthRecords] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loginMode, setLoginMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [reportTitle, setReportTitle] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [medicineDosage, setMedicineDosage] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [liveSessionActive, setLiveSessionActive] = useState(false);

  // Firestore & Auth Instances
  const dbRef = useRef(null);
  const authRef = useRef(null);
  const userIdRef = useRef(null);

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // YOU MUST REPLACE THIS WITH YOUR OWN FIREBASE CONFIG
  const firebaseConfig = {
    apiKey: "AIzaSyDYCT_su1t3_N0_45t5BPm4kiWi5PPQSTI",
    authDomain: "sih2025-429fc.firebaseapp.com",
    projectId: "sih2025-429fc",
    storageBucket: "sih2025-429fc.firebasestorage.app",
    messagingSenderId: "249183615376",
    appId: "1:249183615376:web:cb4641c177d77b4bf65b15",
    measurementId: "G-H0RQBND8WW",
  };
  const appId = firebaseConfig.projectId;

  useEffect(() => {
    // Initialize Firebase and Authentication
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    dbRef.current = db;
    authRef.current = auth;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        userIdRef.current = currentUser.uid;
        setCurrentPage("dashboard");
      } else {
        setUser(null);
        userIdRef.current = null;
        setCurrentPage("login");
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Real-time data listeners for health records and medicines
    if (isAuthReady && user && dbRef.current) {
      const recordsRef = collection(
        dbRef.current,
        `artifacts/${appId}/users/${user.uid}/healthRecords`
      );
      const medicinesRef = collection(
        dbRef.current,
        `artifacts/${appId}/users/${user.uid}/medicines`
      );

      const unsubscribeRecords = onSnapshot(
        recordsRef,
        (snapshot) => {
          const records = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setHealthRecords(records);
        },
        (error) => console.error("Error fetching health records:", error)
      );

      const unsubscribeMedicines = onSnapshot(
        medicinesRef,
        (snapshot) => {
          const meds = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMedicines(meds);
        },
        (error) => console.error("Error fetching medicines:", error)
      );

      return () => {
        unsubscribeRecords();
        unsubscribeMedicines();
      };
    }
  }, [isAuthReady, user]);

  const handleAuth = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      if (loginMode === "login") {
        await signInWithEmailAndPassword(authRef.current, email, password);
      } else {
        await createUserWithEmailAndPassword(authRef.current, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(authRef.current);
    } catch (error) {
      console.error("Logout error:", error);
      setMessage({ type: "error", text: "Failed to log out." });
    }
  };

  const handleAddReport = async () => {
    if (!reportTitle || !reportDetails) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }
    setIsSummarizing(true);
    setMessage({ type: "info", text: "Summarizing report with AI..." });

    // Simulate AI summarization
    setTimeout(async () => {
      const summary = `This is an AI-generated summary of your report. Key points include: **${reportTitle}** which details **${reportDetails.substring(
        0,
        50
      )}...**. The report is a vital part of your digital health locker.`;

      try {
        const docRef = await addDoc(
          collection(
            dbRef.current,
            `artifacts/${appId}/users/${user.uid}/healthRecords`
          ),
          {
            title: reportTitle,
            details: reportDetails,
            summary: summary,
            timestamp: new Date().toISOString(),
          }
        );
        setMessage({
          type: "success",
          text: "Medical report added successfully!",
        });
        setReportTitle("");
        setReportDetails("");
      } catch (e) {
        console.error("Error adding document: ", e);
        setMessage({
          type: "error",
          text: "Failed to add report. Please try again.",
        });
      } finally {
        setIsSummarizing(false);
      }
    }, 2000); // Simulate API call delay
  };

  const handleAddMedicine = async () => {
    if (!medicineName || !medicineTime) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      await addDoc(
        collection(
          dbRef.current,
          `artifacts/${appId}/users/${user.uid}/medicines`
        ),
        {
          name: medicineName,
          dosage: medicineDosage,
          time: medicineTime,
        }
      );
      setMessage({
        type: "success",
        text: "Medicine schedule added successfully!",
      });
      setMedicineName("");
      setMedicineDosage("");
      setMedicineTime("");

      // Simulate push notification
      const notificationMessage = `Reminder: It's time to take your ${medicineDosage} of ${medicineName}.`;
      setTimeout(() => {
        setMessage({ type: "info", text: notificationMessage });
      }, 5000);
    } catch (e) {
      console.error("Error adding medicine: ", e);
      setMessage({
        type: "error",
        text: "Failed to add medicine schedule. Please try again.",
      });
    }
  };

  const handleEmergencyCall = () => {
    setMessage({ type: "info", text: "Connecting you with a doctor..." });
    setTimeout(() => {
      setLiveSessionActive(true);
      setMessage({
        type: "success",
        text: "Doctor connected. Starting live session.",
      });
    }, 2000);
  };

  const handleEndSession = () => {
    setLiveSessionActive(false);
    setMessage({ type: "info", text: "Live session ended." });
  };

  const renderAuthPage = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-500">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        {loginMode === "login" ? "Welcome Back!" : "Create an Account"}
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-sm">
        Join us to manage your health records, connect with doctors, and stay on
        top of your well-being.
      </p>
      {message.text && (
        <div
          className={`p-4 mb-4 rounded-xl text-center w-full max-w-md ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleAuth} className="w-full max-w-sm">
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          {loginMode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setLoginMode(loginMode === "login" ? "signup" : "login")}
        className="mt-6 text-sm text-blue-600 hover:underline transition-colors duration-300"
      >
        {loginMode === "login"
          ? "Don't have an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );

  const renderDashboard = () => (
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

  const renderEmergencyPage = () => (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Emergency Support
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        In case of an emergency, click the button below to connect with a
        qualified medical professional immediately. This service is designed to
        provide rapid assistance.
      </p>

      {liveSessionActive ? (
        <div className="w-full max-w-xl p-8 bg-blue-100 dark:bg-blue-900 rounded-2xl shadow-lg flex flex-col items-center justify-center animate-pulse">
          <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center mb-6">
            <User size={96} className="text-white" />
          </div>
          <p className="text-xl text-blue-800 dark:text-blue-200 font-semibold mb-4 text-center">
            Live Session with Doctor
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-center">
            Please describe your symptoms and condition.
          </p>
          <button
            onClick={handleEndSession}
            className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors duration-300 shadow-md"
          >
            End Session
          </button>
        </div>
      ) : (
        <button
          onClick={handleEmergencyCall}
          className="bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          <Phone className="inline-block mr-2" />
          Call a Doctor Now
        </button>
      )}
    </div>
  );

  const renderReportsPage = () => (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        My Digital Health Locker
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        This is your secure, personal health locker. You can add medical
        reports, lab results, or any other health-related documents here. Our
        system will automatically provide a summary for quick reference.
      </p>

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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="Enter the full details of your medical report here."
          ></textarea>
        </div>
        <button
          onClick={handleAddReport}
          disabled={isSummarizing}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:bg-blue-300"
        >
          {isSummarizing ? "Processing..." : "Add Report & Summarize"}
        </button>
      </div>

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

  const renderSchedulePage = () => (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Medicine Schedule
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        Schedule your medications to receive automated reminders. We'll send a
        virtual push notification to help you stay on track.
      </p>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-xl mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Add a New Medicine
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Medicine Name
          </label>
          <input
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="e.g., Paracetamol"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Dosage
          </label>
          <input
            type="text"
            value={medicineDosage}
            onChange={(e) => setMedicineDosage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="e.g., 500mg, 1 tablet"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Time of Day
          </label>
          <input
            type="time"
            value={medicineTime}
            onChange={(e) => setMedicineTime(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-500 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>
        <button
          onClick={handleAddMedicine}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-300 shadow-md"
        >
          Add Medicine Schedule
        </button>
      </div>

      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Upcoming Reminders
        </h2>
        {medicines.length > 0 ? (
          medicines.map((med) => (
            <div
              key={med.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {med.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Dosage: {med.dosage}
                </p>
              </div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {med.time}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No medicines scheduled. Add your first medicine above.
          </p>
        )}
      </div>
    </div>
  );

  const renderRecipesPage = () => (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Nutritional Plans & Recipes
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        Access a variety of healthy and easy-to-make recipes. A good diet is a
        cornerstone of a healthy life, helping to prevent illness and build a
        strong immune system.
      </p>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Lentil Soup",
            description:
              "A hearty and nutritious soup rich in protein and fiber. Ideal for maintaining energy levels.",
            ingredients: [
              "1 cup red lentils",
              "4 cups vegetable broth",
              "1 carrot, chopped",
              "1 onion, chopped",
              "1 clove garlic, minced",
            ],
          },
          {
            title: "Chicken & Vegetable Stir-fry",
            description:
              "A quick, balanced meal packed with vitamins and lean protein.",
            ingredients: [
              "200g chicken breast",
              "1 bell pepper",
              "1 broccoli head",
              "2 tbsp soy sauce",
              "1 tbsp olive oil",
            ],
          },
          {
            title: "Spinach & Chickpea Salad",
            description:
              "A light and refreshing salad that is a great source of iron and fiber.",
            ingredients: [
              "2 cups fresh spinach",
              "1 cup chickpeas",
              "1/2 cup cherry tomatoes",
              "1/4 red onion, sliced",
              "Lemon vinaigrette",
            ],
          },
        ].map((recipe, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {recipe.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {recipe.description}
            </p>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">
              Ingredients:
            </h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAboutPage = () => (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        About Our Mission
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        Our mission is to provide comprehensive, accessible, and fair healthcare
        to underserved populations, starting with the migrant community in
        Kerala. We believe that everyone, regardless of their background or
        migratory status, deserves access to quality healthcare.
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Public Health & SDGs
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Kerala hosts a significant migrant population that often lacks
          comprehensive health record systems. This poses a serious public
          health risk, as infectious diseases can spread rapidly. By digitizing
          health records, we aim to support the achievement of Sustainable
          Development Goals (SDGs), prevent disease transmission, and enhance
          public health surveillance.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Our platform ensures that every individual has a digital health
          locker, making their health data portable and accessible to authorized
          professionals. This not only assists in the elimination of diseases
          but also guarantees fair and impartial healthcare access for all.
        </p>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Get in Touch
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-prose">
        We are here to help. If you have any questions, feedback, or need
        support, please do not hesitate to reach out to us.
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <div className="flex items-center mb-6">
          <Mail size={24} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Email Us
            </h3>
            <a
              href="mailto:support@healthconnect.com"
              className="text-blue-600 hover:underline"
            >
              support@healthconnect.com
            </a>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <Phone size={24} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Call Us
            </h3>
            <p className="text-gray-600 dark:text-gray-400">+91 123 456 7890</p>
          </div>
        </div>
        <div className="flex items-center">
          <Info size={24} className="text-blue-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Address
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              123 Health Blvd, Tech City, Kerala, India 682001
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return renderDashboard();
      case "emergency":
        return renderEmergencyPage();
      case "reports":
        return renderReportsPage();
      case "schedule":
        return renderSchedulePage();
      case "recipes":
        return renderRecipesPage();
      case "about":
        return renderAboutPage();
      case "contact":
        return renderContactPage();
      case "login":
      default:
        return renderAuthPage();
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">HealthConnect</div>
          {isAuthReady && user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="nav-link"
              >
                <Home size={20} />{" "}
                <span className="hidden md:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentPage("reports")}
                className="nav-link"
              >
                <FileText size={20} />{" "}
                <span className="hidden md:inline">Reports</span>
              </button>
              <button
                onClick={() => setCurrentPage("schedule")}
                className="nav-link"
              >
                <Calendar size={20} />{" "}
                <span className="hidden md:inline">Schedule</span>
              </button>
              <button
                onClick={() => setCurrentPage("recipes")}
                className="nav-link"
              >
                <Utensils size={20} />{" "}
                <span className="hidden md:inline">Recipes</span>
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className="nav-link"
              >
                <Info size={20} />{" "}
                <span className="hidden md:inline">About</span>
              </button>
              <button
                onClick={() => setCurrentPage("contact")}
                className="nav-link"
              >
                <Mail size={20} />{" "}
                <span className="hidden md:inline">Contact</span>
              </button>
              <button
                onClick={handleLogout}
                className="nav-link text-red-500 hover:text-red-700"
              >
                <LogOut size={20} />{" "}
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto p-4 sm:p-8">
        {isAuthReady ? (
          renderPage()
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center text-lg text-gray-500">Loading...</div>
          </div>
        )}
      </main>

      {/* Custom Styles */}
      <style>{`
        .card {
          @apply bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl;
        }
        .card h2 {
          @apply text-gray-800 dark:text-white;
        }
        .nav-link {
          @apply flex items-center px-3 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 font-medium;
        }
      `}</style>
    </div>
  );
};

export default App;
