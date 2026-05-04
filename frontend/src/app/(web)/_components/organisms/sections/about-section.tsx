
/* import Container from "@/presentation/atoms/container";
import Title from "../../atoms/title";
import { MdPets } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { paymentMethods } from "@/app/(web)/_utils/data/paymentMethods";

export default function AboutSection() {
  return (
    <>
      <section className="py-10 w-full bg-gray-50">
        <Container>
          <Title htmlTag="h2" className="text-center">
            Sobre Adopta <span className="text-primary">Salva Vidas</span>
          </Title>
          <p className="mt-5 text-center text-lg text-gray-500">
            Somos una organización sin fines de lucro dedicada a rescatar,
            rehabilitar y encontrar hogares amorosos para mascotas necesitadas.
          </p>

          <div className="w-full flex gap-5 items-stretch mt-20">
            <div className="flex-1 space-y-4">
              <Title
                htmlTag="h3"
                className="text-primary! flex gap-2 items-center"
              >
                <MdPets className="text-terciary" />
                <span>Nuestra Misión</span>
              </Title>

              <p className="text-gray-500">
                Albergue Salva Vidas nació del amor genuino por los animales
                abandonados. Nuestro objetivo es simple pero poderoso: darle una
                segunda oportunidad a cada mascota que entra por nuestras
                puertas.
              </p>

              <Title
                htmlTag="h3"
                className="text-primary! flex gap-2 items-center"
              >
                <MdPets className="text-terciary" />
                <span>Lo Que Hacemos</span>
              </Title>
              <ul className="space-y-2 ps-3">
                <li className="flex gap-2 items-center text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>Rescatamos mascotas de situaciones difíciles</span>
                </li>
                <li className="flex gap-2 items-center text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>Proporcionamos atención médica completa y cuidado</span>
                </li>
                <li className="flex gap-2 items-center text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>
                    Capacitamos a las mascotas para sus nuevos hogares
                  </span>
                </li>
                <li className="flex gap-2 items-center text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>
                    Conectamos familias amorosas con sus compañeros perfectos
                  </span>
                </li>
                <li className="flex gap-2 items-center text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>Ofrecemos seguimiento post-adopción por vida</span>
                </li>
              </ul>

              <Title
                htmlTag="h3"
                className="text-primary! flex gap-2 items-center"
              >
                <MdPets className="text-terciary" />
                <span>Donaciones</span>
              </Title>

              <div className="flex flex-wrap gap-5 ps-3 flex-col">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-center border-2 justify-between bg-white border border-quaternary rounded-xl px-4 py-3 hover:border-terciary transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {method.imageMehtod ? (
                        <img
                          src={method.imageMehtod}
                          alt={method.name}
                          className="h-6 w-auto object-contain rounded"
                        />
                      ) : method.icon ? (
                        <method.icon className="text-[#003087] text-xl" />
                      ) : null}

                      <div>
                        <p className="text-primary text-sm font-medium leading-none">
                          {method.name}
                        </p>
                        {method.account && (
                          <p className="text-secondary text-xs font-light mt-0.5">
                            {method.account}
                          </p>
                        )}
                        {method.href && !method.account && (
                          <p className="text-secondary text-xs font-light mt-0.5">
                            julyavelino
                          </p>
                        )}
                      </div>
                    </div>

                    {method.href && (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-primary bg-quaternary hover:bg-terciary transition-colors px-3 py-1.5 rounded-full"
                      >
                        Donar
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <img
                src="/home/about/albergue.jpg"
                alt="albergue"
                className="rounded-lg border-4 border-terciary ring-2 ring-quaternary sticky top-32 z-10"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
*/

'use client'

import { useEffect, useRef, useState } from 'react'
import { companyInfo } from '@/app/(web)/_utils/data/companyInfo.data'
import { Card, CardContent } from '../../molecules/card/card'
import { BiMapPin, BiPhone } from 'react-icons/bi'
import { CgMail } from 'react-icons/cg'
import { HiExternalLink } from 'react-icons/hi'
import Title from '../../atoms/title'
import Container from '@/presentation/atoms/container'
import Button from '../../atoms/button/button'
import { BsWhatsapp } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({})

  const animateStats = () => {
    companyInfo.stats.forEach(stat => {
      let current = 0
      const increment = stat.number / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          setAnimatedStats(prev => ({ ...prev, [stat.label]: stat.number }))
          clearInterval(timer)
        } else {
          setAnimatedStats(prev => ({ ...prev, [stat.label]: Math.floor(current) }))
        }
      }, 30)
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateStats()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="sobre-nosotros" className="py-16 md:py-26 md:pt-40 bg-linear-to-b from-gray-100 to-primary/5">
      <Container className="space-y-16 md:space-y-24">
        
        {/* Header */}
        <div className={`text-center space-y-4 md:space-y-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Title htmlTag='h2' className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Sobre <span className="text-primary">Albergue Salva Vidas</span>
          </Title>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-gray-500">
            {companyInfo.description}
          </p>
        </div>

        {/* Mission & Activities */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-1000 delay-200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <Title htmlTag='h3' className="text-2xl md:text-3xl font-bold text-foreground">Nuestra Misión</Title>
              <p className="leading-relaxed text-base md:text-lg text-gray-500">
                {companyInfo.mission}
              </p>
            </div>

            <div className="space-y-4">
              <Title htmlTag='h3' className="text-2xl md:text-3xl font-bold text-foreground">Lo Que Hacemos</Title>
              <ul className="space-y-3">
                {companyInfo.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    </span>
                    <span className="text-gray-500 group-hover:text-foreground transition-colors text-base">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 h-80 md:h-96 group">
            <img
              src="/home/about/albergue.jpg"
              alt="Albergue PawsAdopt"
              className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl border-4 border-primary/20 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Services with Images */}
        <div className={`space-y-8 md:space-y-12 transition-all duration-1000 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Title htmlTag='h3' className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Servicios del <span className="text-primary">Albergue</span>
          </Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {companyInfo.services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <Card className="overflow-hidden border-primary/20 hover:border-primary/60 hover:shadow-2xl transition-all duration-300 h-full bg-white">
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <h4 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className={`w-full transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="bg-white border-2 border-primary/30 hover:border-primary/60 transition-all duration-300">
            <CardContent className="p-8 md:p-12">
              <Title htmlTag='h3' className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Información de Contacto
              </Title>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20">
                      <BiMapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Title htmlTag='h4' className="text-base! mb-1">Ubicación</Title>
                    <p className="text-gray-500 text-sm md:text-base">{companyInfo.contact.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20">
                      <BiPhone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Title htmlTag='h4' className="text-base! mb-1">Teléfono</Title>
                    <a href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`} className="text-gray-500  transition-colors text-sm md:text-base font-medium">
                      {companyInfo.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20">
                      <CgMail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Title htmlTag='h4' className="text-base! mb-1">Correo</Title>
                    <a href={`mailto:${companyInfo.contact.email}`} className="text-gray-500 transition-colors text-sm md:text-base">
                      {companyInfo.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="px-6 md:px-8 py-3 border-terciary text-terciary before:bg-terciary! rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform text-center text-base md:text-lg">
                  <BsWhatsapp size={23} />
                  <span>Contactanos por WhatsApp</span>
                </Button>
                <Button href={`mailto:${companyInfo.contact.email}`} className="px-6 md:px-8 py-3 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-primary/5 transition-all duration-300 text-center text-base md:text-lg">
                  <MdEmail size={23} />
                  <span>Enviar Correo</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
