import React, { forwardRef } from "react";

export const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="font-label-caps text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3.5 py-2.5 bg-surface-container-lowest border border-outline-variant font-body-md text-sm text-on-surface placeholder:text-outline rounded-md transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
          error ? "border-error focus:border-error focus:ring-error" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="font-mono text-xs text-error mt-0.5">{error}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";
