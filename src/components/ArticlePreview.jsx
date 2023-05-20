// React Util
import React from "react";
import { Link } from "react-router-dom";

// Icons
import { FiMessageSquare } from "react-icons/fi";

const ArticlePreview = ({ article }) => {
  return (
    <li>
      <Link
        to="/linktoarticle"
        className="flex py-3 px-3 items-center gap-3 relative rounded-md text-white hover:bg-[#2A2B32] cursor-pointer break-all )} )} hover:pr-4 bg-gpt-500 group"
      >
        <FiMessageSquare size={16} />
        <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
          <p className="text-sm">{article.title}</p>
          <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gpt-500 group-hover:from-[#2A2B32]"></div>
        </div>
      </Link>
    </li>
  );
};

export default ArticlePreview;
