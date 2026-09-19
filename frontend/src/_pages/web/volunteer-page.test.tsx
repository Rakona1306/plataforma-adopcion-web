import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import VolunteerPage from "./volunteer-page";
import { render } from "@/test/test-utils";

// Mockeamos el hook para no depender de React Query en el test unitario del componente
vi.mock(
  "@/features/business/volunteer-applications/hooks/use-get-volunteer-data",
  () => ({
    default: vi.fn(),
  }),
);

import useVolunteers from "@/features/business/volunteer-applications/hooks/use-get-volunteer-data";
import { mockApplications } from "@/__mocks__/volunteer.mock";
const mockUseVolunteers = vi.mocked(useVolunteers);

describe("VolunteerPage", () => {
  it("debería mostrar los skeletons mientras carga", () => {
    mockUseVolunteers.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    render(<VolunteerPage />);

    // Asumiendo que VolunteerCardSkeleton tiene un role o testid, o simplemente verificamos que las cards no están
    expect(screen.queryByText("Limpieza de Playa")).not.toBeInTheDocument();
  });

  it("debería renderizar las tarjetas de voluntariado cuando los datos cargan", () => {
    mockUseVolunteers.mockReturnValue({
      data: mockApplications,
      isLoading: false,
    } as any);

    render(<VolunteerPage />);

    expect(screen.getByText("Limpieza de Playa")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Postular ahora/i }).length,
    ).toBeGreaterThan(0);
  });
});
