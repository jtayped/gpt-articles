// React Util
import React from "react";

// Icons
import { FiTag } from "react-icons/fi";

const Badge = ({ badge }) => {
  const icon = <FiTag size={10} />;
  return (
    <li className="flex gap-0.5 items-center select-none">
      {icon}
      <p className="text-xs">{badge}</p>
    </li>
  );
};

export default Badge;
