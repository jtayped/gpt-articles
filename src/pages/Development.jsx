// React Util
import React from "react";
import { Link } from "react-router-dom";

// Icons
import { FiCode } from "react-icons/fi";

const Development = () => {
  return (
    <main className="overflow-hidden w-full h-screen flex justify-center items-center gap-10 text-slate-100 pl-[260px]">
      <div className="flex flex-col items-center text-center">
        <FiCode size={150} />
        <h1 className="text-5xl font-bold">This page is under development!</h1>
        <p>
          Go back to{" "}
          <Link className="underline hover:brightness-90" to="/">
            Home Page
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default Development;
