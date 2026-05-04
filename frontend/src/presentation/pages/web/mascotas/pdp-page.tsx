"use client";

import Button from "@/app/(web)/_components/atoms/button/button";
import { PetCardItem } from "@/app/(web)/_components/atoms/card/pet-card-item";
import Title from "@/app/(web)/_components/atoms/title";
import { petsData } from "@/app/(web)/_utils/data/pets.data";
import { usePet } from "@/application/hooks/pet/usePet";
import Input from "@/presentation/atoms/input";
import FormContainer from "@/presentation/molecules/form-container";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight, BiHeart } from "react-icons/bi";
import { FaSyringe, FaUsers } from "react-icons/fa";
import { LuZap } from "react-icons/lu";
import { MdPets } from "react-icons/md";

interface PetDeatilPageProps {
  petId: number;
}

export default function PetDeatilPage({ petId }: PetDeatilPageProps) {
  const { pet } = usePet(petId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!pet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-primary/5 flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🐾</div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Mascota no encontrada
        </h1>
        <p className="text-lg text-foreground/70 mb-8">
          Lo sentimos, no pudimos encontrar esta mascota.
        </p>
        <Link
          href="/mascotas"
          className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          Volver a Mascotas
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pet.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + pet.images.length) % pet.images.length,
    );
  };

  const getGenderLabel = (gender: string) => {
    return gender === "Macho" ? "♂️ Macho" : "♀️ Hembra";
  };

  const getRaceIcon = (raceName: string) => {
    return raceName === "Perro" ? "🐕" : "🐱";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-primary/5 py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link
          href="/mascotas"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-8 transition-colors"
        >
          <BiChevronLeft className="w-5 h-5" />
          Volver al Listado
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 justify-stretch">
          {/* Image Gallery */}
          <div className="space-y-4 h-full">
            {/* Main Image */}
            <div className="sticky top-20 left-0 h-fit">
              <div className="relative group">
                <div className="bg-gray-200 rounded-2xl md:rounded-3xl overflow-hidden aspect-square md:aspect-auto md:h-96 lg:h-125">
                  <img
                    src={
                      pet.images[currentImageIndex]?.url || "/placeholder.jpg"
                    }
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation */}
                {pet.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary hover:bg-secondary shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <BiChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary hover:bg-secondary shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <BiChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white font-semibold text-sm">
                      {currentImageIndex + 1} / {pet.images.length}
                    </div>
                  </>
                )}

                {/* Favorite Button */}
                {/* <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300"
              >
                <BiHeart
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isFavorite ? 'fill-primary text-primary' : 'text-gray-400'
                  }`}
                />
              </button> */}
              </div>

              {/* Thumbnails */}
              {pet.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {pet.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        idx === currentImageIndex
                          ? "border-primary shadow-lg"
                          : "border-primary/20 hover:border-primary/40"
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`${pet.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {pet.history && (
                <div className="mt-5 space-y-5">
                  <h2 className="text-4xl font-bold text-primary flex gap-2 items-center">
                    <MdPets className="text-terciary" />
                    <span>Mi historia</span>
                  </h2>

                  <p className="text-gray-600">{pet.history}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pet Information */}
          <div className="space-y-6 md:space-y-8">
            {/* Name and Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">
                      {getRaceIcon(pet.race.name)}
                    </span>
                    <Title className="text-4xl! md:text-5xl! font-bold text-slate-800">
                      {pet.name}
                    </Title>
                  </div>
                  <p className="text-xl text-gray-400">{pet.breed}</p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-xs md:text-sm text-slate-800 mb-1">Edad</p>
                  <p className="text-lg md:text-xl font-bold text-primary">
                    {pet.age} {pet.age === 1 ? "año" : "años"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-xs md:text-sm text-slate-800 mb-1">
                    Género
                  </p>
                  <p className="text-lg md:text-xl font-bold text-primary">
                    {getGenderLabel(pet.gender)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-xs md:text-sm text-slate-800 mb-1">
                    Vacunación
                  </p>
                  <div className="flex items-center gap-2">
                    <FaSyringe className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-600">Al Día</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-xs md:text-sm text-slate-800 mb-1">Raza</p>
                  <p className="font-bold text-blue-600 text-lg">
                    {pet.race.name}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-6 border-t-2 border-primary/10">
              <Button
                containerClassName="w-full"
                spaceClassName="bg-gray-100!"
                href=""
                className="w-full px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 "
              >
                Adoptar a {pet.name}
              </Button>
              <Button
                containerClassName="w-full"
                spaceClassName="bg-gray-100!"
                className="w-full px-8 py-4 bg-white before:bg-terciary! text-terciary border-2 border-terciary rounded-full font-bold text-lg transition-all duration-300"
              >
                Apadrina a {pet.name}
              </Button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-800">
                Sobre {pet.name}
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                {pet.description}
              </p>
            </div>

            {/* Characteristics */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-slate-800">
                Características
              </h2>
              <div className="flex flex-wrap gap-3">
                {pet.characteristics.map((char) => (
                  <div
                    key={char.id}
                    className="px-4 py-3 rounded-full bg-primary/10 border border-primary/30 flex items-center gap-2"
                  >
                    <LuZap className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-slate-800">
                      {char.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Race Description */}
            <div className="space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <h2 className="text-xl font-bold text-slate-800">
                {pet.race.name}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {pet.race.description}
              </p>
            </div>

            {/* Contact CTA */}
            <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-center space-y-3">
              <FaUsers className="w-8 h-8 text-blue-600 mx-auto" />
              <h3 className="font-bold text-slate-800">¿Preguntas?</h3>
              <p className="text-sm text-slate-700">
                Contáctanos para conocer más sobre {pet.name} y el proceso de
                adopción
              </p>
              <div className="flex justify-center">
                <Button
                  href="https://wa.me/1234567890"
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

        {/* <div className="mt-10 ">
          <Title htmlTag="h3" className="text-center mb-5 text-slate-800">
            Apadrinar a <span className="text-primary">{pet.name}</span>
          </Title>
          <section className="flex gap-5">
            <FormContainer
              initialValues={{
                name: "",
                email: "",
                amount: 0,
                pet: pet.id,
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              containerClassName="w-full bg-white border-slate-500 py-8 px-4 rounded-lg"
            >
              <Input
                name="name"
                label="Nombre Completo"
                placeholder="Juan Perez Hidalgo"
              />
            </FormContainer>

            <div className="w-full"></div>
          </section>
        </div> */}

        {/* Related Pets */}
        <div className="mt-20 space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">
            Otras <span className="text-primary">Mascotas</span> que te Podrían
            Gustar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {petsData
              .filter((p) => p.id !== pet.id && p.race.name === pet.race.name)
              .slice(0, 3)
              .map((relatedPet) => (
                <PetCardItem key={relatedPet.id} pet={relatedPet} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
