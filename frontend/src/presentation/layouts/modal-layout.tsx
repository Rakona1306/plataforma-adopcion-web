import React, { ReactNode } from "react";

interface ModalLayoutProps {
  children: ReactNode;
}

export const ModalLayout: React.FC<
  ModalLayoutProps
> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg animate-fadeIn">
        {children}
      </div>
    </div>
  );
};