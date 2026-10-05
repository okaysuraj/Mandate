import React from "react";

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[40px] rounded-md font-label-caps text-xs font-bold uppercase tracking-wider transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 active:scale-[0.98] cursor-pointer select-none";
  
  const variants = {
    primary: "bg-primary text-on-primary border border-primary hover:opacity-90 shadow-sm",
    secondary: "bg-transparent border border-outline text-on-surface hover:bg-surface-container-low hover:border-primary",
    danger: "bg-error text-white border border-error hover:opacity-90 shadow-sm",
    ghost: "bg-transparent text-on-surface hover:bg-surface-container-low border border-transparent hover:border-outline-variant"
  };

  return (
    <button className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};
