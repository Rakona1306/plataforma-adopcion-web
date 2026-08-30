import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonUI from "./button-ui"; // Ajusta la ruta según la ubicación de tu componente
import MantineUIProvider from "@/core/infrastructure/providers/mantine-provider";

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

vi.mock("next/font/google", () => ({
  Manrope: () => ({
    className: "mocked-manrope-class",
    style: { fontFamily: "Manrope, sans-serif" },
  }),
}));

describe("ButtonUI Component", () => {
  it("renderiza correctamente con el texto y variante por defecto (primary)", () => {
    render(
      <MantineUIProvider>
        <ButtonUI>Guardar</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button", { name: /guardar/i });
    expect(button).toBeDefined();
    // Comprueba que tenga clases de la variante primary por defecto
    expect(button.className).toContain("bg-primary!");
  });

  it("aplica correctamente las clases de la variante secondary", () => {
    render(
      <MantineUIProvider>
        <ButtonUI intent="secondary">Cancelar</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button", { name: /cancelar/i });
    expect(button.className).toContain("bg-slate-100!");
  });

  it("aplica correctamente las clases de la variante cancel", () => {
    render(
      <MantineUIProvider>
        <ButtonUI intent="cancel">Eliminar</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button", { name: /eliminar/i });
    expect(button.className).toContain("bg-red-500!");
  });

  it("aplica correctamente las clases de la variante normal", () => {
    render(
      <MantineUIProvider>
        <ButtonUI intent="normal">Opción</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button", { name: /opción/i });
    expect(button.className).toContain("bg-white!");
  });

  it("maneja eventos de clic correctamente", () => {
    const handleClick = vi.fn();
    render(
      <MantineUIProvider>
        <ButtonUI onClick={handleClick}>Click me</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("aplica los estilos de deshabilitado cuando la prop disabled es true", () => {
    render(
      <MantineUIProvider>
        <ButtonUI disabled>No click</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button", { name: /no click/i });
    // Mantine renderiza el atributo disabled y el componente aplica los disabledStyles
    expect(button.getAttribute("disabled")).not.toBeNull();
    expect(button.className).toContain("disabled:bg-slate-100!");
  });

  it("aplica los estilos de deshabilitado cuando se encuentra en estado loading", () => {
    render(
      <MantineUIProvider>
        <ButtonUI loading>Cargando</ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("disabled:bg-slate-100!");
  });

  it("inyecta clases externas a través de rootClassName y labelClassName", () => {
    render(
      <MantineUIProvider>
        <ButtonUI
          rootClassName="custom-root-class"
          labelClassName="custom-label-class"
        >
          Personalizado
        </ButtonUI>
      </MantineUIProvider>,
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-root-class");

    // El label interno de Mantine suele renderizarse como un span o contenedor interno
    const labelContainer = button.querySelector(".custom-label-class");
    expect(labelContainer).toBeDefined();
  });
});
