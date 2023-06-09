// React Util
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

// Icons
import { FiClipboard, FiCheck } from "react-icons/fi";

// Firebase
import { createArticle } from "../js/firebaseFunctions";
import { auth } from "../config/firebase";

const CreateArticle = ({ setArticleRoutes }) => {
  const navigate = useNavigate();
  const prompt =
    'Please provide the markdown code for an article given the following title: "Your Title"';

  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);
  const textareaRef = useRef(null);

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text/plain");
    setValue(pastedText);
  };

  const submitArticle = (event) => {
    event.preventDefault();

    if (title && value) {
      createArticle(auth.currentUser.uid, title, value, []).then((article) => {
        navigate("/gpt-articles");
      });
    } else {
      if (!title && !value) {
        setError("Everything is missing... :/");
      } else if (!title) {
        setError("Missing Title...");
      } else if (!value) {
        setError("Missing Article...");
      }
    }
  };

  const handleCopy = () => {
    // Create a textarea element dynamically
    const textarea = document.createElement("textarea");
    textarea.value = prompt;

    // Append the textarea to the document body
    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    document.execCommand("copy");

    // Remove the textarea from the document body
    document.body.removeChild(textarea);
    setPromptCopied(true);
  };

  const handleReset = () => {
    setValue(""); // Reset the value state to an empty string
    if (textareaRef.current) {
      textareaRef.current.value = ""; // Clear the textarea's content using the ref
    }
  };

  return (
    <main className="overflow-hidden w-full h-screen flex justify-center items-center gap-10 text-slate-100 md:pl-[260px]">
      <div className="flex flex-col gap-6 p-5 w-[650px]">
        <article className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Article Creator</h1>
          <p className="text-sm">
            The articles in{" "}
            <Link to="/gpt-articles" className="underline">
              GPT Articles
            </Link>{" "}
            are all generated by AI, and so should yours! So go to{" "}
            <a className="underline" href="https://chat.openai.com/">
              https://chat.openai.com/
            </a>{" "}
            and use this prompt:
            <span
              className="text-xs p-[2px] bg-gpt-500 rounded cursor-pointer"
              onClick={() => handleCopy()}
            >
              {prompt}
            </span>
            . Use your own title to get some Markdown "code". Click the prompt
            to copy it, or press this button:
          </p>
          <button
            className="flex items-center justify-center gap-2 bg-slate-100 text-black hover:bg-slate-200 px-2 py-1 rounded mt-3 w-min"
            onClick={handleCopy}
          >
            {promptCopied ? <FiCheck size={20} /> : <FiClipboard size={20} />}
            {promptCopied ? "Copied" : "Prompt"}
          </button>
        </article>
        <form
          onSubmit={(event) => submitArticle(event)}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className={`bg-transparent border-b-2 ${
              error.includes("Title") || error.includes("Everything")
                ? "border-red-600"
                : null
            } text-3xl text-white outline-none mb-2 p-1`}
          />
          <div
            className={`relative w-full rounded shadow-lg border-2 border-dashed ${
              error.includes("Article") || error.includes("Everything")
                ? "border-red-600"
                : null
            }  flex flex-col justify-center`}
          >
            <textarea
              className="bg-transparent text-white h-[300px] outline-none resize-none p-2 no-scrollbar"
              value={value}
              onPaste={handlePaste}
              onChange={(e) => setValue(e.target.value)}
              readOnly
            />
            {value ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-red-600/10 w-full h-full">
                <button
                  className="bg-red-500 px-4 py-1 text-xl font-bold rounded"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <h2 className="text-2xl font-bold">Paste your article here!</h2>
                <p className="text-sm">
                  Make sure you include all the markdown syntax!
                </p>
                <a
                  href="https://chat.openai.com/"
                  className="underline text-gray-300 text-xs mt-1"
                >
                  https://chat.openai.com/
                </a>
              </div>
            )}
          </div>
          {error ? (
            <p className="text-center text-red-600 text-lg font-bold">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="bg-[#10A37F] text-white text-lg p-2 px-4 rounded-sm hover:bg-[#1A7F64]"
          >
            Submit
          </button>
          <p className="text-center text-xs text-gray-300">
            Make sure your article is made by an AI! Any human written article
            will be <b>removed.</b>
          </p>
        </form>
      </div>
    </main>
  );
};

export default CreateArticle;
