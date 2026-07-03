'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PetPublic } from '@/features/shelter/pet/model/pet-pub.model';
import { PetCard } from '@/app/(web)/_components/atoms/card/pet-card-item';
import { montserrat } from '@/lib/fonts/monserrat';

interface RelatedPetsProps {
    data?: PetPublic[];
    isLoading: boolean;
    isError: boolean;
}

export function RelatedPets({ data, isLoading, isError }: RelatedPetsProps) {
    if (isLoading) {
        return (
            <div className="mt-20 space-y-8">
                <h2 className={`text-3xl md:text-4xl font-extrabold text-center text-slate-800 ${montserrat.className}`}>
                    Otras <span style={{ color: "var(--primary)" }}>Mascotas</span> que te Podrían
                    <br />
                    Gustar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-20 space-y-8">
                <h2 className={`text-3xl md:text-4xl font-extrabold text-center text-slate-800 ${montserrat.className}`}>
                    Otras <span style={{ color: "var(--primary)" }}>Mascotas</span> que te Podrían
                    <br />
                    Gustar
                </h2>
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        No pudimos cargar las recomendaciones
                    </h3>
                    <p className="text-slate-600 mb-6">
                        Por favor, intenta recargar la página
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 rounded-full font-semibold text-white transition-all hover:opacity-80"
                        style={{ backgroundColor: "var(--primary)" }}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="mt-20 space-y-8">
                <h2 className={`text-3xl md:text-4xl font-extrabold text-center text-slate-800 ${montserrat.className}`}>
                    Otras <span style={{ color: "var(--primary)" }}>Mascotas</span> que te Podrían
                    <br />
                    Gustar
                </h2>
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-6xl mb-4">🐾</div>
                    <h3 className="text-xl font-semibold text-slate-800">
                        No hay mascotas recomendadas
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-20 space-y-8">
            <h2 className={`text-3xl md:text-4xl font-extrabold text-center text-slate-800 ${montserrat.className}`}>
                Otras <span style={{ color: "var(--primary)" }}>Mascotas</span> que te Podrían
                <br />
                Gustar
            </h2>

            <div className="relative px-4 md:px-0">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: '.swiper-button-next-related',
                        prevEl: '.swiper-button-prev-related',
                    }}
                    pagination={{
                        el: '.swiper-pagination-related',
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    spaceBetween={24}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.2,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="related-pets-swiper"
                >
                    {data.map((pet) => (
                        <SwiperSlide key={pet.id} className="h-auto">
                            <PetCard {...pet} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons */}
                <button
                    className="swiper-button-prev-related absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 z-10 p-2 rounded-full text-white shadow-lg transition-all hover:opacity-80 hidden md:flex items-center justify-center w-10 h-10"
                    style={{ backgroundColor: "var(--primary)" }}
                >
                    ←
                </button>
                <button
                    className="swiper-button-next-related absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 z-10 p-2 rounded-full text-white shadow-lg transition-all hover:opacity-80 hidden md:flex items-center justify-center w-10 h-10"
                    style={{ backgroundColor: "var(--primary)" }}
                >
                    →
                </button>

                {/* Pagination Dots */}
                <div className="swiper-pagination-related flex justify-center mt-8 gap-2" />
            </div>
        </div>
    );
}
