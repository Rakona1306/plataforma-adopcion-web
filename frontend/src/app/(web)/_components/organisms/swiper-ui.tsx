"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { AutoplayOptions, NavigationOptions } from "swiper/types";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function SwiperUI<T>({
  data,
  renderItem,
  slideClassName,
  spaceBetween = 30,
  slidesPerView = 1,
  navigation = true,
  autoplay = { delay: 4000, disableOnInteraction: false },
  showCustomNav = true,
}: SwiperUIProps<T>) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  return (
    <div className="relative w-full group">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={showCustomNav ? false : navigation}
        pagination={{
          clickable: true,
          el: ".swiper-custom-pagination",
          renderBullet: (index, className) => {
            return `<button class="${className} custom-pagination-bullet" data-index="${index}"></button>`;
          },
        }}
        autoplay={autoplay}
        loop={true}
        onSwiper={setSwiperInstance}
        className="relative"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className={slideClassName}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showCustomNav && (
        <>
          {/* Custom Navigation Arrows */}
          <button
            ref={prevRef}
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group-hover:opacity-100 opacity-0 md:opacity-70"
            aria-label="Slide anterior"
          >
            <BiChevronLeft className="w-6 h-6" />
          </button>

          <button
            ref={nextRef}
            onClick={() => swiperInstance?.slideNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group-hover:opacity-100 opacity-0 md:opacity-70"
            aria-label="Siguiente slide"
          >
            <BiChevronRight className="w-6 h-6" />
          </button>

          {/* Custom Pagination Dots */}
          <div className="swiper-custom-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3 items-center justify-center">
            {/* Se rellena con renderBullet */}
          </div>

          <style jsx global>{`
            .custom-pagination-bullet {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: rgba(255, 255, 255, 0.5);
              border: 2px solid rgba(255, 255, 255, 0.8);
              cursor: pointer;
              transition: all 0.3s ease;
              padding: 0;
              outline: none;
            }

            .custom-pagination-bullet:hover {
              background-color: rgba(255, 255, 255, 0.7);
              transform: scale(1.2);
            }

            .custom-pagination-bullet.swiper-pagination-bullet-active {
              background-color: #fff;
              width: 32px;
              border-radius: 6px;
              border-color: #fff;
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
          `}</style>
        </>
      )}
    </div>
  );
}

interface SwiperUIProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slideClassName?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  navigation?: boolean | NavigationOptions | undefined;
  autoplay?: boolean | AutoplayOptions | undefined;
  showCustomNav?: boolean;
}
