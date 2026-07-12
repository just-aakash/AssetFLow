import React from 'react';
import { cn } from './Button';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card text-foreground shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
