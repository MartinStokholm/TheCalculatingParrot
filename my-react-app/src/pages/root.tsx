import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { GiReceiveMoney } from "react-icons/gi";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GiHouse } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import { PageWrapper } from "../components/PageWrapper";
import { Footer } from "../components/Footer";

export default function Root() {
  return (
    <Navigation
      title="TCP"
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
      <PageWrapper>
        <Toaster />
        <Outlet />
      </PageWrapper>
      <Footer />
    </Navigation>
  );
}
