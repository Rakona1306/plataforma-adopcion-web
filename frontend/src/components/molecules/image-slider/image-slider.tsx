// src/components/molecules/image-slider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { PetPhotoResponse } from "@/features/shelter/pet-photos/dto/pet-photo-response";
import './image-slider.css'

// Estilos obligatorios de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageSliderProps {
    photos: PetPhotoResponse[];
    petName: string;
}

export default function ImageSlider({ photos, petName }: ImageSliderProps) {
    return (
        <div className="w-full relative px-2 py-4 custom-swiper-container">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16} // Espacio de 4 (gap-4 de Tailwind) entre tarjetas
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                // 📱 CONFIGURACIÓN RESPONSIVA (Breakpoints de Swiper)
                breakpoints={{
                    0: {
                        slidesPerView: 1, // Celulares pequeños
                    },
                    576: {
                        slidesPerView: 2, // Tablets / sm
                    },
                    768: {
                        slidesPerView: 3, // Laptops / md
                    },
                    1024: {
                        slidesPerView: 4, // Escritorios / lg
                    },
                }}
                className="w-full"
            >
                {photos.map((photo) => (
                    <SwiperSlide key={photo.id}> {/* Espacio inferior para las balas de paginación */}
                        <div className="group relative aspect-square w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all duration-300 hover:shadow-md hover:border-slate-300">
                            <img
                                src={photo.url}
                                alt={`Foto de ${petName}`}
                                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}