import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoot from "./AppRoot.tsx";
import BudgetPage from "./features/budget/BudgetPage.tsx";
import ProfilePage from "./features/profile/ProfilePage.tsx";
import HomePage from "./features/home/HomePage.tsx";
import store from "./app/store"; // Import the Redux store
import "./index.css";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
