// src/components/atoms/multi-option-button.tsx
interface MultiOptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const MultiOptionButton = ({ label, isSelected, onClick }: MultiOptionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium
      ${isSelected 
        ? 'bg-primary border-primary text-white shadow-md' 
        : 'bg-white border-slate-200 text-slate-600 hover:border-primary/50'
      }`}
  >
    {label}
  </button>
);