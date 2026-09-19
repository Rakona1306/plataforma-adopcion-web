import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated pero necesario para compatibilidad
    removeListener: vi.fn(), // Deprecated pero necesario para compatibilidad
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de fuentes de Next.js
vi.mock("next/font/google", () => {
  const createMockFont = (fontName: string) => () => ({
    className: `mock-${fontName.toLowerCase()}`,
    style: { fontFamily: fontName },
    variable: `--font-${fontName.toLowerCase()}`,
  });

  return {
    Montserrat: createMockFont("Montserrat"),
    Inter: createMockFont("Inter"),
    Roboto: createMockFont("Roboto"),
    Poppins: createMockFont("Poppins"),
    Open_Sans: createMockFont("Open Sans"),
  };
});

// Mock de next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock de next/image
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock de next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
