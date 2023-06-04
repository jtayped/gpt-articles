// React Util
import React, { useState } from "react";

// Markdown
import ReactMarkdown from "react-markdown";

const CreateArticle = () => {
  const [value, setValue] = useState("");

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text/plain");
    setValue(pastedText);
  };

  const submitArticle = (event) => {
    event.preventDefault();
  };

  return (
    <main className="overflow-hidden w-full h-screen flex justify-center items-center gap-10 text-slate-100 md:pl-[260px]">
      <div className="flex flex-col gap-6 text-center p-5 w-[750px]">
        <div>
          <h1 className="text-3xl font-bold">Create your article!</h1>
          <p>
            Use{" "}
            <span>
              Ctrl + <span>V</span>
            </span>{" "}
            to paste your article MADE BY AI in{" "}
          </p>
        </div>

        <form
          onSubmit={(event) => submitArticle(event)}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="bg-transparent border-b-2 text-2xl text-white outline-none"
          />
          <div
            className={`h-[400px] w-full shadow-lg rounded-lg border-2 border-dashed flex flex-col justify-center transition-all duration-50`}
          >
            <textarea
              className="bg-transparent text-white h-full outline-none resize-none p-2"
              placeholder="Paste your article here!"
              value={value}
              onPaste={handlePaste}
              onChange={(e) => setValue(e.target.value)}
              readOnly
            />
          </div>

          <button
            type="submit"
            className="bg-[#10A37F] text-white text-lg p-2 px-4 rounded-sm hover:bg-[#1A7F64]"
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateArticle;
