import React from "react";

interface ModalHeaderProps {
  title?: string;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <button
        onClick={onClose}
        className="text-gray-500 hover:text-red-500 transition"
        aria-label="Cerrar modal"
      >
        ✕
      </button>
    </div>
  );
};