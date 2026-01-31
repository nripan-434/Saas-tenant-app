import React from 'react';

// Destructure 'menu' (the value) and 'setMenu' (the function) from props
const Menu = ({ menu, setMenu }) => {
  
  // Common styles for the lines
  const lineBase = "h-1 w-8 rounded-full bg-slate-800 transition-all duration-300 ease-in-out";

  return (
    <div className="flex flex-col ml-4  gap-4">
      <button
        // Toggle the parent state using the passed function
        onClick={() => setMenu(!menu)}
        className="flex h-12 w-12 flex-col items-center justify-center space-y-1.5 focus:outline-none"
      >
        {/* Top Line */}
        <div className={`${lineBase} ${menu ? "rotate-45 translate-y-2.5" : ""}`} />
        
        {/* Middle Line */}
        <div className={`${lineBase} ${menu ? "opacity-0 -translate-x-4" : ""}`} />
        
        {/* Bottom Line */}
        <div className={`${lineBase} ${menu ? "-rotate-45 -translate-y-2.5" : ""}`} />
      </button>
    </div>
  );
};

export default Menu;