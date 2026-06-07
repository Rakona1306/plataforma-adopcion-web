
interface ToggleFieldProps {
  label: string;
  subtitle: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleField({ label, subtitle, value, onChange }: ToggleFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center justify-between px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition text-left w-full"
    >
      <div>
        <p className="text-sm text-slate-800">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div
        className={`w-9 h-5 rounded-full relative transition-colors ${
          value ? "bg-primary" : "bg-slate-300"
        }`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
            value ? "translate-x-4 left-0.5" : "left-0.5"
          }`}
        />
      </div>
    </button>
  );
}