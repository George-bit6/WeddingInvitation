import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import App from "./app/App.jsx";
import LoginPage from "./app/LoginPage.jsx";
import Dashboard from "./app/Dashboard.jsx";
import ErrorPage from "./app/ErrorPage";
import ProtectedRoute from "./ProtectedRoute.jsx";
import "@fontsource/inter/400.css";

const router = createBrowserRouter([
  {
    path: "/:id?/:fullName?",
    element: <App />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/signin",

    element: (
      
        <LoginPage />
      
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <ErrorPage/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        forcedTheme="light"
      >
        <RouterProvider router={router} />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>,
);
