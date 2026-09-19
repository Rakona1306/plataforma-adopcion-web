import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VolunteerCard } from "./volunteer-card";
import { mockApplication } from "@/__mocks__/volunteer.mock";
import { render } from "@/test/test-utils";

const urgencyStyles = {
  HIGH: "bg-orange-100 text-orange-700 border-orange-300",
};

describe("VolunteerCard", () => {
  it("debería renderizar los detalles de la aplicación correctamente", () => {
    render(
      <VolunteerCard
        application={mockApplication}
        urgencyStyles={urgencyStyles}
      />,
    );

    // Verificar textos principales
    expect(screen.getByText("Limpieza de Playa")).toBeInTheDocument();
    expect(screen.getByText("Cuidando el océano")).toBeInTheDocument();
    expect(
      screen.getByText("Ayúdanos a limpiar la costa."),
    ).toBeInTheDocument();

    // Verificar botones
    expect(
      screen.getByRole("button", { name: /Mas informacion/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Postular ahora/i }),
    ).toBeInTheDocument();
  });

  it("debería renderizar el enlace de Google Maps si existe la dirección", () => {
    render(
      <VolunteerCard
        application={mockApplication}
        urgencyStyles={urgencyStyles}
      />,
    );

    const mapLink = screen.getByRole("link", {
      name: /Dirección en Google Map/i,
    });
    expect(mapLink).toBeInTheDocument();
    expect(mapLink).toHaveAttribute("href", "https://maps.google.com/?q=playa");
    expect(mapLink).toHaveAttribute("target", "_blank");
  });

  it("no debería renderizar el enlace de Google Maps si no hay dirección", () => {
    const appWithoutMap = { ...mockApplication, googleMapLinkAddress: null };
    render(
      <VolunteerCard
        application={appWithoutMap as any}
        urgencyStyles={urgencyStyles}
      />,
    );

    expect(
      screen.queryByRole("link", { name: /Dirección en Google Map/i }),
    ).not.toBeInTheDocument();
  });
});
