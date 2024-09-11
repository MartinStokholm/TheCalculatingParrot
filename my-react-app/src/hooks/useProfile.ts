import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt.types";
import { useGetUserQuery } from "../redux/api/endpoints/calculatingParrotApi";
import { RootState } from "../redux/store";

export function useProfile() {
  const token = useSelector((state: RootState) => state.auth.token);
  const decodedToken = token ? jwtDecode<JwtPayload>(token) : null;

  // Use a dummy or empty string for userId if no token is present
  const userId = decodedToken ? decodedToken.id : "";

  const { data: user, error, isLoading } = useGetUserQuery({ userId });

  return { user, isLoading, error, token };
}
