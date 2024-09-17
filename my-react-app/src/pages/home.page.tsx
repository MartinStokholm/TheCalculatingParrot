import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SignInForm } from "../components/form/SignIn";
import { Title, TitleSizes } from "../components/common/Title";

export default function HomePage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Title
          size={TitleSizes.Large}
          text="Welcome to The Calculating Parrot"
        />
      ) : (
        <SignInForm />
      )}
    </>
  );
}
