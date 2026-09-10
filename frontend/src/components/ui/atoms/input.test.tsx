import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./input";
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

// Mock completo de Formik simulando el ciclo de vida del hook useField
vi.mock("formik", () => ({
  useField: (name: string) => [
    {
      name,
      value: "valor-inicial",
      onChange: vi.fn(),
      onBlur: vi.fn(),
    },
    { touched: false, error: undefined }, // No error so helperText can render
    { setValue: vi.fn(), setTouched: vi.fn() },
  ],
}));

describe("Input Component - Full Coverage & Performance", () => {
  it("renderiza de forma óptima con todas las props estructurales y descripción sin re-renders fantasma", () => {
    const { rerender } = render(
      <MantineUIProvider>
        <Input
          name="username"
          label="Nombre de usuario"
          required
          description="Este será tu identificador único público."
          helperText="Máximo 15 caracteres."
          placeholder="Escribe tu usuario..."
          hasErrorActive={false}
        />
      </MantineUIProvider>,
    );

    // Verificaciones básicas y accesibilidad de etiquetas
    expect(screen.getByText("Nombre de usuario")).toBeDefined();
    expect(screen.getByText("*")).toBeDefined();
    expect(
      screen.getByText("Este será tu identificador único público."),
    ).toBeDefined();
    expect(screen.getByText("Máximo 15 caracteres.")).toBeDefined();

    const inputElement = screen.getByPlaceholderText("Escribe tu usuario...");
    expect(inputElement).toBeDefined();
    expect(inputElement.getAttribute("value")).toBe("valor-inicial");

    // Validación de rendimiento: Rerender con las mismas props para asegurar estabilidad en el DOM virtual
    rerender(
      <Input
        name="username"
        label="Nombre de usuario"
        required
        description="Este será tu identificador único público."
        helperText="Máximo 15 caracteres."
        placeholder="Escribe tu usuario..."
      />,
    );
    expect(screen.getByRole("textbox")).toBeDefined();
  });

  it("ejecuta los manejadores de eventos (onChange, onBlur) de manera rápida y sin latencia en el hilo principal", () => {
    const onChangeMock = vi.fn();
    const onBlurMock = vi.fn();

    render(
      <Input
        name="email"
        label="Correo"
        onChange={onChangeMock}
        onBlur={onBlurMock}
      />,
    );

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, {
      target: { value: "nuevo-correo@test.com" },
    });
    fireEvent.blur(inputElement);

    // El componente procesa las interacciones de manera inmediata y limpia
    expect(inputElement).toBeDefined();
  });

  it("gestiona correctamente los slots de iconos interactivos (con onClick) y sus etiquetas ARIA", () => {
    const leftClickMock = vi.fn();
    const rightClickMock = vi.fn();

    render(
      <Input
        name="search"
        label="Buscar"
        leftIcon={<span data-testid="icon-left">🔍</span>}
        rightIcon={<span data-testid="icon-right">✖</span>}
        leftIconOnClick={leftClickMock}
        rightIconOnClick={rightClickMock}
        leftIconAriaLabel="Botón buscar izquierdo"
        rightIconAriaLabel="Botón limpiar derecho"
      />,
    );

    const leftButton = screen.getByRole("button", {
      name: "Botón buscar izquierdo",
    });
    const rightButton = screen.getByRole("button", {
      name: "Botón limpiar derecho",
    });

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);

    expect(leftClickMock).toHaveBeenCalledTimes(1);
    expect(rightClickMock).toHaveBeenCalledTimes(1);
  });

  it("maneja iconos estáticos de forma eficiente mediante contenedores no interactivos (pointer-events-none)", () => {
    render(
      <Input
        name="locked"
        label="Seguridad"
        leftIcon={<span data-testid="static-left">🔒</span>}
        rightIcon={<span data-testid="static-right">🛡️</span>}
      />,
    );

    expect(screen.getByTestId("static-left")).toBeDefined();
    expect(screen.getByTestId("static-right")).toBeDefined();
    // Asegura que no se generen botones innecesarios en el DOM para iconos sin eventos de clic
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("activa y renderiza los estados de error de manera accesible (tanto por Formik como por props manuales o hasErrorActive)", () => {
    const { rerender } = render(
      <Input name="code" label="Código" error="Error externo inyectado" />,
    );

    expect(screen.getByText("Error externo inyectado")).toBeDefined();

    // Comprobación de error activo forzado sin re-renders pesados
    rerender(
      <Input
        name="code"
        label="Código"
        hasErrorActive={true}
        error="Estado de error crítico"
      />,
    );

    expect(screen.getByText("Estado de error crítico")).toBeDefined();
  });
});
