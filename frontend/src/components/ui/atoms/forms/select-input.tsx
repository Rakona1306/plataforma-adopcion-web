import { Combobox, useCombobox } from "@mantine/core";
import { useState } from "react";
import DefaultInput from "./default-input";

interface Props {
  formikSchema?: FormikSchema;
  defaultSchema?: DefaultSchema;
}

interface FormikSchema {
  label: string;
  name: string;
  options: Array<{ label: string; value: string }>;
}

interface DefaultSchema {
  defaultValue?: string;
  options: Array<{ label: string; value: string }>;
  label?: string;
  onSelected: (value: string) => void;
}

export default function SelectInput({ defaultSchema, formikSchema }: Props) {
  if (formikSchema) {
    return <FormikSelectInput {...formikSchema} />;
  }

  if (defaultSchema) {
    return <DefaultSelectInput {...defaultSchema} />;
  }

  return <div>Error en SelectInput</div>;
}

function FormikSelectInput({}: FormikSchema) {
  return <></>;
}

function DefaultSelectInput({
  defaultValue,
  options,
  label,
  onSelected,
}: DefaultSchema) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(defaultValue || null);

  const stores = options.map((item) => (
    <Combobox.Option
      value={item.label}
      key={item.value}
      onClick={() => {
        onSelected(item.value);
        setValue(item.label);
        combobox.closeDropdown();
      }}
    >
      {item.label}
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox}>
      <Combobox.Target>
        <DefaultInput
          label={label || "Seleccione una opción"}
          name="select"
          value={value || ""}
          onClick={() => combobox.toggleDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{stores}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
