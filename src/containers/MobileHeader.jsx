// React Util
import React, { useState } from "react";

// JSX Elements
import Sidebar from "./SideBar";

// Icons
import { FiMenu, FiPlus, FiX } from "react-icons/fi";

// Images
import Logo from "../assets/vector/isolated-monochrome-white.svg";

// Animation
import { motion, AnimatePresence } from "framer-motion";

const MobileHeader = () => {
  const [isSideBarActive, setSideBar] = useState(true);
  function toggleSideBar() {
    setSideBar(!isSideBarActive);
  }

  return (
    <header className="sticky top-0 z-10 w-full h-full flex items-center border-b border-white/20 bg-gpt-400 px-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
      <AnimatePresence>
        {isSideBarActive ? (
          <div>
            <div className="fixed inset-0 bg-gpt-200 bg-opacity-75 opacity-100" onClick={() => toggleSideBar()}></div>
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.225 }}
              className="absolute top-0 left-0"
            >
              <Sidebar />
              <button className="absolute top-[14px] right-[-37px]" onClick={() => toggleSideBar()}><FiX size={25}/></button>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <button onClick={() => toggleSideBar()}>
        <FiMenu size={24} />
      </button>
      <img src={Logo} className="flex-1 h-1/2" alt="Logo" />
      <a href="/create">
        <FiPlus size={24} />
      </a>
    </header>
  );
};

export default MobileHeader;
