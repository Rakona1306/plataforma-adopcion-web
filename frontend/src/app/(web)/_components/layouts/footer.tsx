"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { paymentMethods } from "@/app/(web)/_utils/data/paymentMethods";
import { MdPets, MdLocationOn, MdPhone } from "react-icons/md";
import { headerData } from "@/shared/utils/web/data/header.data";
import Container from "@/presentation/atoms/container";
import { companyInfo } from "../../_utils/data/companyInfo.data";
import { notSpace } from "@/shared/functions/notSpace";

const CONTACT = {
  phone: "+51 955 288 116",
  address: "Av. Salva Vidas 123, Lima, Perú",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-primary text-white">
      {/* Decorative paw watermark */}
      <div className="pointer-events-none absolute -right-16 -top-16 opacity-[0.04]">
        <MdPets style={{ fontSize: 320, color: "#F2B441" }} />
      </div>
      <div className="pointer-events-none absolute -left-10 bottom-10 opacity-[0.04]">
        <MdPets style={{ fontSize: 200, color: "#F2D194" }} />
      </div>

      {/* Gold top border accent */}
      <div className="h-1 w-full bg-terciary" />

      <Container className="py-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand column */}
          <motion.div
            className="md:col-span-1 flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            variants={fadeUp}
          >
            <Link href="/" className="inline-block">
              <Image
                src={headerData.logo}
                alt="Salva Vidas"
                width={120}
                height={48}
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Rescatamos, rehabilitamos y encontramos hogares amorosos para mascotas que lo necesitan.
            </p>

            {/* Paw divider */}
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <MdPets className="text-terciary text-base" />
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href={`tel:${notSpace(companyInfo.contact.phone)}`}
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-terciary transition-colors duration-200"
              >
                <MdPhone className="text-terciary flex-shrink-0" />
                {companyInfo.contact.phone}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/70">
                <MdLocationOn className="text-terciary flex-shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="md:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
            variants={fadeUp}
          >
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-terciary">
              Navegación
            </h4>
            <motion.ul
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {headerData.navLinks.map((link) => (
                <motion.li key={link.href} variants={linkItem}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-light text-white/70 transition-colors duration-200 hover:text-terciary"
                  >
                    <span className="block h-px w-0 bg-terciary transition-all duration-300 group-hover:w-4" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Payment methods */}
          <motion.div
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
            variants={fadeUp}
          >
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-terciary">
              Métodos de Donación
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm hover:border-terciary/50 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    {method.imageMehtod ? (
                      <img
                        src={method.imageMehtod}
                        alt={method.name}
                        className="h-6 w-auto rounded object-contain"
                      />
                    ) : method.icon ? (
                      <method.icon className="text-xl text-[#009cde]" />
                    ) : null}
                    <div>
                      <p className="text-sm font-medium text-white leading-none">
                        {method.name}
                      </p>
                      {method.account && (
                        <p className="mt-0.5 text-xs font-light text-white/50">
                          {method.account}
                        </p>
                      )}
                    </div>
                  </div>

                  {method.href && (
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-shrink-0 rounded-full bg-terciary px-3 py-1 text-xs font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      Donar →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xs font-light text-white/40">
            © {new Date().getFullYear()} Albergue Salva Vidas. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5 text-xs font-light text-white/40">
            Hecho con
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-red-400"
            >
              ♥
            </motion.span>
            para los animales
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}