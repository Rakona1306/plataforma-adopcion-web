import ButtonUI from "@/components/atoms/button/button-ui";
import FormContainer from "@/components/molecules/form-container";
import { AuthConfirmEmailDto, authConfirmEmailSchema } from "@/features/system/auth/dto/auth-confirm-email.dto";
import useConfirmOptUser from "@/features/system/auth/hooks/modal/use-confirm-opt-user";
import { montserrat } from "@/lib/fonts/monserrat";
import { useConfirmOptStore } from "@/store/use-confirm-opt-store";
import { Alert, PinInput } from "@mantine/core";

export default function ConfirmOptModal() {
    const { userRegistered } = useConfirmOptStore()
    const { confirmOpt, isLoading, error } = useConfirmOptUser()

    const initialValues: AuthConfirmEmailDto = {
        email: userRegistered?.email || '',
        code: ''
    }

    const handleSubmit = (values: AuthConfirmEmailDto) => {
        // Aquí puedes manejar la lógica de confirmación del código OTP
        confirmOpt(values);
    }

    return (
        <>
            <FormContainer<AuthConfirmEmailDto>
                initialValues={initialValues}
                validationSchema={authConfirmEmailSchema}
                onSubmit={handleSubmit}
                className="space-y-10"
            >
                {({ setFieldValue, values, errors }) => (
                    <>
                        <div>
                            <h2 className={`text-xl font-bold! text-primary mb-2 ${montserrat.className}`}>Confirmar Código OTP</h2>
                            <p className={`text-slate-800 font-medium ${montserrat.className} text-base`}>Se ha enviado un código OTP a tu correo electrónico: <span className="font-bold">{userRegistered?.email}</span></p>
                        </div>

                        {
                            error && (
                                <Alert variant="filled" color="red">
                                    {error.message || "Ocurrió un error al confirmar el código OTP. Por favor, inténtalo de nuevo."}
                                </Alert>
                            )
                        }

                        <div className="flex flex-col gap-2 items-center">
                            <label htmlFor="code" className={`text-base ${montserrat.className} font-bold`}>Codigo</label>
                            <PinInput
                                name='code'
                                inputMode="numeric"
                                value={values.code}
                                id="code"
                                size="lg"
                                length={6}
                                classNames={{
                                    pinInput: 'outline-primary!',
                                    input: 'border-primary! border-4!'
                                }}
                                onChange={(value) => setFieldValue('code', value)}
                            />
                            {errors.code && <div className="text-red-500">{errors.code}</div>}
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </div>

                        <ButtonUI type="submit" loading={isLoading} rootClassName="w-full!">
                            Confirmar Código
                        </ButtonUI>
                    </>
                )}
            </FormContainer>
        </>
    )
}