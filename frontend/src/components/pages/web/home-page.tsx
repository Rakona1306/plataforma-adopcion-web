"use client"

import BannerHome from "@/app/(web)/_components/atoms/banner/banner-home";
import AboutSection from "@/app/(web)/_components/organisms/sections/about-section";
import AdoptProccess from "@/app/(web)/_components/organisms/sections/adopt-proccess";
import AdoptionIntro from "@/app/(web)/_components/organisms/sections/adoption-intro";
import PetsSection from "@/app/(web)/_components/organisms/sections/pets-section";
import SponsorshipSection from "@/app/(web)/_components/organisms/sections/sponsorship-section";
import SwiperUI from "@/app/(web)/_components/organisms/swiper-ui";
import { bannerData, BannerHomeItem } from "@/shared/utils/web/data/banner.data";

export default function HomePage() {
  return (
    <>
      <SwiperUI<BannerHomeItem>
        data={bannerData.items}
        renderItem={(item) => <BannerHome item={item} imgClassName="brightness-50" />}
      />

      <AdoptionIntro />

      <PetsSection />

      <AdoptProccess />

      <SponsorshipSection />

      <AboutSection />
    </>
  );
}
