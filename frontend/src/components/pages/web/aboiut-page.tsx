"use server";

import AboutSection from "@/app/(web)/_components/organisms/sections/about-section";
import AdoptProccess from "@/app/(web)/_components/organisms/sections/adopt-proccess";
import AdoptionIntro from "@/app/(web)/_components/organisms/sections/adoption-intro";

export default async function NosotrosPage() {

  return (
    <>
      <AboutSection />

      <AdoptionIntro />

      <AdoptProccess />
    </>
  );
}
