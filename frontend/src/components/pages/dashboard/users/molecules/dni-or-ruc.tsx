import Input from "@/components/atoms/input";
import { useField } from "formik";
import { useEffect } from "react";

interface Props {
  errorValidation: Record<string, string>,
  defaultValue?: string
  defaultSchema?: {
    dni: string
    ruc: string
  }
}

export function DniOrRuc({ errorValidation, defaultValue, defaultSchema }: Props) {
  const [field, _, helper] = useField('document');

  useEffect(() => {
    if (defaultValue) {
      helper.setValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <>
      {
        field.value === 'DNI' ? (
          <Input name="dni" label="DNI:" error={errorValidation.dni} defaultValue={defaultSchema?.dni} />
        ) : (
          <Input name="ruc" label="RUC:" error={errorValidation.ruc} defaultValue={defaultSchema?.ruc} />
        )
      }
    </>
  );
}