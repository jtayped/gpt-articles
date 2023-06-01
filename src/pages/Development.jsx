// React Util
import React from "react";
import { Link } from "react-router-dom";

// Icons
import { FiCode } from "react-icons/fi";

const Development = () => {
  return (
    <main className="overflow-hidden w-full h-screen flex justify-center items-center gap-10 text-slate-100 md:pl-[260px]">
      <div className="flex flex-col items-center text-center p-5">
        <FiCode size={150} />
        <h1 className="text-2xl md:text-3xl font-bold">This page is under development!</h1>
        <p className="text-xs md:text-lg">
          Go back to{" "}
          <Link className="underline hover:brightness-90" to="/gpt-articles/">
            Home Page
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default Development;
