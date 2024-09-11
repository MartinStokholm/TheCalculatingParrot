import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { GiReceiveMoney } from "react-icons/gi";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GiHouse } from "react-icons/gi";
import { Toaster } from "react-hot-toast";
import { PageWrapper } from "../components/PageWrapper";

export default function Root() {
  return (
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
      <PageWrapper>
        <Toaster />
        <Outlet />
      </PageWrapper>
      <footer className="w-full bg-zinc-500 h-20 flex flex-col text-center py-4 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, illum
        laboriosam reiciendis temporibus doloribus hic harum!
      </footer>
    </Navigation>
  );
}
