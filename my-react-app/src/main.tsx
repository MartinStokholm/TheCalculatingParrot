import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Root from "./pages/root.tsx";
import BudgetPage from "./pages/budget.page.tsx";
import ProfilePage from "./pages/profile.page.tsx";
import HomePage from "./pages/home.page.tsx";
import { store } from "./redux/store.ts";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
