// React Util
import React from "react";
import { Link } from "react-router-dom";

// Branding
import Logo from "../assets/vector/default-monochrome.svg";

const Auth = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gpt-400">
      <main className="w-96 flex flex-col flex-auto justify-center items-center">
        <img src={Logo} alt="Logo" />
        <p className="text-center mt-3 text-white">Welcome to GPT Articles</p>
        <p className="text-center mt-3 text-white">
          Log in with your GPT Articles account to continue
        </p>
        <div className="flex flex-row gap-3 mt-3">
          <Link
            to="/gpt-articles/login"
            className="bg-[#10A37F] text-white text-sm p-2 px-4 rounded-sm hover:bg-[#1A7F64]"
          >
            <div className="flex w-full items-center justify-center gap-2">
              Log in
            </div>
          </Link>
          <Link
            to="/gpt-articles/signup"
            className="bg-[#10A37F] text-white text-sm p-2 px-4 rounded-sm hover:bg-[#1A7F64]"
          >
            <div className="flex w-full items-center justify-center gap-2">
              Sign up
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Auth;
