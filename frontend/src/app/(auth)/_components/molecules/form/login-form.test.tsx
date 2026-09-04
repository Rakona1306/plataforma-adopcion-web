/**
 * Unit test focused on CA1: the divider text above the social section
 * must read "Síguenos en:" and NOT "O continúa con".
 *
 * LoginForm pulls in many app-specific hooks/providers (react-query,
 * next/navigation, zustand stores, a custom FormContainer, Swal, etc).
 * Those are mocked here so the test stays fast and isolated. Adjust the
 * mocked import paths below to match your repo's actual aliases if they
 * differ (this file assumes the paths shown in the component under test).
 */
import { JSX } from "react/jsx-runtime";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// ---- motion/react -----------------------------------------------------
vi.mock("motion/react", () => {
  const stripMotionProps = (props: Record<string, unknown>) => {
    const {
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      layout,
      ...rest
    } = props;
    return rest;
  };
  const factory =
    (tag: string) =>
    ({ children, ...props }: any) => {
      const Tag = tag as keyof JSX.IntrinsicElements;
      return <Tag {...stripMotionProps(props)}>{children}</Tag>;
    };
  return {
    motion: new Proxy({}, { get: (_t, tag: string) => factory(tag) }),
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// ---- next/navigation ----------------------------------------------------
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// ---- react-query ----------------------------------------------------------
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

// ---- app-specific stores/hooks --------------------------------------------
vi.mock("@/core/application/hooks/session/useToken", () => ({
  useTokenStore: () => ({ setToken: vi.fn() }),
}));

vi.mock("@/core/infrastructure/store/useSessionStore", () => ({
  useSessionStore: () => ({ setUser: vi.fn() }),
}));

vi.mock("@/features/system/auth/hooks/use-login", () => ({
  useLogin: () => ({ login: vi.fn(), isLoading: false, error: null }),
}));

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn() },
}));

vi.mock("@/app/(web)/_utils/data/companyInfo.data", () => ({
  companyInfo: { name: "PawsAdopt" },
}));

// ---- form building blocks: render children/inputs minimally --------------
vi.mock("@/components/molecules/form-container", () => ({
  __esModule: true,
  default: ({ children }: any) => <form>{children}</form>,
}));

vi.mock("@/components/atoms/input", () => ({
  __esModule: true,
  default: ({ label, name }: any) => (
    <label>
      {label}
      <input name={name} />
    </label>
  ),
}));

vi.mock("@/components/atoms/alert", () => ({
  Alert: ({ title }: any) => <div role="alert">{title}</div>,
}));

vi.mock("@/core/shared/helpers/getFieldError", () => ({
  getFieldError: () => undefined,
}));

vi.mock("@/core/shared/helpers/variants", () => ({
  containerVariants: {},
  itemVariants: {},
}));

// The real SocialLinks is already covered by its own test file, so keep
// this test focused purely on the divider text.
vi.mock("../social-links", () => ({
  __esModule: true,
  default: () => <div data-testid="social-links-stub" />,
}));

import LoginForm from "./login-form";

describe("LoginForm — divider text (CA1)", () => {
  it("shows the new label 'Síguenos en:'", () => {
    render(<LoginForm />);
    expect(screen.getByText("Síguenos en:")).toBeInTheDocument();
  });

  it("does NOT show the old label 'O continúa con'", () => {
    render(<LoginForm />);
    expect(screen.queryByText("O continúa con")).not.toBeInTheDocument();
  });

  it("keeps the divider text styled with text-slate-500 and centered", () => {
    render(<LoginForm />);
    const label = screen.getByText("Síguenos en:");
    expect(label.className).toContain("text-slate-500");
    // parent wrapper centers it over the divider line
    expect(label.parentElement?.className).toContain("justify-center");
  });
});
