import { RoomType, RoomStatus } from "./room.model";

export interface RegirsterRoomRequest {
    propertyId: number;
    roomNumber: string;
    floorNumber: string;
    roomType: RoomType;
    roomStatus: RoomStatus;
    baseRent: number;
    lightPerUnit: number;
    waterCharges: number;
    securityDeposit: number;
    maxOccupancy: number;
}

export interface RoomRequest {
    propertyId?: number;
    tenantId?: number;
    roomStatus?: RoomStatus;
}

export interface RoomUpdateRequest {
    propertyId: number;
    tenantIds: number[] | null;
    roomNumber: string;
    floorNumber: string;
    roomType: RoomType;
    roomStatus: RoomStatus;
    baseRent: number;
    lightPerUnit: number;
    waterCharges: number;
    securityDeposit: number;
    maxOccupancy: number;
    currentOccupancy: number | null;
}

export interface RoomResponse {
    id: number;
    propertyId: number;
    tenantIds: number[] | null,
    roomNumber: string;
    floorNumber: string;
    roomType: RoomType;
    roomStatus: RoomStatus;
    baseRent: number;
    lightPerUnit: number;
    waterCharges: number;
    securityDeposit: number;
    maxOccupancy: number;
    currentOccupancy: number | null;
    createdDate: string;
    updatedDate: string;
}