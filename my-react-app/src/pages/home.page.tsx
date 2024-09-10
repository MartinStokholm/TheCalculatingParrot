import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Import the RootState type
import { SignInForm } from "../components/SignIn";
import { PageWrapper } from "../components/PageWrapper";
import { SignOut } from "../components/SignOut";

export default function HomePage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return <PageWrapper>{isLoggedIn ? <SignOut /> : <SignInForm />}</PageWrapper>;
}
