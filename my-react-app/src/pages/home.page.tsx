import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SignInForm } from "../components/SignIn";
import { Title, TitleSizes } from "../components/Title";

export default function HomePage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Title
          size={TitleSizes.Large}
          text="Welcome to the calculating parrot"
        />
      ) : (
        <SignInForm />
      )}
    </>
  );
}
