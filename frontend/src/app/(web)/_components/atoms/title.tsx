import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const selectTitleClass = (htmlTag: HeadingTag) => {
  switch (htmlTag) {
    case "h1":
      return "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold text-slate-800";
    case "h2":
      return "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold text-slate-800";
    case "h3":
      return "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-snug font-bold text-slate-800";
    case "h4":
      return "text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-snug font-bold text-slate-800";
    case "h5":
      return "text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-snug font-bold text-slate-800";
    case "h6":
      return "text-base sm:text-lg lg:text-xl xl:text-2xl leading-snug font-bold text-slate-800";
    default:
      return "text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-slate-800";
  }
};

export default function Title({
  children,
  className = "",
  htmlTag = "h1",
}: TitleProps) {
  const Tag = htmlTag;

  const classNameTitle = selectTitleClass(htmlTag);

  return (
    <Tag className={`${cn(classNameTitle, className)}`}>
      {children}
    </Tag>
  );
}

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  htmlTag?: HeadingTag;
}