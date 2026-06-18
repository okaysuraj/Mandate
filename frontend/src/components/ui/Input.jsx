import React, { forwardRef } from "react";

export const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="small-caps">{label}</label>}
      <input
        ref={ref}
        className={`mandate-input ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";
