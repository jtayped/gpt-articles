// React Markdown
import React, { useState, useEffect } from "react";

// JSX Elements
import { UserInfo } from "../../containers";
import { Badge, LoadingMessage, NewsLetter } from "../../components";

// JS
import {
  getArticleFileURL,
  getRandomArticles,
  likeArticle,
} from "../../js/firebaseFunctions";

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
import { auth } from "../../config/firebase";

// Markdown
import ReactMarkdown from "react-markdown";
import { Buffer } from "buffer";
import matter from "gray-matter";

const Article = ({ article, setArticleRoutesInfo }) => {
  global.Buffer = global.Buffer || Buffer;

  const [loading, setLoading] = useState(true);
  const [reaction, setReaction] = useState(null);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const currentUserID = auth.currentUser.uid;

    getArticleFileURL(article.articleStorageID).then((url) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((markdownText) => {
          const content = matter(markdownText);
          setMarkdown(content);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    if (article.likes.includes(currentUserID)) {
      setReaction(true);
    } else if (article.dislikes.includes(currentUserID)) {
      setReaction(false);
    } else {
      setReaction(null);
    }
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

  const handleLike = async () => {
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
        loading ? "h-screen flex justify-center items-center" : ""
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
                  onClick={handleLike}
                >
                  {reaction === true ? <AiFillLike /> : <AiOutlineLike />}
                  {article.likeCount}
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-1"
                  onClick={handleDislike}
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
            <div>
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
            <article className="text-justify">
              <ReactMarkdown className="article">{markdown.content}</ReactMarkdown>
            </article>
            <aside className="flex flex-col gap-3">
              {article.authorID ? (
                <UserInfo
                  authorID={article.authorID}
                  setArticleRoutesInfo={setArticleRoutesInfo}
                />
              ) : null}
              <NewsLetter />
            </aside>
          </div>
        </div>
      )}
    </main>
  );
};

export default Article;
