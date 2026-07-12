import React from 'react';
import { cn } from './Button';

export function Badge({ className, variant = 'default', children, ...props }) {
  const variants = {
    default: "bg-card text-foreground border border-border",
    primary: "bg-primary text-primary-foreground",
    success: "bg-green-500/10 text-green-500 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
