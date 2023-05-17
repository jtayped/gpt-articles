// React Markdown
import React, { useState, useEffect } from "react";

// JSX Elements
import { UserSideInfo } from "../../containers";
import { Badge, LoadingMessage, NewsLetter } from "../../components";

// JS
import {
  createArticle,
  getRandomArticles,
  likeArticle,
} from "../../js/firebaseFunctions";

// CSS
import "./article.css";

// Icons
import { FiAperture, FiMessageCircle } from "react-icons/fi";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { auth } from "../../config/firebase";

const Aritcle = () => {
  const [loading, setLoading] = useState({});
  const [article, setTestArticle] = useState({});
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    setLoading(true);
    getRandomArticles(1).then((articles) => {
      const article = articles[0];
      const currentUserID = auth.currentUser.uid;
      setTestArticle(article);

      if (article.likes.includes(currentUserID)) {
        setReaction(true);
      } else if (article.dislikes.includes(currentUserID)) {
        setReaction(false);
      } else {
        setReaction(null);
      }
      setLoading(false);
    });
  }, []);

  const formatTimestamp = (seconds) => {
    const date = new Date(seconds * 1000);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString(undefined, options);
  };

  const toggleReaction = (newReaction) => {
    setReaction((prevReaction) => {
      if (newReaction === prevReaction) {
        return null; // Undo reaction if it's the same as the previous one
      }
      return newReaction;
    });
  };

  const handleLike = async () => {
    const currentUserID = auth.currentUser.uid;
    let newReaction = null;

    if (reaction !== true) {
      newReaction = true;
    }

    try {
      await likeArticle(article.articleID, newReaction, newReaction === null);
      setReaction(newReaction);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    const currentUserID = auth.currentUser.uid;
    let newReaction = null;

    if (reaction !== false) {
      newReaction = false;
    }

    try {
      await likeArticle(article.articleID, newReaction, newReaction === null);
      setReaction(newReaction);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className={`h-full flex justify-center text-white pl-[260px] ${
        loading ? "h-screen flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <LoadingMessage message="Loading Article" />
      ) : (
        <div className="max-w-[1000px] mt-10 2xl:mt-[100px]">
          <header className="relative border-b-[1px] p-5">
            <ul className="absolute bottom-5 right-10 flex gap-5">
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleLike}
                >
                  {reaction === true ? <AiFillLike /> : <AiOutlineLike />}
                  {article.likeCount}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleDislike}
                >
                  {reaction === false ? (
                    <AiFillDislike />
                  ) : (
                    <AiOutlineDislike />
                  )}
                  {article.dislikeCount}
                </button>
              </li>
              <li className="flex items-center gap-1">
                <FiMessageCircle />
                {article.comments.length}
              </li>
            </ul>
            <div className="flex gap-3">
              <img
                src={article.coverURL ? article.coverURL : null}
                className="w-[150px] h-[100px] object-cover rounded-md"
                alt="Article Cover"
              />
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <p className="text-sm font-thin text-gpt-50">
                  {article.timestamp
                    ? formatTimestamp(article.timestamp.seconds)
                    : null}
                </p>
                <ul className="flex flex-wrap gap-1">
                  {article.tags
                    ? article.tags.map((tag) => <Badge key={tag} badge={tag} />)
                    : null}
                </ul>
              </div>
            </div>
          </header>
          <div className="flex gap-10 p-5">
            <article className="text-justify">{article.article}</article>
            <aside className="flex flex-col gap-3">
              {article.authorID ? (
                <UserSideInfo authorID={article.authorID} />
              ) : null}
              <NewsLetter />
            </aside>
          </div>
        </div>
      )}
    </main>
  );
};

export default Aritcle;
