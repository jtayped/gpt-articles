// React Util
import React from "react";

// JSX Components
import Badge from "./Badge";

const Tags = ({ tags, maxTags }) => {
  return (
    <ul className="flex flex-wrap gap-x-1 gap-y-0.5">
      {tags
        ? tags
            .slice(0, maxTags)
            .map((tag, index) => <Badge key={index} badge={tag} />)
        : null}
      {tags && tags["length"] > maxTags ? (
        <li key={tags.lenght + 1}>
          <p className="text-xs">+{tags["length"] - maxTags} more</p>
        </li>
      ) : null}
    </ul>
  );
};

export default Tags;
