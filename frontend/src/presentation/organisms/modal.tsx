"use client";

import React, {
  ReactNode,
  useEffect,
} from "react";

import { createPortal } from "react-dom";
import { Overlay } from "../atoms/overlay";
import { ModalLayout } from "../layouts/modal-layout";
import { ModalHeader } from "../molecules/modal-header";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  closeOnOverlay?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlay = true,
}) => {
  // 🔐 Cerrar con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleKey
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [isOpen, onClose]);

  // ❌ No renderizar si está cerrado
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay
        onClick={
          closeOnOverlay ? onClose : undefined
        }
      />

      <ModalLayout>
        <div className="p-5 space-y-4">
          <ModalHeader
            title={title}
            onClose={onClose}
          />

          <div>
            {children}
          </div>
        </div>
      </ModalLayout>
    </>,
    document.body
  );
};