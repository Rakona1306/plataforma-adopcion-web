import { montserrat } from "@/lib/fonts/monserrat";
import { MdOutlinePets } from "react-icons/md";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="space-y-1.5">
      <h3
        className={`text-xl font-extrabold text-terciary transition-colors md:text-2xl flex flex-row gap-3 items-center ${montserrat.className}`}
      >
        <MdOutlinePets size={30} />
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm font-medium text-primary">{subtitle}</p>
      )}
    </div>
  );
}
