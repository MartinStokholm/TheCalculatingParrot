import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorBanner } from "../components/Error";
import { Card } from "../components/Card";
import { useProfile } from "../hooks/useProfile";

export default function ProfilePage() {
  const { user, isLoading, error, token } = useProfile();

  // Error handling for authentication or fetch issues
  if (!token) {
    return <ErrorBanner title="Error!" text="Unauthenticated" />;
  }
  if (error) {
    return <ErrorBanner title="Error!" text={error.toString()} />;
  }

  // Display a loading spinner if the user data is still loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Check if user data exists
  if (!user) {
    return <ErrorBanner title="Error!" text="User data not available" />;
  }

  return (
    <>
      {user && (
        <Card
          title="My profile"
          imageSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fgelatologia.com%2Fwp-content%2Fuploads%2F2020%2F07%2Fplaceholder.png%3Fssl%3D1&f=1&nofb=1&ipt=63e8e92612698422f80cd2e68d683a71fef4e13f7acd0377020d4bab370da50a&ipo=images"
          fields={{
            Name: user.name,
            Email: user.email,
            Verified: user.isVerified ? "✅" : "❌",
          }}
        />
      )}
    </>
  );
}
