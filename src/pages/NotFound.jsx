// React Util
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="overflow-hidden w-full h-screen flex justify-center items-center gap-10 text-slate-100 pl-[260px]">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-5xl">
          <span className="font-bold text-8xl">404</span> <br />
          Page Not Found
        </h1>
        <p>
          Check the address and try again! Or go to{" "}
          <Link className="underline hover:brightness-90" to="/gpt-articles/">
            Home Page
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default NotFound;
