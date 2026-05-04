/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaHandshake, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { CgLock } from "react-icons/cg";
import Container from "@/presentation/atoms/container";
import Button from "@/app/(web)/_components/atoms/button/button";
import Title from "@/app/(web)/_components/atoms/title";
import FormContainer from "@/presentation/molecules/form-container";
import Input from "@/presentation/atoms/input";
import Textarea from "@/presentation/atoms/text-area";
import { companyInfo } from "@/app/(web)/_utils/data/companyInfo.data";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";
import { notSpace } from "@/shared/functions/notSpace";

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

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <main className="bg-white">
      {/* Header Section */}
      <section className="pt-32 md:pt-42 pb-16 md:pb-24 px-4 md:px-6 bg-gradient-to-b from-primary/5 to-white">
        <Container className="text-center space-y-4 md:space-y-6">
          <Title htmlTag="h1" className=" text-foreground leading-tight">
            {volunteerData.title}
          </Title>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            {volunteerData.subtitle}
          </p>
          <div className="pt-4 md:pt-6 flex justify-center">
            <Button className="text-lg font-bold py-4 px-6">
              Comienza tu Aventura
            </Button>
          </div>
        </Container>
      </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {volunteerData.whyVolunteer.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];
              return (
                <div key={index} className="group">
                  <Card className="bg-white border-primary/20 hover:border-primary/60 hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 md:p-8 space-y-4">
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

      {/* Form Section */}
      <section className="py-7 md:py-16 px-4 md:px-6 bg-white">
        <Container className="text-center">
          <Title htmlTag="h2">
            ¿Listo para Hacer{" "}
            <span className="text-primary">la Diferencia?</span>
          </Title>

          <div className="mt-10 flex gap-10 md:flex-row flex-col">
            <FormContainer
              initialValues={{
                name: "",
                email: "",
              }}
              onSubmit={handleSubmit}
              containerClassName="w-full md:w-1/2 border-2 border-gray-200 rounded-lg p-4 pt-9"
              className="space-y-5"
            >
              <section className="flex gap-5 w-full">
                <Input
                  name="name"
                  label="Nombre Completo"
                  placeholder="Juan Perez Quispe"
                />
              </section>

              <section className="flex gap-5 w-full md:flex-row flex-col">
                <Input
                  name="email"
                  label="Email"
                  placeholder="usuario@gmail.com"
                />
                <Input 
                  name="number" 
                  label="Celular" 
                  type="tel" 
                  placeholder="123456789" 
                />
              </section>

              <Textarea 
                label="Mensaje"
                name="message"
                placeholder="Escribe tu mensaje aquí"
              />

              <section className="w-full">
                <Button
                  type="submit"
                  className="w-full"
                  containerClassName="w-full"
                >
                  Enviar
                </Button>
              </section>
            </FormContainer>

            <div className="w-full md:w-1/2 space-y-5 py-3">

              {/* Address */}
              <div className="space-y-2 flex flex-col justify-start">
                <h3 className="text-start text-xl md:text-2xl font-bold text-primary flex gap-2 items-center">
                  <FaMapMarkerAlt size={30} />
                  <span>Direccion</span>
                </h3>
                <Link href={companyInfo.linkAddress} target="_blank" className="text-gray-500 text-start w-full">
                  {companyInfo.address}
                </Link>
              </div>

              <div className="space-y-2 flex flex-col justify-start">
                <h3 className="text-start text-xl md:text-2xl font-bold text-primary flex gap-2 items-center">
                  <IoPhonePortraitOutline size={30} />
                  <span>Celular</span>
                </h3>
                <Link href={`tel:${notSpace(companyInfo.contact.phone)}`} target="_blank" className="text-gray-500 text-start w-full">
                  {companyInfo.contact.phone}
                </Link>
              </div>

              <div className="space-y-2 flex flex-col justify-start">
                <h3 className="text-start text-xl md:text-2xl font-bold text-primary flex gap-2 items-center">
                  <MdOutlineEmail size={30} />
                  <span>Email</span>
                </h3>
                <Link href={`mailto:${companyInfo.contact.email}`} target="_blank" className="text-gray-500 text-start w-full">
                  {companyInfo.contact.email}
                </Link>
              </div>

              {/* Contact CTA */}
              <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-3">
                <FaUsers className="w-8 h-8 text-blue-600 mx-auto" />
                <h3 className="font-bold text-slate-800">¿Preguntas?</h3>
                <p className="text-sm text-slate-700">
                  Contáctanos para conocer mas sobre el proceso de voluntariado
                </p>
                <div className="flex justify-center">
                  <Button
                    href={`https://wa.me/${notSpace(companyInfo.contact.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-white text-blue-600! hover:text-white! before:bg-blue-600! border-blue-600! rounded-full font-semibold transition-colors"
                  >
                    Enviar Mensaje
                  </Button>
                </div>
              </div>
            </div>
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
