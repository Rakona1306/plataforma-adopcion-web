"use client"

export default function Tag({ children, className }: TagProps) {
  return (
    <div className={`bg-secondary/30 font-medium flex items-center gap-2 border-2 text-primary px-3 py-1 w-fit rounded-full ${className || ''}`}>{children}</div>
  );
}

interface TagProps {
  children: React.ReactNode;
  className?: string;
}