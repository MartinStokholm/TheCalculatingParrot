import Navigation from "./components/Navigation";
import { PageWrapper } from "./components/PageWrapper";

function App() {
  return (
    <>
      <Navigation
        title="Menu"
        sideBareLinks={["Getting Started", "Budgets", "Profile"]}
      >
        <PageWrapper>
          <img
            src="https://vitejs.dev/logo.svg"
            alt="Vite logo"
            className="h-16 w-16"
          />
          <p className="text-3xl font-extrabold ">
            Click on the Vite and React logos to learn more
          </p>
        </PageWrapper>
      </Navigation>
    </>
  );
}

export default App;
