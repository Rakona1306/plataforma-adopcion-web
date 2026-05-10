'use client'

import { useState } from 'react'
import { donationData } from '@/app/(web)/_utils/data/donation.data'
import { BiCheck, BiHeart } from 'react-icons/bi'
import { Card, CardContent } from '@/app/(web)/_components/molecules/card/card'
import Container from '@/presentation/atoms/container'
import Button from '@/app/(web)/_components/atoms/button/button'
import { paymentMethods } from '@/app/(web)/_utils/data/paymentMethods'

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('once')
  const [selectedMethod, setSelectedMethod] = useState('PayPal')

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

  return (
    <main className="min-h-screen bg-background">

      {/* SECTION 1: Impact Banner */}
      <section className="relative py-12 md:py-20 md:pt-45 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🐾</div>
          <div className="absolute bottom-20 right-20 text-6xl">❤️</div>
          <div className="absolute top-1/3 right-1/4 text-5xl">🏡</div>
        </div>

        <Container className=" px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {donationData.heroTitle}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {donationData.heroSubtitle}
                </p>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
                {donationData.impactStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-terciary mb-2">{stat.amount}</div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">{stat.title}</h3>
                    <p className="text-xs md:text-sm text-white/80">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative h-80 md:h-96">
              <img
                src="/donation/banner.jpg"
                alt="Impacto de donaciones"
                className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white/20"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2: Donation Form & Payment Methods */}
      <section className="py-7 md:py-16 bg-white">
        <Container className=" px-4 md:px-6">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Donation Form */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Haz tu Donación</h2>

                {/* Donation Type Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-foreground">Tipo de Donación</label>
                  <div className="grid grid-cols-2 gap-4">
                    {donationData.donationPlans.map((plan, index) => (
                      <button
                        key={index}
                        onClick={() => setDonationType(plan.type === 'Una Sola Vez' ? 'once' : 'monthly')}
                        className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-center bg-gray-200 ${
                          (donationType === 'once' && plan.type === 'Una Sola Vez') ||
                          (donationType === 'monthly' && plan.type === 'Mensual')
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-muted text-foreground hover:border-primary border-2 border-transparent'
                        }`}
                      >
                        {plan.type}
                        {plan.badge && (
                          <span className="absolute -top-3 -right-3 bg-terciary text-foreground text-xs px-3 py-1 rounded-full font-bold">
                            {plan.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-foreground">Selecciona un Monto</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(donationType === 'once'
                      ? donationData.donationPlans[0].amounts
                      : donationData.donationPlans[1].amounts
                    ).map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 bg-gray-200 ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground hover:border-primary border-2 border-transparent'
                        }`}
                      >
                        S/.{amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">O ingresa un monto personalizado</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-primary">S/.</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        if (e.target.value) {
                          setSelectedAmount(0)
                        }
                      }}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-3 border-2 border-muted rounded-lg focus:border-primary outline-none transition-colors text-lg"
                    />
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-foreground">Método de Pago</label>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.name}
                        onClick={() => setSelectedMethod(method.name)}
                        className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedMethod === method.name
                            ? 'border-primary bg-primary/10'
                            : 'border-muted bg-muted hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              {method.icon && <span className="text-2xl">{method.icon({ size: 30 })}</span>}
                              {method.imageMehtod && <img src={method.imageMehtod} alt={method.name} className="h-10" />}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{method.name}</div>
                              <div className="text-sm text-foreground/60">{method.account}</div>
                            </div>
                          </div>
                          {selectedMethod === method.name && (
                            <BiCheck className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button href={`https://api.whatsapp.com/send?phone=51955288116&text=Quisiera%20realizar%20una%20donacion%20${finalAmount}%20con%20el%20metodo%20de%20pago%20${selectedMethod}%20para%20apoyar%20el%20albergue%20%F0%9F%98%80%F0%9F%91%8D`} containerClassName='w-full' className='w-full font-bold py-4'>
                  <BiHeart className="w-6 h-6" />
                  Donar S/.{finalAmount || selectedAmount}
                </Button>

                <p className="text-center text-sm text-foreground/60">
                  Tu donación es segura y protegida. Recibirás confirmación por correo.
                </p>
              </div>

              {/* Summary / Info */}
              <div className="space-y-8">
                <Card className="bg-quaternary/50 border-0">
                  <CardContent className="p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">¿Por Qué Donar?</h3>
                    <div className="space-y-4">
                      {donationData.whyDonate.map((reason, index) => (
                        <div key={index} className="flex gap-4">
                          <span className="text-2xl flex-shrink-0">{reason.icon}</span>
                          <div>
                            <h4 className="font-bold text-foreground mb-1">{reason.title}</h4>
                            <p className="text-sm text-foreground/80">{reason.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Donation Summary */}
                <Card className="border-2 border-primary">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-foreground text-lg">Resumen</h3>
                    <div className="space-y-3 border-b border-muted pb-4">
                      <div className="flex justify-between text-foreground">
                        <span>Monto a donar:</span>
                        <span className="font-bold text-primary text-lg">S/.{finalAmount || selectedAmount}</span>
                      </div>
                      <div className="flex justify-between text-foreground/70">
                        <span>Tipo:</span>
                        <span>{donationType === 'once' ? 'Una sola vez' : 'Mensual'}</span>
                      </div>
                      <div className="flex justify-between text-foreground/70">
                        <span>Método:</span>
                        <span>
                          {donationData.paymentMethods.find(m => m.id === selectedMethod)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-foreground/60 text-center">
                      Después de procesar tu pago, recibirás un recibo y acceso a tu panel de donante.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3: Testimonials & FAQ */}
      <section className="py-7 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 space-y-16 md:space-y-20">
          {/* Testimonials */}
          <div className="space-y-8 md:space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Historias de Donantes</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Escucha a personas como tú que están haciendo la diferencia en la vida de las mascotas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {donationData.testimonials.map((testimonial, index) => (
                <Card key={index} className="border-2 border-primary/20 hover:border-primary/60 transition-all duration-300">
                  <CardContent className="p-6 md:p-8 space-y-4 h-full flex flex-col">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{testimonial.image}</span>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-primary font-semibold">{testimonial.amount}</p>
                      </div>
                    </div>
                    <p className="text-foreground/80 italic flex-grow">&quot;{testimonial.message}&quot;</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}