import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RegirsterRoomRequest, RoomResponse } from "../models/room-module/room-DTO.model";
import { RoomModel, RoomType, RoomStatus } from "../models/room-module/room.model";

export const testRooms: RoomModel[] = [

  // =========================
  // PROPERTY 1
  // =========================

  {
    id: 1,
    propertyId: 1,
    tenantIds: [1],
    roomNumber: '101',
    floorNumber: '1',
    roomType: RoomType.SINGLE,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 12000,
    lightPerUnit: 10,
    lastMeterReading: 1250,
    waterCharges: 300,
    securityDeposit: 24000,
    maxOccupancy: 1,
    currentOccupancy: 1,
    createdDate: '2026-01-05',
    updatedDate: '2026-08-01'
  },
  {
    id: 2,
    propertyId: 1,
    tenantIds: [2, 3, 4],
    roomNumber: '102',
    floorNumber: '1',
    roomType: RoomType.DOUBLE,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 10000,
    lightPerUnit: 10,
    lastMeterReading: 1250,
    waterCharges: 300,
    securityDeposit: 20000,
    maxOccupancy: 3,
    currentOccupancy: 3,
    createdDate: '2026-01-05',
    updatedDate: '2026-08-01'
  },
  {
    id: 3,
    propertyId: 1,
    tenantIds: [5],
    roomNumber: '103',
    floorNumber: '1',
    roomType: RoomType.SINGLE,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 12000,
    lightPerUnit: 10,
    lastMeterReading: 1250,
    waterCharges: 300,
    securityDeposit: 24000,
    maxOccupancy: 1,
    currentOccupancy: 1,
    createdDate: '2026-01-05',
    updatedDate: '2026-08-05'
  },

  // =========================
  // PROPERTY 2
  // =========================

  {
    id: 4,
    propertyId: 2,
    tenantIds: [5, 6],
    roomNumber: '201',
    floorNumber: '2',
    roomType: RoomType.ONE_BHK,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 15000,
    lightPerUnit: 11,
    lastMeterReading: 1250,
    waterCharges: 350,
    securityDeposit: 30000,
    maxOccupancy: 2,
    currentOccupancy: 1,
    createdDate: '2026-01-10',
    updatedDate: '2026-08-02'
  },
  {
    id: 5,
    propertyId: 2,
    tenantIds: [7, 8],
    roomNumber: '202',
    floorNumber: '2',
    roomType: RoomType.ONE_BHK,
    roomStatus: RoomStatus.VACANT,
    baseRent: 15000,
    lightPerUnit: 11,
    lastMeterReading: 1250,
    waterCharges: 350,
    securityDeposit: 30000,
    maxOccupancy: 2,
    currentOccupancy: 0,
    createdDate: '2026-01-10',
    updatedDate: '2026-08-02'
  },
  {
    id: 6,
    propertyId: 2,
    tenantIds: null,
    roomNumber: '203',
    floorNumber: '2',
    roomType: RoomType.DOUBLE,
    roomStatus: RoomStatus.RESERVED,
    baseRent: 13000,
    lightPerUnit: 11,
    lastMeterReading: 1250,
    waterCharges: 350,
    securityDeposit: 26000,
    maxOccupancy: 2,
    currentOccupancy: 0,
    createdDate: '2026-01-10',
    updatedDate: '2026-08-06'
  },

  // =========================
  // PROPERTY 3
  // =========================

  {
    id: 7,
    propertyId: 3,
    tenantIds: [3, 5],
    roomNumber: '301',
    floorNumber: '3',
    roomType: RoomType.TWO_BHK,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 18000,
    lightPerUnit: 12,
    lastMeterReading: 1250,
    waterCharges: 400,
    securityDeposit: 36000,
    maxOccupancy: 4,
    currentOccupancy: 1,
    createdDate: '2026-01-15',
    updatedDate: '2026-08-03'
  },
  {
    id: 8,
    propertyId: 3,
    tenantIds: null,
    roomNumber: '302',
    floorNumber: '3',
    roomType: RoomType.ONE_BHK,
    roomStatus: RoomStatus.VACANT,
    baseRent: 16000,
    lightPerUnit: 12,
    lastMeterReading: 1250,
    waterCharges: 400,
    securityDeposit: 32000,
    maxOccupancy: 2,
    currentOccupancy: 0,
    createdDate: '2026-01-15',
    updatedDate: '2026-08-03'
  },
  {
    id: 9,
    propertyId: 3,
    tenantIds: null,
    roomNumber: '303',
    floorNumber: '3',
    roomType: RoomType.SINGLE,
    roomStatus: RoomStatus.MAINTENANCE,
    baseRent: 14000,
    lightPerUnit: 12,
    lastMeterReading: 1250,
    waterCharges: 400,
    securityDeposit: 28000,
    maxOccupancy: 1,
    currentOccupancy: 0,
    createdDate: '2026-01-15',
    updatedDate: '2026-08-07'
  },

  // =========================
  // PROPERTY 4
  // =========================

  {
    id: 10,
    propertyId: 4,
    tenantIds: [4, 5],
    roomNumber: '401',
    floorNumber: '4',
    roomType: RoomType.DOUBLE,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 10000,
    lightPerUnit: 9,
    lastMeterReading: 1250,
    waterCharges: 250,
    securityDeposit: 20000,
    maxOccupancy: 2,
    currentOccupancy: 1,
    createdDate: '2026-01-20',
    updatedDate: '2026-08-04'
  },
  {
    id: 11,
    propertyId: 4,
    tenantIds: null,
    roomNumber: '402',
    floorNumber: '4',
    roomType: RoomType.SINGLE,
    roomStatus: RoomStatus.VACANT,
    baseRent: 9000,
    lightPerUnit: 9,
    lastMeterReading: 1250,
    waterCharges: 250,
    securityDeposit: 18000,
    maxOccupancy: 1,
    currentOccupancy: 0,
    createdDate: '2026-01-20',
    updatedDate: '2026-08-04'
  },
  {
    id: 12,
    propertyId: 4,
    tenantIds: null,
    roomNumber: '403',
    floorNumber: '4',
    roomType: RoomType.DOUBLE,
    roomStatus: RoomStatus.RESERVED,
    baseRent: 10000,
    lightPerUnit: 9,
    lastMeterReading: 1250,
    waterCharges: 250,
    securityDeposit: 20000,
    maxOccupancy: 2,
    currentOccupancy: 0,
    createdDate: '2026-01-20',
    updatedDate: '2026-08-08'
  },

  // =========================
  // PROPERTY 5
  // =========================

  {
    id: 13,
    propertyId: 5,
    tenantIds: [2, 4],
    roomNumber: '501',
    floorNumber: '5',
    roomType: RoomType.ONE_BHK,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 20000,
    lightPerUnit: 12,
    lastMeterReading: 1250,
    waterCharges: 450,
    securityDeposit: 40000,
    maxOccupancy: 2,
    currentOccupancy: 1,
    createdDate: '2026-01-25',
    updatedDate: '2026-08-05'
  },
  {
    id: 14,
    propertyId: 5,
    tenantIds: null,
    roomNumber: '502',
    floorNumber: '5',
    roomType: RoomType.ONE_RK,
    roomStatus: RoomStatus.VACANT,
    baseRent: 14000,
    lightPerUnit: 12,
    lastMeterReading: 1250,
    waterCharges: 450,
    securityDeposit: 28000,
    maxOccupancy: 1,
    currentOccupancy: 0,
    createdDate: '2026-01-25',
    updatedDate: '2026-08-05'
  },

  // =========================
  // PROPERTY 6
  // =========================

  {
    id: 15,
    propertyId: 6,
    tenantIds: [6],
    roomNumber: '601',
    floorNumber: '6',
    roomType: RoomType.DOUBLE,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 9000,
    lightPerUnit: 9,
    lastMeterReading: 1250,
    waterCharges: 250,
    securityDeposit: 18000,
    maxOccupancy: 2,
    currentOccupancy: 1,
    createdDate: '2026-01-30',
    updatedDate: '2026-08-06'
  },
  {
    id: 16,
    propertyId: 6,
    tenantIds: null,
    roomNumber: '602',
    floorNumber: '6',
    roomType: RoomType.SINGLE,
    roomStatus: RoomStatus.VACANT,
    baseRent: 8500,
    lightPerUnit: 9,
    lastMeterReading: 1250,
    waterCharges: 250,
    securityDeposit: 17000,
    maxOccupancy: 1,
    currentOccupancy: 0,
    createdDate: '2026-01-30',
    updatedDate: '2026-08-06'
  },
  {
    id: 17,
    propertyId: 6,
    tenantIds: null,
    roomNumber: '603',
    floorNumber: '6',
    roomType: RoomType.SINGLE,
    roomStatus: RoomStatus.MAINTENANCE,
    baseRent: 8500,
    lightPerUnit: 9,
    lastMeterReading: 1250,
    waterCharges: 250,
    securityDeposit: 17000,
    maxOccupancy: 1,
    currentOccupancy: 0,
    createdDate: '2026-01-30',
    updatedDate: '2026-08-09'
  },

  // =========================
  // PROPERTY 7
  // =========================

  {
    id: 18,
    propertyId: 7,
    tenantIds: [1, 3],
    roomNumber: '701',
    floorNumber: '7',
    roomType: RoomType.ONE_BHK,
    roomStatus: RoomStatus.OCCUPIED,
    baseRent: 16000,
    lightPerUnit: 11,
    lastMeterReading: 1250,
    waterCharges: 350,
    securityDeposit: 32000,
    maxOccupancy: 2,
    currentOccupancy: 1,
    createdDate: '2026-02-01',
    updatedDate: '2026-08-07'
  },
  {
    id: 19,
    propertyId: 7,
    tenantIds: null,
    roomNumber: '702',
    floorNumber: '7',
    roomType: RoomType.TWO_BHK,
    roomStatus: RoomStatus.VACANT,
    baseRent: 22000,
    lightPerUnit: 11,
    lastMeterReading: 1250,
    waterCharges: 350,
    securityDeposit: 44000,
    maxOccupancy: 4,
    currentOccupancy: 0,
    createdDate: '2026-02-01',
    updatedDate: '2026-08-07'
  },
  {
    id: 20,
    propertyId: 7,
    tenantIds: null,
    roomNumber: '703',
    floorNumber: '7',
    roomType: RoomType.ONE_RK,
    roomStatus: RoomStatus.RESERVED,
    baseRent: 13000,
    lightPerUnit: 11,
    lastMeterReading: 1250,
    waterCharges: 350,
    securityDeposit: 26000,
    maxOccupancy: 1,
    currentOccupancy: 0,
    createdDate: '2026-02-01',
    updatedDate: '2026-08-10'
  }
];

