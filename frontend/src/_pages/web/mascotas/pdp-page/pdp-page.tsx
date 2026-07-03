"use client";

import useGetPetBySlug from "@/features/shelter/pet/hooks/use-get-pet-by-slug";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaSyringe, FaUsers } from "react-icons/fa";
import { LuZap } from "react-icons/lu";
import { MdPets } from "react-icons/md";
import { PdpSkeleton } from "./loading/pdp-skeleton";
import { AdoptionModal } from "./components/adoption-modal";
import { SponsorshipModal } from "./components/sponsorship-modal";
import { AuthModal } from "./components/auth-modal";
import { useSessionStore } from "@/core/infrastructure/store/useSessionStore";
import { companyInfo } from "@/app/(web)/_utils/data/companyInfo.data";
import { notSpace } from "@/core/shared/helpers/notSpace";
import { montserrat } from "@/lib/fonts/monserrat";
import useGetPetRecommend from "@/features/shelter/pet/hooks/use-get-pet-recommend";
import { RelatedPets } from "@/components/organisms/related-pets";
import { InfoIcon } from "lucide-react";
import { manrope } from "@/lib/fonts/manrope";
import { BsWhatsapp } from "react-icons/bs";
import { useModal } from "@/core/application/hooks/ui/useModal";

interface PetDeatilPageProps {
  slug: string;
}

