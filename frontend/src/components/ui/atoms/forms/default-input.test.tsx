import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DefaultInput from "./default-input";

describe("DefaultInput", () => {
  it("renderiza el label y asocia el input correctamente", () => {
    render(<DefaultInput name="email" label="Correo" />);

    const input = screen.getByLabelText("Correo");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "email");
  });

  it("usa el name como id cuando no se pasa id explícito", () => {
    render(<DefaultInput name="username" label="Usuario" />);
    expect(screen.getByLabelText("Usuario")).toHaveAttribute("id", "username");
  });

  it("genera un id automático si no hay id ni name", () => {
    render(<DefaultInput label="Sin nombre" />);
    const input = screen.getByLabelText("Sin nombre");
    expect(input.id).toBeTruthy();
  });

  it("muestra el asterisco cuando required es true", () => {
    render(<DefaultInput name="email" label="Correo" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("no muestra asterisco cuando required es false", () => {
    render(<DefaultInput name="email" label="Correo" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("renderiza description y helperText cuando no hay error", () => {
    render(
      <DefaultInput
        name="email"
        label="Correo"
        description="Usaremos este correo para notificarte"
        helperText="Debe ser un correo válido"
      />,
    );

    expect(
      screen.getByText("Usaremos este correo para notificarte"),
    ).toBeInTheDocument();
    expect(screen.getByText("Debe ser un correo válido")).toBeInTheDocument();
  });

  it("oculta el helperText y muestra el mensaje de error cuando hasError es true", () => {
    render(
      <DefaultInput
        name="email"
        label="Correo"
        helperText="Debe ser un correo válido"
        error="El correo es obligatorio"
      />,
    );

    expect(
      screen.queryByText("Debe ser un correo válido"),
    ).not.toBeInTheDocument();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("El correo es obligatorio");
  });

  it("marca aria-invalid y aria-describedby cuando hay error", () => {
    render(
      <DefaultInput
        name="email"
        label="Correo"
        error="El correo es obligatorio"
      />,
    );

    const input = screen.getByLabelText("Correo");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("activa el estado de error con hasErrorActive aunque no haya mensaje", () => {
    render(<DefaultInput name="email" label="Correo" hasErrorActive />);
    expect(screen.getByLabelText("Correo")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("combina helperId y errorId en aria-describedby", () => {
    render(
      <DefaultInput
        name="email"
        label="Correo"
        helperText="ayuda"
        error="mal"
      />,
    );
    const input = screen.getByLabelText("Correo");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("llama a onChange y onBlur al interactuar con el input", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const handleBlur = vi.fn();

    render(
      <DefaultInput
        name="email"
        label="Correo"
        onChange={handleChange}
        onBlur={handleBlur}
      />,
    );

    const input = screen.getByLabelText("Correo");
    await user.type(input, "a");
    await user.tab();

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("funciona como input controlado", async () => {
    const user = userEvent.setup();

    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <DefaultInput
          name="email"
          label="Correo"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByLabelText("Correo") as HTMLInputElement;

    await user.type(input, "hola");
    expect(input.value).toBe("hola");
  });

  it("renderiza el ícono izquierdo como botón cuando recibe leftIconOnClick", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <DefaultInput
        name="search"
        label="Buscar"
        leftIcon={<span>🔍</span>}
        leftIconOnClick={handleClick}
        leftIconAriaLabel="Buscar"
      />,
    );

    const button = screen.getByRole("button", { name: "Buscar" });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renderiza el ícono derecho como span decorativo cuando no recibe onClick", () => {
    render(
      <DefaultInput
        name="password"
        label="Contraseña"
        rightIcon={<span data-testid="eye-icon">👁</span>}
      />,
    );

    expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /input-right-icon/i }),
    ).not.toBeInTheDocument();
  });

  it("aplica padding extra cuando hay íconos a la izquierda y derecha", () => {
    render(
      <DefaultInput
        name="amount"
        label="Monto"
        leftIcon={<span>$</span>}
        rightIcon={<span>USD</span>}
      />,
    );

    const input = screen.getByLabelText("Monto");
    expect(input.className).toContain("pl-11");
    expect(input.className).toContain("pr-11");
  });

  it("deshabilita el input cuando disabled es true", () => {
    render(<DefaultInput name="email" label="Correo" disabled />);
    expect(screen.getByLabelText("Correo")).toBeDisabled();
  });

  it("reenvía el ref al elemento input nativo", () => {
    const ref = createRef<HTMLInputElement>();
    render(<DefaultInput name="email" label="Correo" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.id).toBe("email");
  });

  it("permite sobreescribir className sin perder las clases base", () => {
    render(
      <DefaultInput name="email" label="Correo" className="custom-class" />,
    );

    const input = screen.getByLabelText("Correo");
    expect(input.className).toContain("custom-class");
    expect(input.className).toContain("rounded-xl");
  });
});
