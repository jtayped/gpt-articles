// React Util
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Elements
import { Home, Auth, LogIn, SignUp } from "./pages";

// Firebase
import { auth } from "./config/firebase";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState("..");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 225);
    return () => clearTimeout(timer);
  }, [dots]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-4xl w-[100px] text-white font-bold">Loading{dots}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/auth/login" element={<LogIn />} />
        <Route exact path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
