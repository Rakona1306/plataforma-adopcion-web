"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { headerData } from "@/shared/utils/web/data/header.data";
import { FaDog } from "react-icons/fa";
import { MdOutlinePets, MdClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import Container from "@/presentation/atoms/container";
import Button from "../atoms/button/button";
import ImageExpandable from "../atoms/image-expandable";
import { useDevice } from "@/application/hooks/useDevice";

/* ── Variants ─────────────────────────────────────────── */
const headerVariants: Variants = {
  hidden: { y: -90, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: 0.15 + i * 0.07, ease: "easeOut" },
  }),
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.5, ease: "easeOut" },
  },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.32, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, delay: i * 0.055, ease: "easeOut" },
  }),
};

/* ── Component ────────────────────────────────────────── */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { device } = useDevice()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-[0_2px_20px_rgba(115,29,52,0.10)]"
          : "bg-white shadow-sm",
      ].join(" ")}
    >

      <Container>
        <div className="flex items-center justify-between h-auto">

          {/* Logo — ImageExpandable shrinks on scroll via useScroll hook */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex items-center gap-2.5"
          >
            <ImageExpandable
              src={headerData.logo}
              alt="Salva Vidas"
              width={52}
              height={52}
              widthExpanded={device === 'mobile' ? 72 : 102}
              heightExpanded={device === 'mobile' ? 72 : 102}
              loading="eager"
              href="/"
              notExpandable={false}
              className="object-contain"
            />
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {headerData.navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={link.href}
                  className="group relative px-4 py-2 text-sm font-medium text-primary/75
                             hover:text-primary rounded-xl hover:bg-primary/[0.06]
                             transition-all duration-200 flex items-center"
                >
                  {/* Paw appears floating above on hover */}
                  <MdOutlinePets
                    size={17}
                    className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-terciary
                               opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100
                               transition-all duration-200 pointer-events-none"
                  />
                  <span className="transition-transform font-bold duration-200 group-hover:-translate-y-0.5 relative z-10">
                    {link.name}
                  </span>
                  {/* Gold underline sweep */}
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0
                                bg-terciary rounded-full group-hover:w-5 transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA desktop — custom Button component */}
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:block"
            >
              <Button
                href="/login"
                icon={<FaDog size={16} className="relative z-10" />}
                spaceClassName="bg-white"
                className="text-sm font-semibold hover:text-white"
              >
                <span className="relative z-10 font-medium">Iniciar Sesión</span>
              </Button>
            </motion.div>

            {/* Hamburger — mobile */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden flex items-center justify-center w-10 h-10
                         rounded-xl border border-primary/20 text-primary
                         hover:bg-primary/5 transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <MdClose size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <HiMenuAlt3 size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden border-t border-primary/10 bg-white/98 backdrop-blur-sm"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {headerData.navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                               font-medium text-primary/80 hover:text-primary
                               hover:bg-primary/5 transition-colors duration-200 group"
                  >
                    <MdOutlinePets
                      size={16}
                      className="text-terciary opacity-60 group-hover:opacity-100
                                 transition-all duration-200 group-hover:scale-110 flex-shrink-0"
                    />
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA — custom Button */}
              <motion.div
                custom={headerData.navLinks.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                className="mt-2 pt-3 border-t border-primary/10"
              >
                <Button
                  href="/login"
                  icon={<FaDog size={16} className="relative z-10" />}
                  spaceClassName="bg-white"
                  className="w-full justify-center text-sm font-semibold hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative z-10 font-medium">Iniciar Sesión</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}