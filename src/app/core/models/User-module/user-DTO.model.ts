import { Roles } from "../Roles.model";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;       
  userRole: Roles;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

// export interface RegisterResponse {
//   id: number;
//   username: string;
//   email: string;
//   userRole: Roles;
//   fullName: string;
//   message?: string;
// }

export interface UserRequest {
  username: string;
  email: string;      
  // userRole: Roles;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isActive: boolean;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;     
  // userRole: Roles;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isActive: boolean;
}