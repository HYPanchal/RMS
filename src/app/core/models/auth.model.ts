import { Roles } from "./User-module/user.model";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType?: string;
  expiresIn?: number;
  user?: AuthUser;
}

export interface AuthUser {
  id?: number;
  username?: string;
  email?: string;
  fullName?: string;
  userRole?: Roles;
  isActive?: boolean;
}