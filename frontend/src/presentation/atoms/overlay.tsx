import React from "react";

interface OverlayProps {
  onClick?: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      aria-hidden="true"
    />
  );
};