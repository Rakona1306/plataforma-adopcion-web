import FormContainer from "@/components/molecules/form-container";
import { RequestAdoptionResponse } from "../dto/dashboard/request-adoption";
import {
  UpdateRequestAdoptionDto,
  UpdateRequestAdoptionSchema,
} from "../dto/dashboard/update-request-adoption";
import { Grid } from "@mantine/core";
import Input from "@/components/atoms/input";
import SelectInput from "@/components/organisms/select-input";
import { limaDistricts } from "@/core/shared/constants/distritcts";
import { ToggleField } from "@/components/atoms/toggle-field";
import ButtonUI from "@/components/atoms/button/button-ui";
import useUpdateRequestAdoption from "../hooks/dashboard/use-update-request-adoption";
import { useModal } from "@/core/application/hooks/ui/useModal";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/constants/queryKeys";
import { Alert } from "@/components/atoms/alert";

interface Props {
  requestAdoption: RequestAdoptionResponse;
}

export default function UpdateRequestAdoptionForm({ requestAdoption }: Props) {
  const { update, errorMessage, errorValidation, isPending } =
    useUpdateRequestAdoption();
  const { handleCloseModal } = useModal() || {};
  const queryClient = useQueryClient();

  const initialValues: UpdateRequestAdoptionDto = {
    acceptHomeVisit: requestAdoption.acceptHomeVisit,
    address: requestAdoption.address,
    district: requestAdoption.district,
    hasChildren: requestAdoption.hasChildren,
    hasOtherPets: requestAdoption.hasOtherPets,
    houseType: requestAdoption.houseType,
    motivation: requestAdoption.motivation,
    phone: requestAdoption.phone,
    dni: requestAdoption.dni,
    id: requestAdoption.id,
  };

  return (
    <FormContainer
      initialValues={initialValues}
      onSubmit={(values) => {
        update(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.BUSINESS.REQUEST_ADOPTION],
            });
            handleCloseModal && handleCloseModal();
            Swal.fire({
              icon: "success",
              title: "Solicitud de adopción actualizada",
              text: "La solicitud de adopción se ha actualizado correctamente.",
            });
          },
        });
      }}
      validationSchema={UpdateRequestAdoptionSchema}
      className="space-y-5"
    >
      {({ setFieldValue, values }) => (
        <>
          {errorMessage && (
            <Alert
              title="Error en el servidor"
              message={errorMessage}
              type="error"
              dismissible
            />
          )}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Input
                name="address"
                label="Dirección"
                placeholder="Ingrese la dirección completa"
                defaultValue={requestAdoption.address}
                error={errorValidation.address}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Input
                name="dni"
                label="DNI"
                placeholder="Ingrese el DNI"
                required
                defaultValue={
                  requestAdoption.dni || requestAdoption.user.dni || ""
                }
                error={errorValidation.dni}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Input
                name="phone"
                placeholder="Ingrese el número de teléfono"
                label="Telefono"
                required
                defaultValue={
                  requestAdoption.phone || requestAdoption.user.phone || ""
                }
                error={errorValidation.phone}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <SelectInput
                name="district"
                label="Distrito"
                placeholder="Seleccione un distrito"
                options={limaDistricts}
                defaultValue={
                  requestAdoption.district ||
                  requestAdoption.user.district ||
                  ""
                }
                required
                error={errorValidation.district}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col>
              <ToggleField
                label="Aceptas visita a domicilio?"
                subtitle="Selecciona si es cierto"
                value={values.acceptHomeVisit}
                onChange={(v) => setFieldValue("acceptHomeVisit", v)}
                error={errorValidation.acceptHomeVisit}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <ToggleField
                label="Tiene otras mascotas?"
                subtitle="Selecciona si es cierto"
                value={values.hasOtherPets}
                onChange={(v) => setFieldValue("hasOtherPets", v)}
                error={errorValidation.hasOtherPets}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <ToggleField
                label="Tiene niños en casa?"
                subtitle="Selecciona si es cierto"
                value={values.hasChildren}
                onChange={(v) => setFieldValue("hasChildren", v)}
                error={errorValidation.hasChildren}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Input
                name="houseType"
                label="Tipo de vivienda"
                placeholder="Ingrese el tipo de vivienda"
                required
                defaultValue={requestAdoption.houseType}
                error={errorValidation.houseType}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Input
                name="motivation"
                label="Motivación"
                placeholder="Ingrese su motivación para adoptar"
                required
                defaultValue={requestAdoption.motivation}
                error={errorValidation.motivation}
              />
            </Grid.Col>
          </Grid>

          <ButtonUI
            fullWidth
            type="submit"
            color="primary"
            size="md"
            loading={isPending}
          >
            Editar Solicitud
          </ButtonUI>
        </>
      )}
    </FormContainer>
  );
}
