import React, { useState, useEffect } from "react";

const LoadingMessage = ({ message }) => {
  const [dots, setDots] = useState(".");

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

  return (
    <p className="text-2xl sm:text-4xl w-[100px] text-white font-bold">
      {message}
      {dots}
    </p>
  );
};

export default LoadingMessage;
