
interface ChipFieldProps<T> {
  label: string;
  options: T[];
  value: number;
  labelKey: keyof T;
  valueKey: keyof T;
  onChange: (value: number) => void;
  error?: string;
  required?: boolean;
}

export function ChipField<T>({ label, options, value, onChange, error, required, labelKey, valueKey }: ChipFieldProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={String(opt[valueKey])}
            type="button"
            onClick={() => onChange(Number(opt[valueKey]))}
            className={`px-3 py-1.5 text-sm rounded-full border transition ${
              value === opt[valueKey]
                ? "bg-primary border-secondary text-white"
                : "border-slate-300 text-slate-500 hover:border-secondary"
            }`}
          >
            {String(opt[labelKey]) ?? ''}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}