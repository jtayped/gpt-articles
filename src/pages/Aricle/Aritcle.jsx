// React Markdown
import React, { useState, useEffect } from "react";

// JSX Elements
import { UserSideInfo } from "../../containers";
import { Badge, LoadingMessage } from "../../components";

// JS
import { getRandomArticles } from "../../js/firebaseFunctions";

// CSS
import "./article.css";

// Icons
import { FiMessageCircle } from "react-icons/fi";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

const Aritcle = () => {
  const [loading, setLoading] = useState({});
  const [article, setTestArticle] = useState({});
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    setLoading(true);
    getRandomArticles(1).then((articles) => {
      setTestArticle(articles[0]);
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

  return (
    <main
      className={`w-full h-full flex justify-center text-white ${
        loading ? "h-screen flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <LoadingMessage message="Loading Article" />
      ) : (
        <div className="max-w-[1000px] mt-[100px]">
          <header className="relative border-b-[1px] p-5">
            <ul className="absolute bottom-5 right-10 flex gap-5">
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={() => toggleReaction("like")}
                >
                  {reaction === "like" ? <AiFillLike /> : <AiOutlineLike />}
                  {article.likes}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={() => toggleReaction("dislike")}
                >
                  {reaction === "dislike" ? (
                    <AiFillDislike />
                  ) : (
                    <AiOutlineDislike />
                  )}
                  {article.dislikes}
                </button>
              </li>
              <li className="flex items-center gap-1">
                <FiMessageCircle />
                {article.comments["length"]}
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
            <aside>
              {article.userID ? <UserSideInfo userID={article.userID} /> : null}
            </aside>
          </div>
        </div>
      )}
    </main>
  );
};

export default Aritcle;
