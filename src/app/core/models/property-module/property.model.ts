export interface Property {
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

export enum PropertyType {
  APERTMENT = 'APARTMENT',
  PG = 'PG',
  VILLA = 'VILLA',
  FLAT = 'FLAT'
}