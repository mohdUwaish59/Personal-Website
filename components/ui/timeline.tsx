"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

interface TimelinePointProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
}

// Define the type for the compound component
interface TimelineComponent
  extends React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & 
    TimelineProps & 
    React.RefAttributes<HTMLDivElement>
  > {
  Item: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & 
    TimelineItemProps & 
    React.RefAttributes<HTMLDivElement>
  >;
  Point: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & 
    TimelinePointProps & 
    React.RefAttributes<HTMLDivElement>
  >;
  Content: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & 
    TimelineContentProps & 
    React.RefAttributes<HTMLDivElement>
  >;
}

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TimelineProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative space-y-6 after:absolute after:inset-0 after:ml-5 after:w-0.5 after:-translate-x-1/2 after:bg-border after:content-['']", className)}
    {...props}
  >
    {children}
  </div>
)) as TimelineComponent;  // Cast to the compound component type

Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TimelineItemProps
>(({ className, children, active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex gap-6", className)}
    {...props}
  >
    {children}
  </div>
));
TimelineItem.displayName = "TimelineItem";

const TimelinePoint = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TimelinePointProps
>(({ className, children, icon, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md shadow-primary/10 ring-1 ring-border", className)}
    {...props}
  >
    {icon ? (
      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
        {icon}
      </div>
    ) : (
      children
    )}
  </div>
));
TimelinePoint.displayName = "TimelinePoint";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TimelineContentProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 pt-1.5", className)}
    {...props}
  >
    {children}
  </div>
));
TimelineContent.displayName = "TimelineContent";

// Assign subcomponents
Timeline.Item = TimelineItem;
Timeline.Point = TimelinePoint;
Timeline.Content = TimelineContent;

export { Timeline, TimelineItem, TimelinePoint, TimelineContent };