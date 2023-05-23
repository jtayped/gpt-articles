import React, { useState } from "react";

const AskUserData = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  
  function handleSubmit() {}

    const prevStateRef = useRef(state);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state !== prevStateRef.current) {
        
      }
      prevStateRef.current = state; 
    }, 500);

    return () => {
      clearInterval(interval); 
    };
  }, []);

}

  return (
    <div className="flex flex-col gap-2">
      <form action={(e) => handleSubmit(e)}>
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
