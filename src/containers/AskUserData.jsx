// React Util
import React, { useState, useEffect } from "react";

// Images
import DefaultPFP from "../assets/defaultPFP.webp";

const AskUserData = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {}

  useEffect(() => {
    const interval = setInterval(() => {}, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex flex-col gap-5 items-center mt-[-50px]"
        action={(e) => handleSubmit(e)}
      >
        <div className="w-[400px] h-[205px] shadow-lg rounded-lg border-[#10A37F95] border-2 border-dashed flex flex-col justify-center">
          <h1 className="text-xl font-bold">Upload Profile Picture</h1>
          <p className="text-sm">
            Click{" "}
            <span className="text-[#10A37F] decoration-[#10A37F] cursor-pointer underline-1">
              here
            </span>{" "}
            to upload manually.
          </p>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={`px-4 py-3 border rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150 ${
            error && error.includes("taken")
              ? "border-red-500"
              : "border-gray-500/50"
          }`}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
    </div>
  );
};

export default AskUserData;
