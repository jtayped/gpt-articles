// React Util
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase Functions
import {
  checkUsernameExists,
  createUser,
  uploadFile,
} from "../js/firebaseFunctions";

// Icons
import { FiFilePlus } from "react-icons/fi";
import { LoadingMessage } from "../components";

const AskUserData = ({ email, password }) => {
  const navigate = useNavigate();

  const [draggedFile, setDraggedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [creatingUser, setCreatingUser] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (draggedFile && username) {
      setCreatingUser(true);
      checkUsernameExists(username).then((exists) => {
        if (exists) {
          setError("Username taken!");
        } else {
          uploadFile(
            draggedFile,
            "lMiFGinMHeV4VC0fQrnD6yAGGeJ2",
            "profilePictures"
          ).then(() => {
            console.log("Profile picture uploaded succesfully!");

            createUser(username);
            navigate("/");
            setCreatingUser(false);
          });
        }
      });
    } else {
      setError("Missing fields!");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setDraggedFile(file);
    console.log(file);
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
    <div className="flex flex-col items-center p-3">
      <form
        className="flex flex-col gap-3 items-center w-full sm:w-[350px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className={`h-[205px] w-full shadow-lg rounded-lg border-[#10A37F95] border-2 border-dashed flex flex-col justify-center transition-all duration-50 ${
            dragOver ? "bg-[#10A37F30] text-[#10A37F] items-center" : ""
          }`}
          onDrop={(e) => handleDrop(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragOver={(e) => handleDragOver(e)}
        >
          {draggedFile ? (
            <div>
              <h1 className="font-bold text-xl">File Loaded!</h1>
              <p className="text-xs">{draggedFile.name}</p>
            </div>
          ) : dragOver ? (
            <FiFilePlus size={50} />
          ) : (
            <div className="text-center p-3">
              <h1 className="text-xl font-bold">
                Drag to Upload Profile Picture
              </h1>
              <p className="text-sm">Or upload one manually:</p>{" "}
              <input
                type="file"
                className="text-xs w-[120px] sm:w-fit"
                onChange={(e) => setDraggedFile(e.target.files[0])}
              />
            </div>
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
        <p className="text-red-500 mt-[-10px]">{error}</p>
        <button
          className="bg-[#10A37F] hover:bg-[#1A7F64] w-full py-3 rounded-[3px] transition-all duration-150 text-white text-lg flex justify-center"
          type="submit"
        >
          {creatingUser ? <LoadingMessage message={"Creating"} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AskUserData;