export function PetDeatilPage({ slug }: PetDeatilPageProps) {
  const { data: pet, isLoading, isError } = useGetPetBySlug({ slug });
  const { data: petRecommend, isLoading: isLoadingRecommend, isError: isErrorRecommend } = useGetPetRecommend({ petId: pet?.id || "", specie: pet?.specie, breeds: pet?.breeds, traits: pet?.traits });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adoptionModalOpened, setAdoptionModalOpened] = useState(false);
  const [sponsorshipModalOpened, setSponsorshipModalOpened] = useState(false);
  const [authModalOpened, setAuthModalOpened] = useState(false);
  const { handleOpenModal } = useModal() || {}

  const user = useSessionStore((state) => state.user);

  const handleAdoptClick = () => {
    if (!user) {
      // setAuthModalOpened(true);
      handleOpenModal && handleOpenModal({
        header: 'Inicia sesión para continuar',
        content: <AuthModal />
      });
      return;
    }
    setAdoptionModalOpened(true);
  };

  const handleSponsorshipClick = () => {
    if (!user) {
      setAuthModalOpened(true);
      return;
    }
    setSponsorshipModalOpened(true);
  };

  if (isLoading) {
    return <PdpSkeleton />;
  }

  if (!pet || isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-16" style={{ backgroundColor: "var(--quaternary)" }}>
        <div className="text-6xl mb-4">🐾</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
          Mascota no encontrada
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--secondary)" }}>
          Lo sentimos, no pudimos encontrar esta mascota.
        </p>
        <Link
          href="/mascotas"
          className="px-8 py-3 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Volver a Mascotas
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pet.photoUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + pet.photoUrls.length) % pet.photoUrls.length,
    );
  };

  const getGenderLabel = (gender: string) => {
    return gender === "Macho" ? "♂️ Macho" : "♀️ Hembra";
  };

  const getRaceIcon = (raceName: string) => {
    return raceName === "Perro" ? "🐕" : "🐱";
  };

  return (
    <div className="min-h-screen py-8 md:py-16" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Link
          href="/mascotas"
          className="inline-flex items-center gap-2 font-semibold mb-8 transition-colors hover:opacity-70"
          style={{ color: "var(--primary)" }}
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
                <div
                  className="rounded-2xl md:rounded-3xl overflow-hidden aspect-square md:aspect-auto md:h-96 lg:h-125"
                  style={{ backgroundColor: "#F5F5F5" }}
                >
                  <img
                    src={
                      pet.photoUrls[currentImageIndex]?.url || "/placeholder.jpg"
                    }
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image Navigation */}
                {pet.photoUrls.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white shadow-lg transition-all duration-300 cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <BiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white shadow-lg transition-all duration-300 cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <BiChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white font-semibold text-sm">
                      {currentImageIndex + 1} / {pet.photoUrls.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {pet.photoUrls.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {pet.photoUrls.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(idx)}
                      className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300"
                      style={{
                        borderColor: idx === currentImageIndex ? "var(--primary)" : "var(--terciary)",
                        boxShadow: idx === currentImageIndex ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
                      }}
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

              <div className="space-y-4 pt-6 mt-6 border-t-2 border-gray-300">
                <p className={`text-base text-slate-600 flex items-center gap-2 font-medium ${montserrat.className}`}>
                  <InfoIcon />
                  <span>Para realizar alguna de estas 2 acciones se debe iniciar sesión.</span>
                </p>
                <button
                  onClick={handleAdoptClick}
                  className="w-full px-8 py-4 rounded-full cursor-pointer font-bold! text-lg text-white transition-all duration-300 hover:shadow-lg hover:opacity-90"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  Adoptar a {pet.name}
                </button>
                <button
                  onClick={handleSponsorshipClick}
                  id="apadrinar"
                  className={`w-full px-8 py-4 cursor-pointer rounded-full font-bold! text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90 bg-terciary text-slate-700 ${manrope.className}`}
                >
                  Apadrina a {pet.name}
                </button>
              </div>

              {pet.rescueStory && (
                <div className="mt-8 p-6 rounded-xl bg-gray-100">
                  <h2 className={`text-3xl font-bold flex gap-2 items-center mb-4 ${montserrat.className}`} style={{ color: "var(--primary)" }}>
                    <MdPets className="w-8 h-8" style={{ color: "var(--terciary)" }} />
                    <span>Mi historia</span>
                  </h2>
                  <p className="text-base leading-relaxed">
                    {pet.rescueStory}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pet Information */}
          <div className="space-y-6 md:space-y-8 text-slate-800">
            {/* Name and Basic Info */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{getRaceIcon(pet.specie.name)}</span>
                    <div>
                      <h1 className={`text-4xl md:text-5xl font-extrabold text-slate-800 ${montserrat.className}`}>
                        {pet.name}
                      </h1>
                      <p className="text-lg text-secondary font-semibold">
                        {pet.breeds.map((b) => b.name).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 bg-primary border-terciary transition-all duration-300 hover:scale-105">
                  <p className={`text-xs md:text-sm mb-2 font-semibold text-white ${montserrat.className}`}>
                    Edad
                  </p>
                  <p className="text-lg md:text-xl font-extrabold text-terciary">
                    {pet.age} {pet.age === 1 ? "año" : "años"}
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 bg-primary border-terciary transition-all duration-300 hover:scale-105">
                  <p className={`text-xs md:text-sm mb-2 font-semibold text-white ${montserrat.className}`}>
                    Género
                  </p>
                  <p className="text-lg md:text-xl font-extrabold text-terciary">
                    {getGenderLabel(pet.gender.value)}
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 bg-terciary border-primary transition-all duration-300 hover:scale-105">
                  <p className={`text-xs md:text-sm mb-2 font-semibold text-slate-700 ${montserrat.className}`}>
                    Peso
                  </p>
                  <p className="text-lg md:text-xl font-extrabold text-primary">
                    {pet.weightKg} kg
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 bg-terciary border-primary transition-all duration-300 hover:scale-105">
                  <p className={`text-xs md:text-sm mb-2 font-semibold text-slate-700 ${montserrat.className}`}>
                    Especie
                  </p>
                  <p className="text-lg md:text-xl font-extrabold text-primary">
                    {pet.specie.name}
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 bg-primary border-terciary transition-all duration-300 hover:scale-105">
                  <p className={`text-xs md:text-sm mb-2 font-semibold text-white ${montserrat.className}`}>
                    Vacunado
                  </p>
                  <p className="text-lg font-extrabold" style={{ color: pet.isVaccinated ? "#22c55e" : "#ef4444" }}>
                    {pet.isVaccinated ? "✓ Sí" : "✗ No"}
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 bg-primary border-terciary transition-all duration-300 hover:scale-105">
                  <p className={`text-xs md:text-sm mb-2 font-semibold text-white ${montserrat.className}`}>
                    Esterilizado
                  </p>
                  <p className="text-lg font-extrabold" style={{ color: pet.isSterilized ? "#22c55e" : "#ef4444" }}>
                    {pet.isSterilized ? "✓ Sí" : "✗ No"}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            {/* <div className="space-y-4 pt-6 border-t-2 border-gray-300">
              <button
                onClick={handleAdoptClick}
                className="w-full px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 hover:shadow-lg hover:opacity-90"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Adoptar a {pet.name}
              </button>
              <button
                onClick={handleSponsorshipClick}
                className="w-full px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:opacity-90"
                style={{ backgroundColor: "var(--terciary)", color: "var(--foreground)" }}
              >
                Apadrina a {pet.name}
              </button>
            </div> */}

            {/* Description */}
            {pet.description && (
              <div className="space-y-3 p-6 rounded-xl" style={{ backgroundColor: "#F5F5F5" }}>
                <h2 className={`text-2xl font-bold ${montserrat.className} text-primary`}>
                  Sobre {pet.name}
                </h2>
                <p className="text-base leading-relaxed text-slate-800" >
                  {pet.description}
                </p>
              </div>
            )}

            {/* Characteristics */}
            {pet.traits && pet.traits.length > 0 && (
              <div className="space-y-4 p-6 rounded-xl" style={{ backgroundColor: "#F5F5F5" }}>
                <h2 className={`text-2xl font-bold ${montserrat.className} text-primary`}>
                  Características
                </h2>
                <div className="flex flex-wrap gap-3">
                  {pet.traits.map((char) => (
                    <div
                      key={char.id}
                      className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 transition-all bg-gray-800`}
                    >
                      <LuZap className="w-4 h-4 text-yellow-400" />
                      <span className={`font-semibold text-white`}>
                        {char.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vaccines Info */}
            {pet.vaccines && pet.vaccines.length > 0 && (
              <div className="space-y-3 p-6 rounded-xl" style={{ backgroundColor: "#F5F5F5" }}>
                <h2 className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
                  Vacunas
                </h2>
                <div className="space-y-2">
                  {pet.vaccines.map((vaccine) => (
                    <div key={vaccine.id} className="flex items-center justify-between">
                      <span style={{ color: "var(--foreground)" }}>{vaccine.name}</span>
                      <FaSyringe style={{ color: "var(--terciary)" }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="p-6 rounded-xl border-2 text-center space-y-4" style={{ borderColor: "var(--terciary)", backgroundColor: "var(--quaternary)" }}>
              <FaUsers className="w-8 h-8 mx-auto" style={{ color: "var(--primary)" }} />
              <h3 className={`font-bold text-xl ${montserrat.className} text-primary`}>
                ¿Preguntas o dudas?
              </h3>
              <p className="text-base text-slate-800">
                Contáctanos para conocer más sobre {pet.name} y el proceso de adopción
              </p>
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/${notSpace(companyInfo.contact.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all hover:opacity-80 bg-primary text-white"
                >
                  <BsWhatsapp size={20} />
                  <span>Enviar Mensaje</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pets */}
        <RelatedPets
          data={petRecommend}
          isLoading={isLoadingRecommend}
          isError={isErrorRecommend}
        />
      </div>

      {/* Modals */}
      <AdoptionModal
        opened={adoptionModalOpened}
        onClose={() => setAdoptionModalOpened(false)}
        petName={pet?.name || ""}
      />
      <SponsorshipModal
        opened={sponsorshipModalOpened}
        onClose={() => setSponsorshipModalOpened(false)}
        petName={pet?.name || ""}
      />
    </div>
  );
}
