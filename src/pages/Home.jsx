import React from "react";
import { SideBar, MobileHeader } from "../containers";
import withAuthentication from "../js/withAuthRedirect";
import { auth } from "../config/firebase";

const Home = () => {
  return (
    <>
      {auth.currentUser ? (
        <div className="overflow-hidden w-full h-screen relative flex z-0 text-slate-100">
          {" "}
          <div className="hidden md:flex">
            <SideBar />
          </div>
          <div className="flex md:hidden w-screen h-10">
            <MobileHeader />
          </div>
          <main className="relative flex h-full max-w-full flex-1"></main>
        </div>
      ) : null}
    </>
  );
};

export default withAuthentication(Home);
