/**
 * Unit tests for SocialLinks component (login-form social section).
 *
 * Stack assumed: Vitest + @testing-library/react + @testing-library/jest-dom.
 * Adjust the import path to SocialLinks below to match your repo alias
 * (e.g. "@/app/(web)/_components/molecules/social-links").
 *
 * Covers:
 *  - CA1: divider text is handled in LoginForm, not here (see login-form.test.tsx)
 *  - CA2: Facebook SVG icon renders, no emoji fallback
 *  - CA3: link, target=_blank, rel=noopener noreferrer, correct URL
 *  - CA4: only one social option rendered (no redundant buttons)
 *  - CA5: rounded/border/hover classes present
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SocialLinks from "./social-links";
import { JSX } from "react";

// motion/react adds animation-only props (initial, animate, whileHover, etc.)
// that aren't valid DOM attributes. Mock it so RTL renders plain elements
// and we can assert on real DOM output without console warnings.
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
    // eslint-disable-next-line react/display-name
    ({ children, ...props }: any) => {
      const Tag = tag as keyof JSX.IntrinsicElements;
      return <Tag {...stripMotionProps(props)}>{children}</Tag>;
    };

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) => factory(tag),
      },
    ),
  };
});

const FACEBOOK_URL = "https://www.facebook.com/pawsadopt";

describe("SocialLinks", () => {
  it("CA4 — renders exactly one social option (no redundant buttons)", () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
  });

  it("CA3 — renders an <a> pointing to the official Facebook URL", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: /facebook/i });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", FACEBOOK_URL);
  });

  it("CA3 — opens in a new tab safely (target + rel)", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: /facebook/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("provides an accessible name for screen readers", () => {
    render(<SocialLinks />);
    expect(screen.getByLabelText("Síguenos en Facebook")).toBeInTheDocument();
  });

  it("CA2 — renders an SVG icon (react-icons), not raw text/emoji", () => {
    const { container } = render(<SocialLinks />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("CA2 — does not render legacy emoji icons (rocket, thumbs-up, X, chain)", () => {
    const { container } = render(<SocialLinks />);
    const text = container.textContent ?? "";
    const legacyEmojis = ["🚀", "👍", "❌", "🔗"];
    legacyEmojis.forEach((emoji) => {
      expect(text).not.toContain(emoji);
    });
  });

  it("CA5 — applies the styled rounded/border/background classes", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: /facebook/i });
    ["border", "border-slate-200", "rounded-xl", "bg-white"].forEach((cls) => {
      expect(link.className).toContain(cls);
    });
  });

  it("CA5 — applies smooth hover transition + brand color on hover", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: /facebook/i });
    [
      "transition-colors",
      "duration-200",
      "hover:border-blue-600",
      "hover:bg-slate-50",
    ].forEach((cls) => {
      expect(link.className).toContain(cls);
    });
  });

  it("is keyboard focusable (native <a> with href is tabbable)", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: /facebook/i });
    link.focus();
    expect(link).toHaveFocus();
  });
});
