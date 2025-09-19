import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import {
  Home,
  FileText,
  Calendar,
  Utensils,
  Info,
  Mail,
  LogOut,
} from "lucide-react";

import "./App.css";
import Auth from "./Auth";
import Dashboard from "./components/Dashboard";
import EmergencyPage from "./components/EmergencyPage";
import ReportsPage from "./components/ReportsPage";
import MedicineSchedule from "./components/MedicineSchedule";
import RecipesPage from "./components/RecipesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const authRef = useRef(null);
  const dbRef = useRef(null);

  const firebaseConfig = {
    apiKey: "AIzaSyDYCT_su1t3_N0_45t5BPm4kiWi5PPQSTI",
    authDomain: "sih2025-429fc.firebaseapp.com",
    projectId: "sih2025-429fc",
    storageBucket: "sih2025-429fc.firebasestorage.app",
    messagingSenderId: "249183615376",
    appId: "1:249183615376:web:cb4641c177d77b4bf65b15",
    measurementId: "G-H0RQBND8WW",
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    authRef.current = auth;
    dbRef.current = db;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(authRef.current);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <div className="font-sans min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Navbar */}
        {user && (
          <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="w-full px-4 py-4 flex flex-wrap items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                Pravasi Arogya
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="nav-link">
                  <Home size={20} />{" "}
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
                <Link to="/reports" className="nav-link">
                  <FileText size={20} />{" "}
                  <span className="hidden md:inline">Reports</span>
                </Link>
                <Link to="/schedule" className="nav-link">
                  <Calendar size={20} />{" "}
                  <span className="hidden md:inline">Schedule</span>
                </Link>
                <Link to="/recipes" className="nav-link">
                  <Utensils size={20} />{" "}
                  <span className="hidden md:inline">Recipes</span>
                </Link>
                <Link to="/about" className="nav-link">
                  <Info size={20} />{" "}
                  <span className="hidden md:inline">About</span>
                </Link>
                <Link to="/contact" className="nav-link">
                  <Mail size={20} />{" "}
                  <span className="hidden md:inline">Contact</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="nav-link text-red-500 hover:text-red-700"
                >
                  <LogOut size={20} />{" "}
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Routes */}
        <main className="w-full h-full min-h-screen p-4 sm:p-8">
          <Routes>
            {!user ? (
              <Route path="*" element={<Auth />} />
            ) : (
              <>
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/schedule" element={<MedicineSchedule />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
