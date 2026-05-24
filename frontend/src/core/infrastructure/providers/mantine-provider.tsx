import { manrope } from '@/lib/fonts/manrope';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const theme = createTheme({
  fontFamily: manrope.style.fontFamily,
})

export default function MantineUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  )
}