"use client";

import { useState } from "react";
import { volunteerData } from "@/app/(web)/_utils/data/voluntee.data";
import { Card, CardContent } from "@/app/(web)/_components/molecules/card/card";
import {
  BiBookOpen,
  BiChevronDown,
  BiClipboard,
  BiHeart,
  BiSmile,
  BiTrendingUp,
} from "react-icons/bi";
import { FaHandshake, FaUsers } from "react-icons/fa";
import { CgLock } from "react-icons/cg";
import Title from "@/app/(web)/_components/atoms/title";
import Container from "@/components/ui/atoms/container";
import dataTemporal from "../../../public/data-temporal.json";
const urgencyStyles: Record<string, string> = {
  NORMAL: "bg-gray-100 text-gray-700 border-gray-300",
  LOW: "bg-green-100 text-green-700 border-green-300",
  MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
  HIGH: "bg-orange-100 text-orange-700 border-orange-300",
  URGENT: "bg-red-100 text-red-700 border-red-300",
};

const iconMap: Record<string, React.ComponentType<{ className: string }>> = {
  heart: BiHeart,
  users: FaUsers,
  "trending-up": BiTrendingUp,
  clock: CgLock,
  clipboard: BiClipboard,
  handshake: FaHandshake,
  "book-open": BiBookOpen,
  smile: BiSmile,
};

export default function VolunteerPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <main className="bg-white">
      {/* Header Section */}

      {/*<BannerVoluntariado /> no encuentro banner voluntario archivo*/}

      {/* Why Volunteer Section */}
      <section className="py-7 md:py-16 px-4 md:px-6 bg-white">
        <Container className=" space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <Title htmlTag="h2" className="text-foreground">
              {volunteerData.whyVolunteer.title}
            </Title>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {volunteerData.whyVolunteer.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 space-y-12 md:space-y-16">
            {volunteerData.whyVolunteer.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <div key={index} className="group">
                  <Card className="bg-white border-primary/20 hover:border-primary/60 hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 md:p-8 space-y-4 flex flex-col items-center text-center md:items-start md:text-left">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {IconComponent && (
                          <IconComponent className="w-7 h-7 text-primary" />
                        )}
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>

                      <p className="text-sm md:text-base text-foreground/70">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Form Section*/}
      <section className="py-7 md:py-16 px-4 md:px-6 bg-white">
        <Container className="text-center">
          <Title htmlTag="h2">
            ¿Listo para Hacer{" "}
            <span className="text-primary">la Diferencia?</span>
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mt-20 ">
            {dataTemporal.map((item, index) => (
              <div key={index}>
                <Card className="group h-full overflow-hidden border-primary/20 bg-white transition-all duration-300 hover:border-primary/60 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col p-6 md:p-8">
                    {/* Título y subtítulo */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
                        {item.title}
                      </h3>

                      <p className="text-sm font-medium text-primary">
                        {item.subTitle}
                      </p>
                    </div>

                    {/* Descripción */}
                    <div className="mt-6 space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                        Descripción
                      </h4>

                      <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Requisitos */}
                    <div className="mt-5 space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                        Requisitos
                      </h4>

                      <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
                        {item.requirements}
                      </p>
                    </div>

                    {/* Edad */}
                    <div className="mt-5 rounded-lg bg-primary/5 p-4">
                      <p className="text-sm font-semibold text-foreground">
                        Rango de edad
                      </p>

                      <p className="mt-1 text-sm text-foreground/70">
                        {item.minAge} - {item.maxAge} años
                      </p>
                    </div>

                    {/* Ubicación */}
                    <div className="mt-5 space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                        Ubicación
                      </h4>

                      <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
                        {item.address}
                      </p>

                      {item.googleMapLinkAddress && (
                        <a
                          href={item.googleMapLinkAddress}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Ver ubicación en Google Maps →
                        </a>
                      )}
                    </div>

                    {/* Fechas */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-primary/10 p-3">
                        <p className="text-xs font-semibold uppercase text-foreground/50">
                          Inicio
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {new Date(item.startDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="rounded-lg border border-primary/10 p-3">
                        <p className="text-xs font-semibold uppercase text-foreground/50">
                          Cierre
                        </p>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {new Date(item.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Contacto */}
                    <div className="mt-5 space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">
                        Contacto
                      </h4>

                      <a
                        href={`mailto:${item.contactEmail}`}
                        className="block truncate text-sm text-primary hover:underline"
                      >
                        {item.contactEmail}
                      </a>

                      <a
                        href={`tel:${item.contactPhone}`}
                        className="block text-sm text-primary hover:underline"
                      >
                        {item.contactPhone}
                      </a>
                    </div>

                    {/* Parte inferior */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-6">
                      {/* Certificación */}
                      {item.isCertified ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                          <span className="h-2 w-2 rounded-full bg-current" />
                          Certificado oficial
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600">
                          <span className="h-2 w-2 rounded-full bg-current" />
                          Sin certificación
                        </span>
                      )}

                      {/* Urgencia */}
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${
                          urgencyStyles[item.urgency]
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {item.urgency}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-7 md:py-10 px-4 md:px-6 bg-white">
        <Container className="space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <Title htmlTag="h2" className="text-foreground">
              Cómo <span className="text-primary">Comenzar</span>
            </Title>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              El proceso es simple y directo. Te guiaremos en cada paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {volunteerData.process.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < volunteerData.process.length - 1 && (
                    <div className="hidden md:block absolute left-[50%] top-16 w-full h-1 bg-gradient-to-r from-primary to-secondary transform -translate-x-1/2 z-0" />
                  )}

                  <div className="relative z-10">
                    <Card className="bg-white border-primary/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 md:p-8 space-y-4 text-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center">
                          {IconComponent && (
                            <IconComponent className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary/70 mb-1">
                            Paso {item.step}
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base text-foreground/70">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-16 px-4 md:px-6 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto max-w-6xl space-y-12 md:space-y-16">
          <div className="text-center space-y-4">
            <Title htmlTag="h2" className=" text-foreground">
              Lo que Dicen{" "}
              <span className="text-primary">Nuestros Voluntarios</span>
            </Title>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {volunteerData.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-primary/20 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-1 text-lg">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-primary">
                        {star}
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-foreground/80 italic text-base">
                    {testimonial.quote}
                  </blockquote>
                  <div className="pt-4 border-t border-primary/20 space-y-2">
                    <div className="text-2xl">{testimonial.image}</div>
                    <div>
                      <div className="font-bold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-foreground/60">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-16 px-4 md:px-6 bg-white">
        <div className="container mx-auto max-w-3xl space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <Title htmlTag="h2" className=" text-foreground">
              Preguntas <span className="text-primary">Frecuentes</span>
            </Title>
          </div>

          <div className="space-y-4">
            {volunteerData.faq.map((item, index) => (
              <div key={index} className="group">
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full text-left"
                >
                  <Card className="bg-white border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-lg">
                    <CardContent className="px-6 py-1 flex items-center justify-between gap-4">
                      <h3 className="text-lg md:text-xl font-bold text-foreground flex-1">
                        {item.question}
                      </h3>
                      <BiChevronDown
                        className={`w-6 h-6 text-primary transition-transform duration-300 flex-shrink-0 ${expandedFaq === index ? "rotate-180" : ""}`}
                      />
                    </CardContent>
                  </Card>
                </button>

                {expandedFaq === index && (
                  <div className="mt-2 px-6 py-6 bg-primary/5 rounded-2xl border border-primary/20 animate-fade-in">
                    <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
