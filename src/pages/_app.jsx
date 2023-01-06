import '../styles/globals.css'
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AppProvider } from '../data/context/AppContext';

function MyApp({ Component, pageProps }) {

  const lightTheme = createTheme({
    type: 'light',
    theme: {
    }
  })

  const darkTheme = createTheme({
    type: 'dark',
    theme: {
    }
  })

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp
