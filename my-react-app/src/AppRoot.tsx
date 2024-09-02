import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function AppRoot() {
  return (
    <>
      <Navigation
        title="The Calculating Parrot"
        navigationLinks={[
          { title: "Home", path: "home" },
          { title: "Budgets", path: "budgets" },
          { title: "Profile", path: "profile" },
        ]}
      >
        <Outlet />
      </Navigation>
    </>
  );
}

export default AppRoot;
