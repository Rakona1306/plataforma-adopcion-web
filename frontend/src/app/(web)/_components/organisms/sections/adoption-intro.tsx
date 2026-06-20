
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RxCaretRight } from "react-icons/rx";
import Button from "../../atoms/button/button";
import Title from "../../atoms/title";
import { socialLinks } from "@/app/(web)/_utils/data/socialLinks";
import Container from "@/components/atoms/container";
import Tag from "@/components/atoms/tag";

export default function AdoptionIntro() {
  return (
    <>
      <section>
        <Container>
          <section className="w-full py-10 pb-20 flex gap-5 items-center md:flex-row flex-col">
            <div className="space-y-5 w-full md:w-1/2">
              <Tag className="flex items-center gap-2 py-3 px-6">
                <span className="leading-none">Transforma tu vida </span>
                <FaStar />
              </Tag>

              <div className="space-y-5">
                <Title  
                  htmlTag='h1'
                  className=" font-bold text-slate-800"
                >
                  Encuentra tu{" "}
                  <span className="text-primary">compañero perfecto</span>
                </Title>

                <p className="text-lg/[1.6] text-gray-500">
                  Miles de mascotas adorables esperan un hogar lleno de amor.
                  Cada adopción salva una vida y abre el corazón a una nueva
                  amistad que durará toda la vida.
                </p>

                <div className="flex items-center gap-3">
                  <Button href="/mascotas" className="hover:text-white">
                    <span className="relative z-10">Ver mascotas</span>
                    <RxCaretRight className="relative z-10" />
                  </Button>

                  <Button href="/nosotros" className="hover:text-white border-terciary before:bg-terciary! text-terciary">
                    <span className="relative z-10">Quienes somos</span>
                    <RxCaretRight className="relative z-10" />
                  </Button>
                </div>
              </div>

              <div className="border-t-[0.5px] border-slate-400/50 py-5">
                <div>
                  <Title htmlTag="h3" className="font-bold text-2xl! text-slate-800">
                    Siguenos en nuestras{" "}
                    <span className="text-primary ">redes sociales</span>
                  </Title>
                  <div className="mt-5 flex gap-4 flex-wrap">
                    {socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-primary transition-colors duration-300"
                      >
                        {link.icon({ size: 34 })}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 flex justify-center">
              <div className="w-fit relative max-lg:before:hidden before:absolute before:inset-0 before:bg-terciary before:-bottom-8 before:-right-10 before:top-10 before:left-10 before:z-10 before:rounded-2xl">
                <img
                  src="/home/aside.jpg"
                  alt="Aside"
                  className=" rounded-2xl relative z-20"
                />
              </div>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}
