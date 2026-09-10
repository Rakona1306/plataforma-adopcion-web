import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Alert } from "./alert";

describe("Alert Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza correctamente el mensaje y el tipo por defecto (info)", () => {
    render(<Alert type="info" message="Este es un mensaje de prueba" />);

    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Este es un mensaje de prueba")).toBeDefined();
  });

  it("renderiza el título cuando es proporcionado", () => {
    render(
      <Alert type="success" title="¡Éxito!" message="Operación completada" />,
    );

    expect(screen.getByText("¡Éxito!")).toBeDefined();
    expect(screen.getByText("Operación completada")).toBeDefined();
  });

  it("muestra el icono por defecto según el tipo", () => {
    const { rerender } = render(<Alert type="success" message="Test" />);
    expect(screen.getByText("✓")).toBeDefined();

    rerender(<Alert type="error" message="Test" />);
    expect(screen.getByText("✕")).toBeDefined();

    rerender(<Alert type="warning" message="Test" />);
    expect(screen.getByText("⚠")).toBeDefined();

    rerender(<Alert type="info" message="Test" />);
    expect(screen.getByText("i")).toBeDefined();
  });

  it("no muestra el icono si la prop icon es false", () => {
    render(<Alert type="info" message="Sin icono" icon={false} />);

    expect(screen.queryByText("i")).toBeNull();
  });

  it("permite cerrar la alerta al hacer clic en el botón de cierre si es dismissible", () => {
    const handleDismiss = vi.fn();
    render(
      <Alert
        type="info"
        message="Cerrable"
        dismissible
        onDismiss={handleDismiss}
      />,
    );

    const closeButton = screen.getByLabelText("Cerrar alerta");
    expect(closeButton).toBeDefined();

    // Hacer clic en cerrar activa la animación de salida (leaving)
    fireEvent.click(closeButton);

    // Avanzar el timeout de 300ms de la animación
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Verificar que la alerta ya no está en el documento y se llamó al callback
    expect(screen.queryByRole("alert")).toBeNull();
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("se cierra automáticamente después del tiempo especificado en autoDismiss", () => {
    const handleDismiss = vi.fn();
    render(
      <Alert
        type="warning"
        message="Auto cierre"
        autoDismiss={2000}
        onDismiss={handleDismiss}
      />,
    );

    expect(screen.getByRole("alert")).toBeDefined();

    // Avanzar el tiempo del autoDismiss (2000ms) + la animación de salida (300ms)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("alert")).toBeNull();
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("aplica clases CSS personalizadas mediante la prop className", () => {
    render(
      <Alert
        type="info"
        message="Custom class"
        className="custom-test-class"
      />,
    );

    const alertElement = screen.getByRole("alert");
    expect(alertElement.className).toContain("custom-test-class");
  });
});
