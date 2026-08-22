export enum RoomStatus {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
  RESERVED = 'RESERVED'
}

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  ONE_RK = 'ONE_RK',
  ONE_BHK = 'ONE_BHK',
  TWO_BHK = 'TWO_BHK'
}

export interface RoomModel {
  id: number;
  propertyId: number;
  tenantId: number[] | null;      // null when vacant
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
//   amenities: string;           // comma-separated, or switch to string[] if your API returns an array
//   description: string;
  createdDate: string;
  updatedDate: string;
}
