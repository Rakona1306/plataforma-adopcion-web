import Title from "@/app/(web)/_components/atoms/title";
import ButtonUI from "@/components/ui/atoms/button/button-ui";

interface BannerVoluntariadoProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function BannerVoluntariado({
  title = "Sé un héroe para ellos",
  subtitle = "Únete a nuestro equipo de voluntarios y ayuda a transformar la vida de perros rescatados",
  ctaText = "Quiero ser voluntario",
  ctaHref = "#seccion-voluntariado",
}: BannerVoluntariadoProps) {
  return (
    <section
      aria-label="Banner principal de voluntariado"
      className="relative w-full group"
    >
      <img
        className="aspect-4/3 md:aspect-8/3 object-cover w-full"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width={1600}
        height={900}
        src="/voluntariado/voluntariadoDesktop.jpg"
        alt="Voluntarios felices alimentando y jugando con perros rescatados en el albergue Adopta Salva Vidas"
      />

      {/* Sombra negra para contraste y legibilidad del texto */}
      <div
        className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"
        aria-hidden="true"
      />

      {/* Contenido semántico sobre el banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-4 md:gap-10">
        <Title htmlTag="h1" className="text-terciary">
          {title}
        </Title>
        <p className="text-white text-base md:text-xl max-w-2xl drop-shadow-md">
          {subtitle}
        </p>

        <ButtonUI href={ctaHref}>{ctaText}</ButtonUI>
        {/*
                <Link
                    href={ctaHref}
                    className="mt-6 inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    scroll={false}
                >

                </Link>*/}
      </div>
    </section>
  );
}
