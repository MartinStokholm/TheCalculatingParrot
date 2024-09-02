import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoot from "./AppRoot.tsx";
import BudgetPage from "./features/budget/BudgetPage.tsx";
import ProfilePage from "./features/profile/ProfilePage.tsx";
import "./index.css";
import HomePage from "./features/home/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "budgets",
        element: <BudgetPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
