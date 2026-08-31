import { Roles } from "../User-module/user.model";
import { IdType } from "./tenant.model";

export interface RegisterTenantRequest {
    userName: string;
    role: Roles;
    fullName: string;
    contactPhone: string;
    email: string;
    emergencyContact: string;
    emergencyPhone: string;
    idProofType: IdType;
    idProofNumber: string;
    occupation: string;
    isActive: boolean;
}

export interface TenantUpdateRequest {
    user: number | null;
    property: number | null;
    userName: string;
    role: Roles; 
    fullName: string;
    contactPhone: string;
    email: string;
    moveInDate: string | null;
    moveOutDate: string | null;
    emergencyContact: string;
    idProofType: IdType;
    idProofNumber: string;
    occupation: string;
    isActive: boolean;
}

export interface TenantRequest {
    userId?: number; 
    propertyId?: number; 
    roomId?: number;
    tenantId?: number;
}

export interface TenantResponse {
    id: number;
    user: number | null;
    property: number | null;
    userName: string;
    role: Roles; 
    fullName: string;
    contactPhone: string;
    emergencyPhone: string;
    email: string;
    moveInDate: string | null;
    moveOutDate: string | null;
    emergencyContact: string;
    idProofType: IdType;
    idProofNumber: string;
    occupation: string;
    isActive: boolean;
    createdDate: string;
    updatedDate: string;
}