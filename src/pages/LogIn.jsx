// React Util
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { googleSignIn } from "../js/firebaseFunctions";
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth } from "../config/firebase";

// Branding
import Logo from "../assets/vector/default-monochrome-black.svg";

// Images
import Google from "../assets/vector/google.svg";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid details. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-between items-center overflow-hidden">
      <header className="p-10 h-10 flex justify-center items-center">
        <img src={Logo} className="h-10 min-w-[100px]" alt="Logo" />
      </header>
      <main className="max-w-[350px] sm:w-[350px] text-center">
        <header className="p-6">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
        </header>
        <form
          onSubmit={(event) => handleSignIn(event)}
          className="flex flex-col gap-2"
        >
          <input
            type="email"
            placeholder="Email adress"
            className={`px-4 py-3 border ${
              error ? "border-red-500" : "border-gray-500/50"
            } rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150`}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={`px-4 py-3 border ${
              error ? "border-red-500" : "border-gray-500/50"
            } rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150`}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="bg-[#10A37F] hover:bg-[#1A7F64] py-3 mt-3 rounded-[3px] transition-all duration-150 text-white text-lg"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="my-3">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-[#26b38d]">
            Sign Up
          </Link>
        </p>
        <p className="mb-3 text-sm">OR</p>
        <button
          onClick={googleSignIn}
          className="px-4 py-3.5 flex items-center gap-4 text-lg border w-full bg-white border-gray-500/40 rounded-[3px] hover:bg-gray-500/20 transition-all duration-200"
        >
          <img src={Google} className="h-6" alt="google" /> Continue with Google
        </button>
      </main>
      <p className="mb-7 text-sm text-gray-600 text-center px-4">
        Remember! This is not the official Chat GPT website!
      </p>
    </div>
  );
};

export default LogIn;
