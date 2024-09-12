import Root from "./root.tsx";
import HomePage from "./home.page.tsx";
import BudgetPage from "./budget/budget.page.tsx";
import BudgetDetailsPage from "./budget/budget.details.page.tsx";
import ProfilePage from "./profile.page.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true, // This will match the root path "/"
        element: <Navigate to="/home" />, // Redirect to "/home"
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "budgets",
        element: <BudgetPage />,
      },
      {
        path: "budgets/:id",
        element: <BudgetDetailsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
