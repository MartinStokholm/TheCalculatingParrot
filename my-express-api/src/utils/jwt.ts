import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  username: string;
  email: string;
}

export const generateToken = (user: UserPayload): string => {
  return jwt.sign(
    { id: user.id, username: user.username }, // Payload
    process.env.JWT_SECRET as string, // Secret key
    { expiresIn: "3h" } // Expiration time
  );
};
