interface DateStatProps {
  label: string;
  date: string | Date;
}

export function DateStat({ label, date }: DateStatProps) {
  const formatted = new Date(date).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-lg border border-primary/10 bg-white p-3 shadow-sm shadow-black">
      <p className="text-sm font-medium text-primary">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{formatted}</p>
    </div>
  );
}
