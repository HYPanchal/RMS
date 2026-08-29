export interface RegiesterPropertyRequest {
    owner: number;
    propertyName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    propertyType: string;
    totalRooms: number;
}

export interface PropertyRequest {
    owner: number;
    propertyName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    propertyType: string;
    totalRooms: number;
}

export interface PropertyResponse {
    id: number;
    owner: number;
    propertyName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    propertyType: string;
    totalRooms: number;
    occupiedRooms: number;
    availableRooms: number;
    createdDate: string;
    updatedDate: string;
}