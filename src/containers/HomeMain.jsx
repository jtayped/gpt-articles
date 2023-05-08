// React Util
import React from "react";

// JSX Components
import { Search } from "../components";

const HomeMainSection = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl">{title}</h2>
    </div>
  );
};

const HomeMain = () => {
  return (
    <main className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
      <div className="h-full w-full flex justify-center items-center">
        <div className="grid grid-cols-3">
          <HomeMainSection title="This" />
          <HomeMainSection title="That" />
          <HomeMainSection title="The Other" />
        </div>
      </div>
      <Search />
    </main>
  );
};

export default HomeMain;
