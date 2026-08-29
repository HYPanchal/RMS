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

export enum Roles {
    OWNER = 'OWNER',
    TENANT = 'TENANT',
    ADMIN = 'ADMIN'
}