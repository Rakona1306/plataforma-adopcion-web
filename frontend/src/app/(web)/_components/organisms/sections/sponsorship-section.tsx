"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import Title from "../../atoms/title";
import { FaHeart, FaPaw } from "react-icons/fa";
import { MdPets, MdVolunteerActivism, MdUpdate } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";
import Container from "@/components/atoms/container";
import Tag from "@/components/atoms/tag";
import { sponsorshipData } from "@/core/shared/utils/web/data/sponsoship.data";

/* ── icons per card (fallback if no img) ─────────────── */
const cardIcons = [MdVolunteerActivism, MdUpdate, MdPets];

/* ── Variants ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.14, ease: "easeOut" },
  }),
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

/* ── Floating paw decoration ─────────────────────────── */
function FloatingPaw({
  className,
  delay = 0,
  size = 24,
}: {
  className?: string;
  delay?: number;
  size?: number;
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <FaPaw size={size} className="text-terciary/20" />
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function SponsorshipSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 overflow-hidden bg-white"
    >
      {/* ── Background decoration ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial glow */}
        
        <div className="absolute bottom-0 right-0 w-75 h-75 rounded-full bg-secondary/10 blur-3xl" />
        {/* Floating paws */}
        <FloatingPaw className="top-12 left-8 md:left-24" delay={0} size={32} />
        <FloatingPaw className="top-32 right-10 md:right-32" delay={1.2} size={20} />
        <FloatingPaw className="bottom-16 left-1/4" delay={2} size={28} />
        <FloatingPaw className="bottom-8 right-16" delay={0.8} size={18} />
      </div>

      <Container>
        {/* ── Header ── */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div custom={0} variants={fadeUp}>
            <Tag className="py-2.5 px-5 font-semibold text-sm gap-2 bg-primary/5 border-primary/20">
              <FaHeart size={14} className="text-primary" />
              <span className="text-primary">Apadrinamiento</span>
            </Tag>
          </motion.div>

          <motion.div custom={1} variants={fadeUp}>
            <Title htmlTag="h2" className="text-3xl md:text-4xl lg:text-5xl leading-tight">
              Sé el Padrino o{" "}
              <span className="relative inline-block text-primary">
                Madrina de una Mascota
              </span>
            </Title>
          </motion.div>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-secondary text-base md:text-lg font-light leading-relaxed"
          >
            ¿No puedes adoptar pero quieres hacer la diferencia? El apadrinamiento
            te permite ayudar a una mascota y mantener contacto con su crecimiento.
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorshipData.map((item, index) => {
            const Icon = cardIcons[index % cardIcons.length];
            return (
              <motion.div
                key={index}
                custom={index}
                variants={scaleIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-quaternary/60 shadow-sm hover:shadow-[0_8px_32px_rgba(115,29,52,0.12)] transition-shadow duration-300"
              >
                {/* Card image */}
                <div className="relative h-48 overflow-hidden bg-quaternary/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/40 via-transparent to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Icon size={18} className="text-primary" />
                  </div>

                  {/* Index pill */}
                  <div className="absolute bottom-3 left-3 w-7 h-7 rounded-full bg-terciary flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  {/* Gold accent line */}
                  <motion.div
                    className="w-8 h-0.75 bg-terciary rounded-full mb-3 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                  />

                  <h3 className="text-lg font-semibold text-primary mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom border accent on hover */}
                <div className="absolute bottom-0 left-0 w-full h-0.75 bg-terciary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </div>

        {/* ── Impact banner ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-14 rounded-2xl bg-primary relative overflow-hidden p-6 md:p-8"
        >
          {/* Decorative paw watermark */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none">
            <FaPaw size={120} className="text-terciary" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <HiSparkles className="text-terciary" size={18} />
                <span className="text-terciary text-xs font-semibold uppercase tracking-widest">
                  Tu impacto
                </span>
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed max-w-lg">
                ¿Quieres conocer nuestras mascotas actuales disponibles para
                apadrinamiento?
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/mascotas"
                className="hover:text-primary font-bold text-white text-sm whitespace-nowrap border-2 border-white flex gap-4 items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white"
              >
                <MdPets size={18} className="relative z-10" />
                <span className="relative z-10">Ver Mascotas</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}