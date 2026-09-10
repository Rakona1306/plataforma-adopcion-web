"use client";

import { montserrat } from "@/lib/fonts/monserrat";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormSectionProps {
  icon: string | ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
  iconContainerClassName?: string;
}

export function FormSection({
  icon,
  title,
  subtitle,
  children,
  iconContainerClassName,
}: FormSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <div
          className={cn(
            "p-2 rounded-lg bg-slate-100 flex items-center justify-center",
            iconContainerClassName,
          )}
        >
          {typeof icon === "string" ? (
            <i className={`ti ${icon} text-slate-500 text-base`} />
          ) : (
            <>{icon}</>
          )}
        </div>
        <div>
          <p
            className={`text-sm font-bold text-slate-800 ${montserrat.className}`}
          >
            {title}
          </p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
