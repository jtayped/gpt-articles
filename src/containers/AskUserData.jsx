// React Util
import React, { useState, useEffect } from "react";

// Images
import DefaultPFP from "../assets/defaultPFP.webp";

const AskUserData = () => {
  const [draggedFile, setDraggedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {}

  useEffect(() => {
    const interval = setInterval(() => {}, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDrop = (event) => {
    console.log("aaaaa");
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setDraggedFile(file);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        className="flex flex-col gap-3 items-center max-w-[350px] sm:w-[350px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className="h-[205px] w-full shadow-lg rounded-lg border-[#10A37F95] border-2 border-dashed flex flex-col justify-center"
          onDrop={(e) => handleDrop(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDragEnter={(e) => handleDragEnter(e)}
        >
          {dragOver ? null : (
            <>
              <h1 className="text-xl font-bold">Upload Profile Picture</h1>
              <p className="text-sm">
                Click{" "}
                <span className="text-[#10A37F] decoration-[#10A37F] cursor-pointer underline-1">
                  here
                </span>{" "}
                to upload manually.
              </p>
            </>
          )}
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className={`px-4 py-3 border w-full rounded-[3px] placeholder:text-gray-500 placeholder:text-lg text-lg outline-none focus:border-[#10A37F] transition-all duration-150 ${
            error && error.includes("taken")
              ? "border-red-500"
              : "border-gray-500/50"
          }`}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-[#10A37F] hover:bg-[#1A7F64] w-full py-3 rounded-[3px] transition-all duration-150 text-white text-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AskUserData;
