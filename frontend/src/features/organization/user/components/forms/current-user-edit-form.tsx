import FormContainer from "@/components/molecules/form-container";
import { ChangeAccountInfoDto } from "../../dto/changeAccountInfo.dto";
import { userPublicSchema } from "../../schema/user-public.schema";
import Input from "@/components/atoms/input";
import { UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto";
import { Alert, Button, Grid } from "@mantine/core";
import { useProfile } from "@/features/system/auth/hooks/useProfile";
import CurrentUserEditFormLoading from "../loading/CurrentUserEditForm.loading";
import SelectInput from "@/components/organisms/select-input";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import { useModal } from "@/core/application/hooks/ui/useModal";
import useChangeAccountInfo from "../../hooks/useChangeAccountInfo";
import ButtonUI from "@/components/atoms/button/button-ui";
import useValidateDni from "../../hooks/use-validate-dni";
import { HttpError } from "@/core/shared/errors/http-error";
import { useState } from "react";
import { ValidateDniResponse } from "../../dto/validate-dni-response";

interface Props {
  onSubmit?: (values: ChangeAccountInfoDto) => void;
}

interface ContentProps {
  user: UserLogged;
  onSubmit?: (values: ChangeAccountInfoDto) => void;
}

export default function CurrentUserEditForm({ onSubmit }: Props) {
  const { profile, isLoading } = useProfile();

  if (isLoading || !profile) return <CurrentUserEditFormLoading />;

  return <ContentForm key={profile.id} user={profile} onSubmit={onSubmit} />;
}

function ContentForm({ user, onSubmit }: ContentProps) {
  const { handleCloseModal } = useModal() || {};
  const { changeAccountInfo, isLoading: isSaving } = useChangeAccountInfo();
  const { validateDni, isValidating, checkDniWithAccount } = useValidateDni();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [dniData, setDniData] = useState<ValidateDniResponse | null>(null);

  const initialValues: ChangeAccountInfoDto = {
    name: user.name,
    lastName: user.lastName,
    phone: user.phone,
    district: user.district,
    dni: user.dni ?? "",
  };

  async function handleSubmit(values: ChangeAccountInfoDto) {
    setValidationError(null);
    let dniData: ValidateDniResponse | null = null;

    // 1. Validar el DNI contra la API externa
    try {
      dniData = await validateDni(values.dni);
    } catch (err) {
      setValidationError(
        err instanceof HttpError
          ? err.message
          : "No se pudo validar el DNI. Verifique que sea correcto e intente nuevamente.",
      );
      return;
    }

    // 2. Verificar que nombre y apellido coincidan con lo que devuelve RENIEC
    const isValid = await checkDniWithAccount(
      values.name,
      values.lastName,
      dniData,
    );

    if (!isValid) {
      setValidationError(
        "El nombre y/o apellido ingresados no coinciden con los registrados para este DNI en RENIEC.",
      );
      setDniData(dniData);
      return;
    }

    // 3. Todo válido -> actualizar cuenta
    changeAccountInfo(
      {
        dto: values,
        id: user.id,
      },
      {
        onSuccess: () => {
          onSubmit && onSubmit(values);
        },
      },
    );
  }

  const isSubmitting = isValidating || isSaving;

  return (
    <FormContainer<ChangeAccountInfoDto>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userPublicSchema}
      enableReinitialize={true}
      className="space-y-5"
    >
      {({ values }) => (
        <>
          {validationError && (
            <Alert
              color="red"
              title="Error de validación"
              withCloseButton
              onClose={() => setValidationError(null)}
            >
              {validationError}
            </Alert>
          )}

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Input
                label="Nombre"
                name="name"
                required
                defaultValue={user.name}
                error={
                  validationError &&
                  dniData &&
                  !checkDniWithAccount(user.name, user.lastName, dniData)
                    ? "El nombre y/o apellido no coinciden con el DNI ingresado"
                    : undefined
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Input
                label="Apellidos"
                name="lastName"
                required
                defaultValue={user.lastName}
                error={
                  validationError &&
                  dniData &&
                  !checkDniWithAccount(user.name, user.lastName, dniData)
                    ? "El nombre y/o apellido no coinciden con el DNI ingresado"
                    : undefined
                }
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col>
              <Input
                name="dni"
                label="DNI"
                placeholder="Ingrese su DNI"
                required
                defaultValue={user.dni || ""}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Input
                label="Celular"
                type="tel"
                name="phone"
                required
                defaultValue={user.phone ?? ""}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <SelectInput
                name="district"
                label="Distrito"
                placeholder="Seleccione un distrito"
                options={limaDistricts}
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Button
                fullWidth
                type="submit"
                classNames={{
                  root: "bg-gray-700! hover:bg-gray-600!",
                }}
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ButtonUI
                fullWidth
                type="submit"
                loading={isSubmitting}
                disabled={
                  isSubmitting ||
                  (validationError !== null &&
                    dniData !== null &&
                    checkDniWithAccount(user.name, user.lastName, dniData) &&
                    values.dni === dniData.data.dni)
                }
              >
                {isValidating ? "Validando DNI..." : "Actualizar"}
              </ButtonUI>
            </Grid.Col>
          </Grid>
        </>
      )}
    </FormContainer>
  );
}
