import { Alert } from "@/components/atoms/alert";
import Input from "@/components/atoms/input";
import FormContainer from "@/components/molecules/form-container";
import { ChangePasswordDto, changePasswordSchema } from "@/core/application/features/organization/user/dtos/change-password-dto";
import usePasswordChange from "@/core/application/features/organization/user/hooks/usePasswordChange";
import { User } from "@/core/domain/models/organization/user";
import { Button } from "@mantine/core";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export function ChangePasswordForm({ user }: { user: User }) {
  const { changePassword, isPending, errorMessage, errorValidation } =
    usePasswordChange();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: ChangePasswordDto = {
    email: user.email,
    password: "",
    confirmPassword: "",
  };

  function handleSubmit(values: ChangePasswordDto) {
    changePassword(values);
  }

  return (
    <FormContainer
      initialValues={initialValues}
      onSubmit={handleSubmit}
      className="space-y-5"
      validationSchema={changePasswordSchema}
    >
      {errorMessage && <Alert icon message={errorMessage} type="error" />}
      <Input name="email" label="Email" type="email" disabled defaultValue={user.email} />
      <Input
        name="password"
        label="Nueva contraseña"
        type={showPassword ? "text" : "password"}
        error={errorValidation.password}
        rightIcon={
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm font-semibold text-primary hover:text-secondary"
          >
            {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </div>
        }
        rightIconOnClick={() => setShowPassword(!showPassword)}
      />
      <Input
        name="confirmPassword"
        label="Confirmar nueva contraseña"
        type={showConfirmPassword ? "text" : "password"}
        error={errorValidation.confirmPassword}
        rightIcon={
          <div
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-sm font-semibold text-primary hover:text-secondary"
          >
            {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
          </div>
        }
        rightIconOnClick={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      <Button type="submit" loading={isPending}>
        Cambiar contraseña
      </Button>
    </FormContainer>
  );
}
