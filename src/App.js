// React Util
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Elements
import { Home, Auth, LogIn, SignUp, About } from "./pages";

// Firebase
import { auth } from "./config/firebase";
import { LoadingMessage } from "./components";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingMessage message="Loading" centered={true} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/auth/login" element={<LogIn />} />
        <Route exact path="/auth/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
