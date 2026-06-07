"use client"

import { ReactNode } from "react";

interface FormSectionProps {
  icon: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function FormSection({ icon, title, subtitle, children }: FormSectionProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
          <i className={`ti ${icon} text-slate-500 text-base`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}