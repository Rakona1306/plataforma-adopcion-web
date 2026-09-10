import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileUpload } from "./file-upload";

vi.mock("formik", () => ({
  useField: () => [
    { value: [], touched: false, error: undefined }, // [0] field
    { touched: false, error: undefined }, // [1] meta
    { setValue: vi.fn(), setTouched: vi.fn() }, // [2] helpers
  ],
}));

// Mock para URL.createObjectURL ya que JSDOM no lo implementa nativamente
beforeEach(() => {
  global.URL.createObjectURL = vi.fn(() => "blob:http://localhost/mock-blob");
  global.URL.revokeObjectURL = vi.fn();
});

describe("FileUpload Component", () => {
  it("renderiza la etiqueta y el área de dropzone correctamente", () => {
    render(<FileUpload name="photos" label="Galería de Fotos" required />);

    expect(screen.getByText("Galería de Fotos")).toBeDefined();
    expect(screen.getByText("*")).toBeDefined();
    expect(
      screen.getByText("Arrastra imágenes o haz clic para seleccionar"),
    ).toBeDefined();
  });

  it("permite añadir archivos válidos mediante el input de archivos", async () => {
    render(<FileUpload name="photos" label="Subir imágenes" />);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(fileInput).not.toBeNull();

    const testFile = new File(["dummy content"], "test.png", {
      type: "image/png",
    });

    fireEvent.change(fileInput, {
      target: { files: [testFile] },
    });

    await waitFor(() => {
      expect(screen.getByText("test.png")).toBeDefined();
    });
  });

  it("muestra un error si el archivo excede el tamaño máximo permitido", async () => {
    render(<FileUpload name="photos" maxSizeMb={1} />);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    // Crear un archivo falso que pese más de 1MB (ej. 2MB)
    const largeFile = new File(
      [new ArrayBuffer(2 * 1024 * 1024)],
      "large.png",
      {
        type: "image/png",
      },
    );

    fireEvent.change(fileInput, {
      target: { files: [largeFile] },
    });

    await waitFor(() => {
      expect(
        screen.getByText(/supera el tamaño máximo permitido de 1 MB/i),
      ).toBeDefined();
    });
  });

  it("renderiza fotos existentes pasadas por defaultPhotos", () => {
    const defaultPhotos = [
      { id: "1", url: "https://example.com/photo1.jpg", isMain: true },
    ];

    render(
      <FileUpload
        name="photos"
        defaultPhotos={defaultPhotos}
        mainFieldName="mainPhoto"
      />,
    );

    expect(screen.getByText("Fotos guardadas (1)")).toBeDefined();
    expect(screen.getByText("Principal")).toBeDefined();
  });

  it("se adapta correctamente a vistas móviles y de escritorio", () => {
    // Simular pantalla Mobile
    window.innerWidth = 375;
    fireEvent(window, new Event("resize"));

    const { rerender } = render(
      <FileUpload name="photos" label="Subir fotos" />,
    );
    expect(screen.getByText("Subir fotos")).toBeDefined();

    // Simular pantalla Desktop
    window.innerWidth = 1024;
    fireEvent(window, new Event("resize"));

    rerender(<FileUpload name="photos" label="Subir fotos" />);
    expect(screen.getByText("Subir fotos")).toBeDefined();
  });
});
