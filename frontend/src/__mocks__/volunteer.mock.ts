import { VolunteerApplicationResponse } from "@/features/business/volunteer-applications/dto/volunter-application-response";

export const mockApplication: VolunteerApplicationResponse = {
  title: "Limpieza de Playa",
  subtitle: "Cuidando el océano",
  description: "Ayúdanos a limpiar la costa.",
  requirements: "Ganas de ayudar",
  minAge: 18,
  maxAge: 60,
  address: "Playa Principal, Ciudad",
  googleMapLinkAddress: "https://maps.google.com/?q=playa",
  startDate: "2026-10-01",
  endDate: "2026-10-02",
  contactEmail: "test@test.com",
  contactPhone: "+123456789",
  isCertificated: true,
  urgency: "HIGH",
};

export const mockApplications = [mockApplication];
