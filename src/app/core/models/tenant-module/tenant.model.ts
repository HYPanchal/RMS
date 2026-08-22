import { Roles } from "../Roles.model";

export interface Tenant{
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
    createdDate: string;
    updatedDate: string;
}