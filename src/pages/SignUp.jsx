// React Util
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithPopup,
} from "firebase/auth";
import Logo from "../assets/vector/default-monochrome-black.svg";
import Google from "../assets/vector/google.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err.code === AuthErrorCodes.INVALID_EMAIL) {
        setError("Invalid email address.");
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError("This email is already in use.");
      } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError(
          "The password is too weak. Please choose a stronger password."
        );
      } else {
        setError("An error occurred during sign up. Please try again later.");
      }
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setError(""); // Clear the error message when input changes
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // The sign-in was successful, you can access the user information with `result.user`
      navigate("/");
    } catch (err) {
      setError("There has been an error, try again later!");
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
          <h1 className="text-3xl font-bold">Create your account!</h1>
          <p>
            <b>NOTE:</b> you are <b>not</b> creating an account for Chat GPT
          </p>
        </header>
        <form
          onSubmit={(event) => handleSignUp(event)}
          className="flex flex-col gap-2"
        >
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className={`px-4 py-3 border rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150 ${
              error && error.includes("email")
                ? "border-red-500"
                : "border-gray-500/50"
            }`}
            autoComplete="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`px-4 py-3 border rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150 ${
              error && error.includes("Password")
                ? "border-red-500"
                : "border-gray-500/50"
            }`}
            autoComplete="new-password"
            value={password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`px-4 py-3 border rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150 ${
              error && error.includes("Password")
                ? "border-red-500"
                : "border-gray-500/50"
            }`}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="bg-[#10A37F] hover:bg-[#1A7F64] py-3 mt-3 rounded-[3px] transition-all duration-150 text-white text-lg"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="my-3">
          Already have an account?{" "}
          <Link to="/login" className="text-[#26b38d]">
            Log In
          </Link>
        </p>
        <p className="mb-3 text-sm">OR</p>
        <button
          className="px-4 py-3.5 flex items-center gap-4 text-lg border w-full bg-white border-gray-500/40 rounded-[3px] hover:bg-gray-500/20 transition-all duration-200"
          onClick={handleGoogleSignIn}
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

export default SignIn;
