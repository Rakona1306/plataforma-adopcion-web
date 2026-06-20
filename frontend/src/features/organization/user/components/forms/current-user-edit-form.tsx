import FormContainer from "@/components/molecules/form-container"
import { ChangeAccountInfoDto } from "../../dto/changeAccountInfo.dto"
import { userPublicSchema } from "../../schema/user-public.schema"
import Input from "@/components/atoms/input"
import { UserLogged } from "@/core/application/features/system/auth/dtos/authResponse.dto"
import { Button, Grid } from "@mantine/core"
import { useProfile } from "@/features/system/auth/hooks/useProfile"
import CurrentUserEditFormLoading from "../loading/CurrentUserEditForm.loading"
import { DniOrRuc } from "@/components/pages/dashboard/users/molecules/dni-or-ruc"
import SelectInput from "@/components/organisms/select-input"
import { limaDistricts } from "@/core/shared/constants/distritcts"
import { useModal } from "@/core/application/hooks/ui/useModal"
import useChangeAccountInfo from "../../hooks/useChangeAccountInfo"

interface Props {
    onSubmit?: (values: ChangeAccountInfoDto) => void
}

interface ContentProps {
    user: UserLogged
    onSubmit?: (values: ChangeAccountInfoDto) => void
}

export default function CurrentUserEditForm({ onSubmit }: Props) {
    const { profile, isLoading } = useProfile()

    if (isLoading || !profile) return <CurrentUserEditFormLoading />

    return (
        <ContentForm key={profile.id} user={profile} onSubmit={onSubmit} />
    )

}

function ContentForm({ user, onSubmit }: ContentProps) {

    const { handleCloseModal } = useModal() || {}
    const { changeAccountInfo } = useChangeAccountInfo()

    const initialValues: ChangeAccountInfoDto = {
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        district: user.district,
        dni: user.dni,
        ruc: user.ruc,
        document: user.dni ? 'DNI' : 'RUC'
    }

    function handleSubmit(values: ChangeAccountInfoDto) {
        if (onSubmit) {
            onSubmit(values)

            return
        }

        changeAccountInfo({
            dto: values,
            id: user.id
        })
    }

    return (
        <FormContainer<ChangeAccountInfoDto>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={userPublicSchema}
            enableReinitialize={true}
            className="space-y-5"
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Input label="Nombre" name="name" required defaultValue={user.name} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Input label="Apellidos" name="lastName" required defaultValue={user.lastName} />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectInput
                        label="Documento de Identidad"
                        name="document"
                        options={[
                            {
                                label: 'DNI',
                                value: "DNI"
                            },
                            {
                                label: 'RUC',
                                value: 'RUC'
                            }
                        ]}
                        defaultValue={user.dni ? 'DNI' : 'RUC'}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <DniOrRuc
                        errorValidation={{}}
                        defaultValue={user.dni ? 'DNI' : 'RUC'}
                        defaultSchema={{
                            dni: user.dni || '',
                            ruc: user.ruc || ''
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Input label="Celular" type="tel" name="phone" required defaultValue={user.phone ?? ''} />
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
                    <Button type="submit" classNames={{
                        root: 'bg-gray-700! hover:bg-gray-600!'
                    }} onClick={handleCloseModal}>Cancelar</Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Button type="submit">Actualizar</Button>
                </Grid.Col>
            </Grid>
        </FormContainer>
    )
}