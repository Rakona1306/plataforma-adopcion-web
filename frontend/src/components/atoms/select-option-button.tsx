// src/components/atoms/select-option-button.tsx
interface SelectOptionButtonProps {
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  isActiveColor: 'green' | 'red';
  onClick: () => void;
}

export const SelectOptionButton = ({ label, icon, isSelected, isActiveColor, onClick }: SelectOptionButtonProps) => {
  const activeClass = isActiveColor === 'green' 
    ? 'bg-green-50 border-green-500 text-green-700' 
    : 'bg-red-50 border-red-500 text-red-700';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 md:flex-1 ${
        isSelected ? activeClass : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};