import { AiFillInfoCircle } from "react-icons/ai";

interface CardTextFieldProps {
  label: string;
  content?: string;
}

export function CardTextField({ label, content }: CardTextFieldProps) {
  if (!content) return null;

  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-medium text-terciary flex flex-row gap-2 items-center h-auto">
        <AiFillInfoCircle size={20} className="text-terciary" />
        <span className="">{label}</span>
      </h4>
      <p className="text-sm leading-relaxed text-slate-200 md:text-[15px] line-clamp-2 text-ellipsis">
        {content}
      </p>
    </div>
  );
}
