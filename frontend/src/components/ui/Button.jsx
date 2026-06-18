import React from "react";

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white font-['Space_Grotesk'] tracking-wide text-sm";
  
  const variants = {
    primary: "bg-[#1A1A1A] hover:bg-black text-white focus:ring-[#1A1A1A]",
    secondary: "bg-transparent border border-[#D9DADC] hover:border-[#1A1A1A] text-[#1A1A1A] focus:ring-[#1A1A1A]",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
    ghost: "bg-transparent hover:bg-[#F3F3F5] text-[#1A1A1A]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
