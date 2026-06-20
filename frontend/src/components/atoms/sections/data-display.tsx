// @/components/atoms/data-display.tsx
interface DataDisplayProps {
    label: string;
    value: React.ReactNode;
}

export function DataDisplay({ label, value }: DataDisplayProps) {
    return (
        <div className="flex flex-col gap-1 p-2 rounded-lg hover:bg-slate-50/50 transition-colors">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
            <div className="text-sm font-medium text-slate-700">{value ?? "---"}</div>
        </div>
    );
}