// React Util
import React, { useEffect, useState } from "react";

// JSX Components
import { SideBar, MobileHeader, HomeMain } from "../containers";

// JS
import withAuthentication from "../js/withAuthRedirect";
import { createArticle } from "../js/firebaseFunctions";

// Firebase
import { auth, db } from "../config/firebase";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);

  const [trendingArticles, setTrendingArticles] = useState([]);
  const [discoveryArticles, setDiscoveryArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);

  useEffect(() => {
    const getArticlesOrderedBy = async (orderedBy, nArticles, setFunction) => {
      const articlesCollection = collection(db, "articles");
      const q = query(articlesCollection, orderBy(orderedBy), limit(nArticles));
      const querySnapshot = await getDocs(q);

      const articles = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFunction(articles);
    };

    getArticlesOrderedBy("likes", 3, setMostLikedArticles);
    getArticlesOrderedBy("timestamp", 3, setRecentArticles);

    createArticle(auth.currentUser.uid, "Artificial Intelligence");
  }, []);

  return (
    <>
      {auth.currentUser ? (
        <div className="overflow-hidden w-full h-screen relative md:flex z-0 text-slate-100">
          <div className="hidden md:flex">
            <SideBar
              recentArticles={recentArticles}
              mostLikedArticles={mostLikedArticles}
            />
          </div>
          <div className="flex md:hidden w-screen h-10">
            <MobileHeader />
          </div>
          <HomeMain
            trendingArticles={trendingArticles}
            discoveryArticles={discoveryArticles}
            followingArticles={followingArticles}
          />
        </div>
      ) : null}
    </>
  );
};

export default withAuthentication(Home);
