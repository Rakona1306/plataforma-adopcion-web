// src/components/atoms/select-option-chip.tsx
interface SelectOptionChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SelectOptionChip = ({ label, isSelected, onClick }: SelectOptionChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border
      ${isSelected 
        ? 'bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary/20' 
        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
      }
    `}
  >
    {label}
  </button>
);