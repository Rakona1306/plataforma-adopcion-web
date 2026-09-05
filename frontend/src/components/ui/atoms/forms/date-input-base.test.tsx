import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DateInputBase } from "./date-input-base";
import MantineUIProvider from "@/core/infrastructure/providers/mantine-provider";

vi.mock("next/font/google", () => ({
  Manrope: () => ({
    className: "mocked-manrope-class",
    style: { fontFamily: "Manrope, sans-serif" },
  }),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("DateInputBase Component", () => {
  it("renderiza correctamente con los valores por defecto (placeholder y formato)", () => {
    render(
      <MantineUIProvider>
        <DateInputBase value={null} onChange={vi.fn()} />
      </MantineUIProvider>,
    );

    const input = screen.getByPlaceholderText("Selecciona una fecha");
    expect(input).toBeDefined();
  });

  it("renderiza el valor de fecha proporcionado", () => {
    const testDate = new Date(2026, 4, 15);
    render(
      <MantineUIProvider>
        <DateInputBase value={testDate} onChange={vi.fn()} />
      </MantineUIProvider>,
    );

    const input = screen.getByDisplayValue("15/05/2026");
    expect(input).toBeDefined();
  });

  it("muestra un mensaje de error cuando se proporciona la prop error", () => {
    render(
      <MantineUIProvider>
        <DateInputBase
          value={null}
          onChange={vi.fn()}
          error="Fecha requerida"
        />
      </MantineUIProvider>,
    );

    expect(screen.getByText("Fecha requerida")).toBeDefined();
  });

  it("respeta las props personalizadas como placeholder y formato", () => {
    render(
      <MantineUIProvider>
        <DateInputBase
          value={null}
          onChange={vi.fn()}
          placeholder="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
        />
      </MantineUIProvider>,
    );

    const input = screen.getByPlaceholderText("YYYY-MM-DD");
    expect(input).toBeDefined();
  });
});
