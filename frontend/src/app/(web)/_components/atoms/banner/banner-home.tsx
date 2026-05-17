
import Link from "next/link";
import Title from "../title";
import { GiSittingDog } from "react-icons/gi";
import { BannerHomeItem } from "@/core/shared/utils/web/data/banner.data";

interface BannerHomeProps {
  item: BannerHomeItem;
  className?: string;
  imgClassName?: string;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  adopcion: { bg: "bg-orange-500/20", text: "text-orange-600", border: "border-orange-400" },
  donacion: { bg: "bg-red-500/20", text: "text-red-600", border: "border-red-400" },
  voluntariado: { bg: "bg-blue-500/20", text: "text-blue-600", border: "border-blue-400" },
  seguimiento: { bg: "bg-green-500/20", text: "text-green-600", border: "border-green-400" },
};

const categoryLabels: Record<string, string> = {
  adopcion: "Adopción",
  donacion: "Donación",
  voluntariado: "Voluntariado",
  seguimiento: "Seguimiento",
};

export default function BannerHome({
  item,
  className = "",
  imgClassName = "brightness-50",
}: BannerHomeProps) {
  const colors = categoryColors[item.category];

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 text-center text-white">
        {/* Category Badge */}
        <div
          className={`mb-6 px-4 py-2 rounded-full border-2 ${colors.bg} ${colors.text} ${colors.border} font-semibold text-sm md:text-base backdrop-blur-sm inline-block`}
        >
          {categoryLabels[item.category]}
        </div>

        {/* Main Title */}
        <Title htmlTag="h1" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight text-balance drop-shadow-lg text-white">
          {item.title}
        </Title>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl font-light mb-6 md:mb-8 text-gray-100 drop-shadow-md max-w-3xl text-balance">
          {item.subtitle}
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-200 mb-8 md:mb-10 max-w-2xl leading-relaxed drop-shadow-md">
          {item.description}
        </p>

        {/* CTA Button */}
        <Link
          href={item.ctaLink}
          className="group inline-flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <GiSittingDog size={30} />
          <span>{item.cta}</span>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
