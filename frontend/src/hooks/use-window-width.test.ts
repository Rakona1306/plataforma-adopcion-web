import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useWindowWidth } from "./use-window-width";

describe("useWindowWidth", () => {
  it("debe retornar el ancho actual de la ventana", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current.width).toBe(1200);
    expect(result.current.isMobile).toBe(false);
  });

  it("debe retornar isMobile en true cuando el ancho es menor a 768", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 767,
    });

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current.width).toBe(767);
    expect(result.current.isMobile).toBe(true);
  });

  it("debe actualizar el ancho cuando la ventana cambia de tamaño", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current.width).toBe(1200);
    expect(result.current.isMobile).toBe(false);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(500);
    expect(result.current.isMobile).toBe(true);
  });

  it("debe cambiar isMobile a false cuando el ancho es mayor o igual a 768", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useWindowWidth());

    expect(result.current.isMobile).toBe(true);

    act(() => {
      window.innerWidth = 768;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(768);
    expect(result.current.isMobile).toBe(false);
  });

  it("debe eliminar el listener de resize al desmontar el hook", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useWindowWidth());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
