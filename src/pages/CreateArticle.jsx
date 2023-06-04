// React Util
import React, { useState } from "react";

// Icons
import { FiClipboard, FiCheck } from "react-icons/fi";

const CreateArticle = () => {
  const prompt =
    'Please provide the markdown code for an article given the following title: "Your Title"';
  const [value, setValue] = useState("");
  const [promptCopied, setPromptCopied] = useState(false);

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text/plain");
    setValue(pastedText);
  };

  const submitArticle = (event) => {
    event.preventDefault();
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

  return (
    <main className="overflow-hidden w-full h-screen flex justify-center items-center gap-10 text-slate-100 md:pl-[260px]">
      <div className="flex flex-col gap-6 text-center p-5 w-[750px]">
        <form
          onSubmit={(event) => submitArticle(event)}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="bg-transparent border-b-2 text-3xl text-white outline-none"
          />
          <div className="relative h-[400px] w-full rounded shadow-lg border-2 border-dashed flex flex-col justify-center">
            <textarea
              className="bg-transparent text-white h-full outline-none resize-none p-2 no-scrollbar"
              value={value}
              onPaste={handlePaste}
              onChange={(e) => setValue(e.target.value)}
              readOnly
            />
            {value ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-red-600/10 w-full h-full">
                <button className="bg-red-500 px-4 py-1 text-xl font-bold rounded">Reset</button>
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <h2 className="text-2xl font-bold">Paste your article here!</h2>
                <p className="text-sm">
                  Make sure you include all the markdown syntax!
                </p>
                <button
                  className="flex items-center justify-center gap-2 bg-[#1A7F64] px-2 py-1 rounded mt-3"
                  onClick={handleCopy}
                >
                  {promptCopied ? (
                    <FiCheck size={20} />
                  ) : (
                    <FiClipboard size={20} />
                  )}
                  {promptCopied ? "Copied" : "Copy Prompt"}
                </button>
                <a
                  href="https://chat.openai.com/"
                  className="underline text-gray-300 text-xs mt-1"
                >
                  https://chat.openai.com/
                </a>
              </div>
            )}
          </div>

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
