"use server";

import AboutSection from "@/app/(web)/_components/organisms/sections/about-section";
import AdoptProccess from "@/app/(web)/_components/organisms/sections/adopt-proccess";
import AdoptionIntro from "@/app/(web)/_components/organisms/sections/adoption-intro";
import { GetRolesUseCase } from "@/core/domain/use-cases/organization/roles/getRolesUseCase";
import { roleRepositoryImpl } from "@/core/infrastructure/container/organization/role-container";

export default async function NosotrosPage() {
  try {
    const useCase =
      new GetRolesUseCase(roleRepositoryImpl);

    const roles =
      await useCase.execute();

    console.log('ROLES: ', roles);
  } catch (error) {
    console.log('ERROR: ', error);
  }

  return (
    <>
      <AboutSection />

      <AdoptionIntro />

      <AdoptProccess />
    </>
  );
}
