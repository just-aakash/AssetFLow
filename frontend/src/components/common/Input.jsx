import React, { forwardRef } from 'react';
import { cn } from './Button';

export const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-border bg-[#10141a] px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#10141a] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export const Label = forwardRef(({ className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-muted",
      className
    )}
    {...props}
  >
    {children}
  </label>
));

Label.displayName = "Label";
