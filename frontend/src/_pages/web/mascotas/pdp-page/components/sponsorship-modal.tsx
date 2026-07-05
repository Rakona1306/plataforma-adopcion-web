"use client";

import { PetPublic } from "@/features/shelter/pet/model/pet-pub.model";
import { Modal, Stack, Group, Button } from "@mantine/core";
import { IoClose } from "react-icons/io5";

interface SponsorshipModalProps {
    pet?: PetPublic
}

export function SponsorshipModal({ pet }: SponsorshipModalProps) {
    if (!pet) {
        return null;
    }

    return (
        <></>
    );
}
