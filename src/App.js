// React Util
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Components
import {
  Home,
  Auth,
  LogIn,
  SignUp,
  About,
  Article,
  Development,
  NotFound,
} from "./pages";
import { SideBar, MobileHeader } from "./containers";
import { LoadingMessage } from "./components";

// Firebase
import { auth } from "./config/firebase";
import {
  getArticlesOrderedBy,
  getRandomArticles,
  getTrendingArticles,
  getUserData,
  getFollowingArticles,
  createArticle,
  createArticleLink,
} from "./js/firebaseFunctions";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [discoveryArticles, setDiscoveryArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);
  const [userData, setUserData] = useState([]);

  const [articleRoutes, setArticleRoutes] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setLoggedIn(user);

      if (user.uid) {
        getUserData(user.uid).then((userData) => {
          setUserData(userData);
          getArticlesOrderedBy("likeCount", 3, false).then((articles) => {
            setMostLikedArticles(articles);
          });
          getArticlesOrderedBy("timestamp", 3, false).then((articles) => {
            setRecentArticles(articles);
          });
          getTrendingArticles(3).then((articles) => {
            setTrendingArticles(articles);
          });
          getRandomArticles(3).then((articles) => {
            setDiscoveryArticles(articles);
          });
          getFollowingArticles(3, userData.following).then((articles) => {
            setFollowingArticles(articles);
          });
        });

        const generateArticleRoutes = async (articles) => {
          const routes = await Promise.all(
            articles.map(async (article) => {
              const link = await createArticleLink(article);
              return link;
            })
          );
          return routes;
        };

        const updateArticleRoutes = async () => {
          const recentRoutes = await generateArticleRoutes(recentArticles);
          const mostLikedRoutes = await generateArticleRoutes(
            mostLikedArticles
          );
          const trendingRoutes = await generateArticleRoutes(trendingArticles);
          const discoveryRoutes = await generateArticleRoutes(
            discoveryArticles
          );
          const followingRoutes = await generateArticleRoutes(
            followingArticles
          );

          const allRoutes = [
            ...recentRoutes,
            ...mostLikedRoutes,
            ...trendingRoutes,
            ...discoveryRoutes,
            ...followingRoutes,
          ];

          setArticleRoutes(allRoutes);
        };

        updateArticleRoutes();
      }
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingMessage message="Loading" centered={true} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isLoggedIn && <MobileHeader />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? (
              <Home
                mostLikedArticles={mostLikedArticles}
                recentArticles={recentArticles}
                trendingArticles={trendingArticles}
                discoveryArticles={discoveryArticles}
                followingArticles={followingArticles}
              />
            ) : (
              <Auth />
            )
          }
        />
        {articleRoutes.map((articleRoute) => (
          <Route exact path={articleRoute} element={<Article />} />
        ))}
        <Route exact path="/about" element={<About />} />
        <Route exact path="/testArticle" element={<Article />} />
        <Route exact path="/liked" element={<Development />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoggedIn && (
        <SideBar
          recentArticles={recentArticles}
          mostLikedArticles={mostLikedArticles}
          userData={userData}
          isLoading={isLoading}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
