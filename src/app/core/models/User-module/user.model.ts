import { Roles } from "../Roles.model";

export interface User{
    id: number;
    username: string;
    email:string;
    passwordHash: string;
    userRole: Roles;
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    isActive: boolean;
    createdDate: string;
    updatedDate: string;
}