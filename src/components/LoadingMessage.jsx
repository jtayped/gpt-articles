import React, { useState, useEffect } from "react";

const LoadingMessage = ({ message, centered }) => {
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
    <p
      className={`text-xs w-[100px] text-white font-bold ${
        centered ? "place-self-center text-center" : null
      }`}
    >
      {message}
      {dots}
    </p>
  );
};

export default LoadingMessage;
