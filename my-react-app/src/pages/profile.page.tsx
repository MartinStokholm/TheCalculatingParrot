import { getToken } from "../utils/jwt.utils";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorBanner } from "../components/Error";
import { Card } from "../components/Card";
import { useGetUserQuery } from "../redux/features/userApiSlice";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt.types";

export default function ProfilePage() {
  const token = getToken();
  if (!token) return null;

  const decodedToken = jwtDecode<JwtPayload>(token);

  const { data: user, error, isLoading } = useGetUserQuery(decodedToken.id);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorBanner title="Error!" text="Failed to fetch user data" />;
  }

  return (
    <>
      {user && (
        <Card
          title="My "
          imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fgelatologia.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fplaceholder.png%3Fssl%3D1&f=1&nofb=1&ipt=63e8e92612698422f80cd2e68d683a71fef4e13f7acd0377020d4bab370da50a&ipo=images"
          fields={{
            ID: user.id,
            Name: user.name,
            Email: user.email,
            Verified: user.isVerified ? "Yes" : "No",
          }}
        />
      )}
    </>
  );
}
