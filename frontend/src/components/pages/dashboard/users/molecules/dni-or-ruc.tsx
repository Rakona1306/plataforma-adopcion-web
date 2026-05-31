import Input from "@/components/atoms/input";
import { useField } from "formik";

export function DniOrRuc({ errorValidation }: { errorValidation: Record<string, string> }) {
  const [field] = useField('document');

  return (
    <>
    {
      field.value === 'DNI' ? (
        <Input name="dni" label="DNI:" error={errorValidation.dni} />
      ) : (
        <Input name="ruc" label="RUC:" error={errorValidation.ruc} />
      )
    }
    </>
  );
}