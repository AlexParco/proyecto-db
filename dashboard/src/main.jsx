import React from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './lib/theme'
import App from './App'
// pages
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
)
