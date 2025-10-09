import * as React from "react";

import { cn } from "@/lib/utils";

// EXAMPLE 1
//  ✅ With forwardRef - ref works properly
// const Input = React.forwardRef<
//   HTMLInputElement,
//   React.HTMLAttributes<HTMLInputElement>
// >(({ className, ...props }, ref) => (
//   <input 
//     ref={ref}
//     className={cn("border rounded", className)} 
//     {...props} 
//   />
// ));

//  Usage - ref works
// const MyForm = () => {
//   const inputRef = useRef<HTMLInputElement>(null);
  
//   const focusInput = () => {
//     inputRef.current?.focus(); // ✅ Works!
//   };
  
//   return <Input ref={inputRef} />; // ✅ Works!
// };

// EXAMPLE 2
// Why Card uses forwardRef:
// const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   ({ className, ...props }, ref) => (
//     <div ref={ref} className={cn("rounded-xl border", className)} {...props} />
//   )
// );

// So users can do this:
// const MyComponent = () => {
//   const cardRef = useRef<HTMLDivElement>(null);
  
//   const scrollToCard = () => {
//     cardRef.current?.scrollIntoView(); // ✅ Works because of forwardRef
//   };
  
//   return <Card ref={cardRef}>Content</Card>;
// };

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
