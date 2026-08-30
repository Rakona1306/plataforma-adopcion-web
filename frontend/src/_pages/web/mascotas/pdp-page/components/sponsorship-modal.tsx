"use client";

import { PetPublic } from "@/features/shelter/pet/model/pet-pub.model";

interface SponsorshipModalProps {
  pet?: PetPublic;
}

export function SponsorshipModal({ pet }: SponsorshipModalProps) {
  if (!pet) {
    return null;
  }

  return <></>;
}
