// React Util
import React, { useState } from "react";

// Icons
import { FiSend } from "react-icons/fi";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  function submitEmail(email) {}
  return (
    <form
      className="bg-gpt-500 p-4 rounded-lg shadow-xl flex flex-col gap-1"
      onSubmit={() => submitEmail(email)}
    >
      <p className="text-lg font-bold">Subscribe to our Newsletter!</p>
      <div className="flex justify-between items-center bg-gpt-300 rounded-lg">
        <input
          className="m-2 focus:outline-none bg-transparent"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e)}
        />
        <button className="h-10 rounded-r-lg px-3 font-bold">
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default NewsLetter;
