import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App.tsx";
import BudgetPage from "./features/budget/BudgetPage.tsx";
import ProfilePage from "./features/profile/ProfilePage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "budgets",
    element: <BudgetPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
