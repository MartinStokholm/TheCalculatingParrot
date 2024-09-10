import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt.types";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getDecodedToken = () => {
  const token = getToken();
  if (!token) return null;

  return jwtDecode<JwtPayload>(token);
};

export const clearToken = () => {
  return localStorage.removeItem("token");
};

export const setToken = (token: string) => {
  return localStorage.setItem("token", token);
};

export const isTokenValid = () => {
  const decodedToken = getDecodedToken();

  if (!decodedToken) {
    return false;
  }

  try {
    if (!decodedToken.exp) {
      return false;
    }

    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Failed to decode token", error);
    return false;
  }
};
