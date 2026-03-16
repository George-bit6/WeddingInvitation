import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import App from "./app/App.jsx";
import LoginPage from "./app/LoginPage";
import "@fontsource/inter/400.css"

const router = createBrowserRouter([
  {

    path: "/",
    element: <App/>
  },
  {
    path: "signin",
    element: <LoginPage/>
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange forcedTheme="light">
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>,
);
