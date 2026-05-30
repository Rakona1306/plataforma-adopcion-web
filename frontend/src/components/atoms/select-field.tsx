'use client'

import { Select, SelectProps } from '@mantine/core'

export interface SelectOption {
  label: string
  value: string
}

interface SelectFieldProps extends Omit<SelectProps, 'data'> {
  options: SelectOption[]
}

export const SelectField = ({
  options,
  ...props
}: SelectFieldProps) => {
  return (
    <Select
      searchable
      nothingFoundMessage="No se encontraron resultados"
      data={options}
      radius="md"
      size="lg"
      className='border-2 border-slate-700!'
      {...props}
    />
  )
}