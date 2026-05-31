"use client";
import { manrope } from '@/lib/fonts/manrope';
import { Autocomplete, Button, createTheme, MantineProvider, Select, TextInput } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '../../../styles/mantine/forms/select.css';
import '../../../styles/mantine/forms/button.css';
import '../../../styles/mantine/forms/input.css'

const theme = createTheme({
  fontFamily: manrope.style.fontFamily,
  components: {
    Select: Select.extend({
      classNames: {
        input: "select-input",
        option: "select-option",
      }
    }),
    Autocomplete: Autocomplete.extend({
      classNames: {
        input: "select-input",
      }
    }),
    Button: Button.extend({
      classNames: {
        root: "button-primary",
      }
    }),
    TextInput: TextInput.extend({
      classNames: {
        input: "text-input",
      }
    })
  }
})

export default function MantineUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  )
}