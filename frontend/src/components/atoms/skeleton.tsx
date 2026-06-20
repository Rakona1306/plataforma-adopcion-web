import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  animated?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-md",
  className,
  animated = true,
}) => {
  return (
    <div
      className={clsx(
        "bg-slate-100 dark:bg-slate-200",
        animated && "animate-pulse",
        width,
        height,
        rounded,
        className
      )}
    />
  );
};