import React from "react";
import { SideBar, MobileHeader, HomeMain } from "../containers";

const Home = ({
  trendingArticles,
  discoveryArticles,
  followingArticles,
  isLoading,
}) => {
  return (
    <div className="overflow-hidden w-full h-screen relative md:flex z-0 text-slate-100 pl-[260px]">
      <HomeMain
        trendingArticles={trendingArticles}
        discoveryArticles={discoveryArticles}
        followingArticles={followingArticles}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
