import { Roles } from "../Roles.model";

export interface RegisterRequest {
    userName: string;
    role: Roles;
    fullName: string;
    contactPhone: string;
    email: string;
    emergencyContact: string;
    emergencyPhone: string;
    idProofType: string;
    idProofNumber: string;
    occupation: string;
}

export interface TenantRequest {
    user: number | null;
    property: number | null;
    userName: string;
    role: Roles; 
    fullName: string;
    contactPhone: string;
    email: string;
    moveInDate: string;
    moveOutDate: string;
    emergencyContact: string;
    emergencyPhone: string;
    idProofType: string;
    idProofNumber: string;
    occupation: string;
}

export interface TenantResponse {
    id: number;
    user: number | null;
    property: number | null;
    userName: string;
    role: Roles; 
    fullName: string;
    contactPhone: string;
    email: string;
    moveInDate: string;
    moveOutDate: string;
    emergencyContact: string;
    emergencyPhone: string;
    idProofType: string;
    idProofNumber: string;
    occupation: string;
}