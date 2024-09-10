import { JwtPayload as BaseJwtPayload } from "jwt-decode";

// Extend the JwtPayload type to include additional properties
export interface JwtPayload extends BaseJwtPayload {
  id: string;
  username: string; // Add your custom property here
}
