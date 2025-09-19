import React, { useState, useRef } from "react";
import { LogIn, UserPlus } from "lucide-react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [loginMode, setLoginMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const authRef = useRef(getAuth());

  const handleAuth = async (e) => {
    e.preventDefault();
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-500">
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
          {loginMode === "login" ? (
            <>
              <LogIn className="inline-block mr-2" />
              Log In
            </>
          ) : (
            <>
              <UserPlus className="inline-block mr-2" />
              Sign Up
            </>
          )}
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
};

export default Auth;
