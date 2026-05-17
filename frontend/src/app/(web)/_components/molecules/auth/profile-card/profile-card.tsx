"use client";

import { useEffect, useRef, useState } from "react";
import { MdPets } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import { getMenuItems } from "./utils/menuProfile";
import { useMenuRedirects } from "./hooks/useMenuRedirects";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import Link from "next/link";

export function ProfileCard() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useSessionStore();
  const { onLogout } = useMenuRedirects();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = getMenuItems({ onLogout });

  return (
    <div ref={ref} className="relative inline-block">
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.97 }}
        className={`group flex items-center gap-3 px-3 py-2 rounded-xl bg-white border-2 border-secondary/50 shadow-sm hover:shadow-md hover:border-secondary transition-all duration-200 cursor-pointer select-none
          ${open ? "shadow-md border-secondary" : ""}
        `}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-inner">
            <MdPets className="text-terciary w-5 h-5" />
          </div>
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
        </div>

        {/* Name + role */}
        <div className="text-left leading-tight hidden sm:block">
          <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">
            {user ? `${user.name} ${user.lastName}` : "Usuario"}
          </p>
          {user?.role && (
            <p className="text-xs text-slate-400 font-medium">
              {user.role.name}
            </p>
          )}
        </div>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-slate-400 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 z-50 origin-top-right"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3  border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500 truncate font-medium">
                      Bienvenido
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                {menuItems.map((item, i) => {

                  if (item.auth && user?.role?.toDashboard === false) {
                    return null
                  }

                  return (
                    <div key={i}>
                      {item.divider && (
                        <div className="my-1 border-t border-slate-100" />
                      )}
                      <Link
                        href={item.href ?? ""}
                        onClick={() => {
                          setOpen(false);
                          item.action?.();
                        }}
                        className={`hover:translate-x-0.5 w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium ${item.color} hover:bg-slate-50 transition-all duration-300 text-left cursor-pointer
                      `}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        {item.label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
