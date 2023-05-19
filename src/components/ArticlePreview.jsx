// React Util
import React from "react";
import { Link } from "react-router-dom";

// JSX Elements
import Badge from "./Badge";

const ArticlePreview = ({ article }) => {
  const maxTags = 2;
  return (
    <li className="bg-gpt-300 rounded-md shadow-sm transition-transform h-[60px] duration-100 hover:scale-[101%]">
      <Link to="/linktoarticle" className="flex items-center gap-2 h-full">
        <img
          src={article.coverURL}
          className="h-[60px] w-[50px] object-cover rounded-l-md"
          alt="Article Cover"
        />
        <div className="my-2">
          <p className="font-bold text-xs mr-10 line-clamp-2">{article.title}</p>
          <ul className="flex flex-wrap gap-x-1">
            {article.tags
              ? article.tags
                  .slice(0, maxTags)
                  .map((tag) => <Badge key={tag} badge={tag} />)
              : null}
            {article.tags && article.tags["length"] > maxTags ? (
              <li key={article.tags.lenght + 1}>
                <p className="text-xs">
                  +{article.tags["length"] - maxTags} more
                </p>
              </li>
            ) : null}
          </ul>
        </div>
      </Link>
    </li>
  );
};

export default ArticlePreview;
