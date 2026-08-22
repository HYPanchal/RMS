import { RoomType, RoomStatus } from "./room.model";

export interface RoomRequest {
    propertyId: number;
    tenantId: number | null;
    roomNumber: string;
    floorNumber: string;
    roomType: RoomType;
    roomStatus: RoomStatus;
    baseRent: number;
    lightPerUnit: number;
    waterCharges: number;
    securityDeposit: number;
    maxOccupancy: number;
    currentOccupancy: number
}

export interface RoomResponse {
    id: number;
    tenantId: number[] | null,
    roomNumber: string;
    floorNumber: string;
    roomType: RoomType;
    roomStatus: RoomStatus;
    baseRent: number;
    lightPerUnit: number;
    waterCharges: number;
    securityDeposit: number;
    maxOccupancy: number;
    currentOccupancy: number;
    createdDate: string;
    updatedDate: string;
}