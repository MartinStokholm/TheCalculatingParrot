import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { GiReceiveMoney } from "react-icons/gi";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GiHouse } from "react-icons/gi";
import { Toaster } from "react-hot-toast";

function Root() {
  return (
    <>
      <Navigation
        title="The Calculating Parrot"
        navigationLinks={[
          { title: "Home", path: "home", logo: <GiHouse size={35} /> },
          {
            title: "Budgets",
            path: "budgets",
            logo: <GiReceiveMoney size={35} />,
          },
          {
            title: "Profile",
            path: "profile",
            logo: <GiCaptainHatProfile size={35} />,
          },
        ]}
      >
        <Outlet />
        <Toaster />
      </Navigation>
    </>
  );
}

export default Root;
