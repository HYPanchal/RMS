import { PropertyResponse, RegiesterPropertyRequest } from "../models/property-module/property-DTO.model";
import { Property } from "../models/property-module/property.model"; 

const testProperties: Property[] = [
  {
    id: 1,
    owner: 2,
    propertyName: 'Sunrise Residency',
    address: 'Baner Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411045',
    propertyType: 'PG',
    totalRooms: 10,
    occupiedRooms: 8,
    availableRooms: 2,
    createdDate: '2026-01-10',
    updatedDate: '2026-08-01'
  },
  {
    id: 2,
    owner: 2,
    propertyName: 'Green View Apartments',
    address: 'Aundh Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411007',
    propertyType: 'Apartment',
    totalRooms: 8,
    occupiedRooms: 6,
    availableRooms: 2,
    createdDate: '2026-01-12',
    updatedDate: '2026-08-01'
  },
  {
    id: 3,
    owner: 3,
    propertyName: 'Royal Heights',
    address: 'Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    propertyType: 'Apartment',
    totalRooms: 12,
    occupiedRooms: 10,
    availableRooms: 2,
    createdDate: '2026-01-15',
    updatedDate: '2026-08-02'
  },
  {
    id: 4,
    owner: 3,
    propertyName: 'City Nest',
    address: 'Wakad',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    propertyType: 'PG',
    totalRooms: 15,
    occupiedRooms: 12,
    availableRooms: 3,
    createdDate: '2026-01-18',
    updatedDate: '2026-08-03'
  },
  {
    id: 5,
    owner: 2,
    propertyName: 'Lake View Homes',
    address: 'Viman Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411014',
    propertyType: 'Apartment',
    totalRooms: 6,
    occupiedRooms: 5,
    availableRooms: 1,
    createdDate: '2026-01-20',
    updatedDate: '2026-08-04'
  },
  {
    id: 6,
    owner: 3,
    propertyName: 'Sai Comforts',
    address: 'Hadapsar',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411028',
    propertyType: 'PG',
    totalRooms: 10,
    occupiedRooms: 7,
    availableRooms: 3,
    createdDate: '2026-01-25',
    updatedDate: '2026-08-05'
  },
  {
    id: 7,
    owner: 2,
    propertyName: 'Elite Residency',
    address: 'Hinjewadi',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411057',
    propertyType: 'Apartment',
    totalRooms: 10,
    occupiedRooms: 9,
    availableRooms: 1,
    createdDate: '2026-01-28',
    updatedDate: '2026-08-06'
  }
];

export function getAllProperties(): PropertyResponse[] {
  return testProperties;
}

export function getPropertyById(id: number): PropertyResponse | undefined {
  return testProperties.find(p => p.id === id);
}

export function createProperty(body: RegiesterPropertyRequest): void {

  const property: Property = {
    id: testProperties.length + 1,
    owner: body.owner,
    propertyName: body.propertyName,
    address: body.address,
    city: body.city,
    state: body.state,
    pincode: body.pincode,
    propertyType: body.propertyType,
    totalRooms: body.totalRooms,
    occupiedRooms: 0,
    availableRooms: body.totalRooms,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString()
  };

  testProperties.push(property);
}