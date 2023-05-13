// React Util
import React from "react";
import { Link } from "react-router-dom";

// JSX Elements
import Badge from "./Badge";

const ArticlePreview = ({ article }) => {
  const maxTags = 2;
  return (
    <li className="bg-gpt-100 h-[60px] rounded-lg shadow-sm transition-transform duration-100 hover:scale-[102%]">
      <Link to="/linktoarticle" className="flex items-center gap-2 h-full">
        <img
          src="https://images.unsplash.com/photo-1682687218147-9806132dc697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
          className="h-full w-[50px] object-cover rounded-l-lg"
          alt="Article Cover"
        />
        <div>
          <p className="font-bold text-xs mr-10">{article.title}</p>
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
