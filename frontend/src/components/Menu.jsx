import React from 'react';

const Menu = ({ menu, setMenu }) => {
  
  const lineBase = "h-1  w-8 rounded-full bg-slate-800 transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-col ml-4 mt-3 gap-4">
      <button
        onClick={() => setMenu(!menu)}
        className="flex h-11 w-11 flex-col items-center justify-center space-y-1.5 focus:outline-none"
      >
        <div className={`${lineBase} ${menu ? "rotate-45 translate-y-2.5" : ""}`} />
        
        <div className={`${lineBase} ${menu ? "opacity-0 -translate-x-4" : ""}`} />
        
        <div className={`${lineBase} ${menu ? "-rotate-45 -translate-y-2.5" : ""}`} />
      </button>
    </div>
  );
};

export default Menu;