export function getAllRooms(): RoomResponse[] {
  return testRooms;
}

export function getRoomsByPropertyId(propertyId: number): RoomResponse[] | undefined {
  return testRooms.filter(r => r.propertyId === propertyId);
}

export function getRoomById(id: number): RoomResponse | undefined {
  return testRooms.find(r => r.id === id);
}

export function getRoomByTenantId(tenantId: number): RoomResponse | undefined {
  return testRooms.find(r => r.tenantIds?.includes(tenantId));
}

export function createRoom(body: RegirsterRoomRequest): void {
  const room: RoomModel = {
    id: testRooms.length + 1,
    propertyId: body.propertyId,
    tenantIds: null,
    roomNumber: body.roomNumber,
    floorNumber: body.floorNumber,
    roomType: body.roomType,
    roomStatus: body.roomStatus,
    baseRent: body.baseRent,
    lightPerUnit: body.lightPerUnit,
    lastMeterReading: body.lastMeterReading,
    waterCharges: body.waterCharges,
    securityDeposit: body.securityDeposit,
    maxOccupancy: body.maxOccupancy,
    currentOccupancy: 0,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString()
  };

  testRooms.push(room);
  console.log("Room created..!");
  console.log(room);
}

// 🆕 needed by generate-bill and bill-details pages
export function getTestRoomById(id: number): Observable<RoomResponse> {
  const room = testRooms.find((r) => r.id === id);
  return of(room as RoomResponse).pipe(delay(300));
}