import React from "react";
import { SideBar } from "../containers";
import withAuthRedirect from "../js/withAuthRedirect";

const Home = () => {
  return (
    <div className="overflow-hidden w-full h-screen relative flex z-0 text-slate-100">
      <SideBar />
      <main className="relative flex h-full max-w-full flex-1"></main>
    </div>
  );
};

export default withAuthRedirect(Home);
