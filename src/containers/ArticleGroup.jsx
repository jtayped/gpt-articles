// React Util
import React from "react";

// JSX Components
import { LoadingMessage, ArticlePreview } from "../components";

const ArticleGroup = ({ title, articles, isLoading }) => {
  return (
    <li>
      {title ? (
        <h3 className="h-9 pb-2 pt-3 px-3 text-xs text-gray-500 font-medium text-ellipsis overflow-hidden break-all">
          {title}
        </h3>
      ) : null}

      {isLoading ? (
        <LoadingMessage message={`Loading ${title}`} centered={false} />
      ) : (
        <ol>
          {articles.map((article, index) => (
            <ArticlePreview key={index} article={article} />
          ))}
        </ol>
      )}
    </li>
  );
};

export default ArticleGroup;
