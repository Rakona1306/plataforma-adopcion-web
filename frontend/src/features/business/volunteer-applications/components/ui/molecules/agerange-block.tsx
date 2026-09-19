interface AgeRangeBlockProps {
  minAge: number;
  maxAge: number;
}

export function AgeRangeBlock({ minAge, maxAge }: AgeRangeBlockProps) {
  return (
    <div className="bg-white px-4 py-3 rounded-lg border border-primary/10 shadow-sm shadow-black">
      <p className="text-sm font-semibold text-primary">Rango de edad</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">
        {minAge} – {maxAge} años
      </p>
    </div>
  );
}
