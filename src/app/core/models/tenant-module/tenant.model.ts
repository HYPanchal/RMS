import { Roles } from "../User-module/user.model";

export interface Tenant{
    id: number;
    user: number | null;
    property: number | null;
    userName: string;
    passwordHash: string;
    role: Roles; 
    fullName: string;
    contactPhone: string;
    email: string;
    moveInDate: string | null;
    moveOutDate: string | null;
    emergencyContact: string;
    emergencyPhone: string;
    idProofType: IdType;
    idProofNumber: string;
    occupation: string;
    isActive: boolean;
    createdDate: string;
    updatedDate: string;
}

export enum IdType {
    AADHARCARD = 'AADHARCARD',
    PANCARD = 'PANCARD',
    DRIVING_LICENSE = 'DRIVING_LICENSE',
    PASSPORT = 'PASSPORT'
}