import { Observable, of } from "rxjs";
import { delay } from "rxjs";
import { 
  BillingResponse,
  TenantPayment,
  GenerateBillRequest,
  BillingRequest,
  RecordPaymentRequest,
  TenantBillHistoryItem
 } from "../models/billing-module/billing-DTO.model";
import { BillingModel } from "../models/billing-module/billing-module.model"; 
import { PaymentStatus } from "../models/billing-module/billing-module.model";
import { getRoomById, getRoomsByPropertyId } from "./room.data";
import { RoomResponse } from "../models/room-module/room-DTO.model";
import { testRooms } from "./room.data";

export const testBilling: BillingModel[] = [

  // =========================================
  // TENANT 1 - PRIYA
  // Room 1 - Property 1
  // =========================================
  {
    id: 1,
    roomId: 1,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 12000,
    electricityUnit: '85',
    electricity: '850',
    water: '300',
    maintenance: '500',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 13650,
    paymentStatus: 'PAID',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-05',
    note: 'Rent paid through UPI',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-05'
  },

  // =========================================
  // TENANT 2 - ROHIT
  // Room 2 - Property 1
  // =========================================
  {
    id: 2,
    roomId: 2,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 10000,
    electricityUnit: '70',
    electricity: '700',
    water: '300',
    maintenance: '500',
    otherCharges: '200',
    otherChargesDescription: 'Parking',
    totalAmount: 11700,
    paymentStatus: 'PAID',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-06',
    note: 'Payment received',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-06'
  },

  // =========================================
  // TENANT 3 - NEHA
  // Room 7 - Property 3
  // =========================================
  {
    id: 3,
    roomId: 7,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 18000,
    electricityUnit: '110',
    electricity: '1100',
    water: '400',
    maintenance: '600',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 20100,
    paymentStatus: 'PENDING',
    paymentDueDate: '2026-08-01',
    paymentDate: '',
    note: 'Payment pending',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-01'
  },

  // =========================================
  // TENANT 4 - SNEHA
  // Room 10 - Property 4
  // =========================================
  {
    id: 4,
    roomId: 10,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 10000,
    electricityUnit: '65',
    electricity: '650',
    water: '250',
    maintenance: '400',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 11300,
    paymentStatus: 'PARTIAL',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-08',
    note: 'Partial payment received',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-08'
  },

  // =========================================
  // TENANT 5 - PRIYA
  // Room 7 - Property 3
  // =========================================
  {
    id: 5,
    roomId: 7,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 18000,
    electricityUnit: '90',
    electricity: '900',
    water: '400',
    maintenance: '600',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 19900,
    paymentStatus: 'PAID',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-04',
    note: 'Payment received',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-04'
  },

  // =========================================
  // TENANT 6 - ROHIT
  // Room 15 - Property 6
  // =========================================
  {
    id: 6,
    roomId: 15,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 9000,
    electricityUnit: '60',
    electricity: '600',
    water: '250',
    maintenance: '350',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 10200,
    paymentStatus: 'PENDING',
    paymentDueDate: '2026-08-01',
    paymentDate: '',
    note: 'Awaiting payment',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-01'
  },

  // =========================================
  // TENANT 7 - NEHA
  // Room 5 - Property 2
  // =========================================
  {
    id: 7,
    roomId: 5,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 15000,
    electricityUnit: '85',
    electricity: '850',
    water: '350',
    maintenance: '500',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 16700,
    paymentStatus: 'PAID',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-07',
    note: 'Paid through bank transfer',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-07'
  },

  // =========================================
  // TENANT 8 - PRAPTI
  // Room 5 - Property 2
  // =========================================
  {
    id: 8,
    roomId: 5,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 15000,
    electricityUnit: '80',
    electricity: '800',
    water: '350',
    maintenance: '500',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 16650,
    paymentStatus: 'PARTIAL',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-09',
    note: 'Partial payment received',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-09'
  }

];

export const testTenantPayments: TenantPayment[] = [
  {
    id: 1,
    billId: 1,
    tenantId: 101,
    shareAmount: 8600,
    amountPaid: 8600,
    paymentStatus: 'PAID',
    paymentDate: '2026-01-05',
    note: null,
    createdDate: '2026-01-01T00:00:00.000Z',
    updatedDate: '2026-01-05T00:00:00.000Z'
  },
  {
    id: 2,
    billId: 2,
    tenantId: 102,
    shareAmount: 5385,
    amountPaid: 5385,
    paymentStatus: 'PAID',
    paymentDate: '2026-01-08',
    note: null,
    createdDate: '2026-01-01T00:00:00.000Z',
    updatedDate: '2026-01-08T00:00:00.000Z'
  },
  {
    id: 3,
    billId: 2,
    tenantId: 103,
    shareAmount: 5385,
    amountPaid: 0,
    paymentStatus: 'PENDING',
    paymentDate: null,
    note: null,
    createdDate: '2026-01-01T00:00:00.000Z',
    updatedDate: '2026-01-01T00:00:00.000Z'
  }
];

let nextBillId = testBilling.length + 1;
let nextPaymentId = testTenantPayments.length + 1;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function currentMonthYear(): { month: string; year: string } {
  const now = new Date();
  return { month: MONTH_NAMES[now.getMonth()], year: String(now.getFullYear()) };
}

function billingPeriodKey(bill: BillingModel): string {
  const idx = MONTH_NAMES.indexOf(bill.billingMonth);
  const mm = String(idx + 1).padStart(2, '0');
  return `${bill.billingYear}-${mm}`;
}

/** Recomputes a bill's status from its tenant payments — always the source of truth */
function deriveBillStatus(billId: number): PaymentStatus {
  const payments = testTenantPayments.filter((p) => p.billId === billId);
  if (payments.length === 0) return 'PENDING';
  if (payments.every((p) => p.paymentStatus === 'PAID')) return 'PAID';
  if (payments.some((p) => p.paymentStatus === 'PAID')) return 'PARTIAL';
  return 'PENDING';
}

export function generateBill(request: GenerateBillRequest): Observable<BillingResponse> {
  const room = getRoomById(request.roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const previousReading = room.lastMeterReading ?? 0;
  const unitsConsumed = Math.max(request.electricityUnit - previousReading, 0);
  const electricityCost = unitsConsumed * room.lightPerUnit;

  const { month, year } = currentMonthYear();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 10);

  const bill: BillingResponse = {
    id: nextBillId++,
    roomId: room.id,
    billingMonth: month,
    billingYear: year,
    rentAmount: room.baseRent,
    electricityUnit: unitsConsumed.toString(),
    electricity: electricityCost.toFixed(2),
    water: String(room.waterCharges),
    maintenance: null,
    otherCharges: null,
    otherChargesDescription: null,
    totalAmount: room.baseRent + electricityCost + room.waterCharges,
    paymentStatus: 'PENDING',
    paymentDueDate: dueDate.toISOString().slice(0, 10),
    paymentDate: new Date().toISOString(),
    note: null,
    entryDate: new Date().toISOString(),
    updatedDate: new Date().toISOString()
  };

  testBilling.push(bill);
  room.lastMeterReading = request.electricityUnit;

  // auto-split equally among current tenants in the room
  const tenantCount = room.tenantIds?.length ?? 1;
  const shareAmount = Math.round((bill.totalAmount / tenantCount) * 100) / 100;
  room.tenantIds?.forEach((tenantId) => {
    testTenantPayments.push({
      id: nextPaymentId++,
      billId: bill.id,
      tenantId,
      shareAmount,
      amountPaid: 0,
      paymentStatus: 'PENDING',
      paymentDate: null,
      note: null,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    });
  });

  return of(bill).pipe(delay(300));
}

export function getTestBills(filters?: BillingRequest): Observable<BillingModel[]> {
  let result = [...testBilling];

  if (filters?.roomId) {
    result = result.filter((b) => b.roomId === filters.roomId);
  }
  if (filters?.propertyId) {
    const roomIds = testRooms.filter((r) => r.propertyId === filters.propertyId).map((r) => r.id);
    result = result.filter((b) => roomIds.includes(b.roomId));
  }
  if (filters?.month) {
    result = result.filter((b) => billingPeriodKey(b) === filters.month);
  }

  result = result.map((b) => ({ ...b, paymentStatus: deriveBillStatus(b.id) }));
  return of(result).pipe(delay(300));
}

export function getTestBillById(id: number): Observable<BillingModel> {
  const bill = testBilling.find((b) => b.id === id);
  const withStatus = bill ? { ...bill, paymentStatus: deriveBillStatus(bill.id) } : (bill as unknown as BillingModel);
  return of(withStatus).pipe(delay(300));
}

export function getTestTenantPayments(billId: number): Observable<TenantPayment[]> {
  return of(testTenantPayments.filter((p) => p.billId === billId)).pipe(delay(300));
}

export function recordTestPayment(request: RecordPaymentRequest): Observable<TenantPayment> {
  const payment = testTenantPayments.find((p) => p.id === request.tenantPaymentId);
  if (!payment) {
    throw new Error('Payment not found');
  }

  payment.amountPaid = request.amountPaid;
  payment.paymentDate = request.paymentDate;
  payment.paymentStatus = request.amountPaid >= payment.shareAmount ? 'PAID' : 'PARTIAL';
  payment.updatedDate = new Date().toISOString();

  return of(payment).pipe(delay(300));
}

export function getTestPendingRooms(): Observable<typeof testRooms> {
  const { month, year } = currentMonthYear();
  const billedRoomIds = testBilling
    .filter((b) => b.billingMonth === month && b.billingYear === year)
    .map((b) => b.roomId);

  // only occupied rooms need a bill — vacant rooms never appear here
  const pending = testRooms.filter((r) => !billedRoomIds.includes(r.id) && (r.tenantIds?.length ?? 0) > 0);
  return of(pending).pipe(delay(300));
}

export function getTestTenantBillHistory(
  tenantId: number
): Observable<TenantBillHistoryItem[]> {

  const payments = testTenantPayments.filter(
    (p) => p.tenantId === tenantId
  );

  const history = payments
    .map((payment): TenantBillHistoryItem | null => {
      const bill = testBilling.find(
        (b) => b.id === payment.billId
      );

      if (!bill) {
        return null;
      }

      return {
        bill: {
          ...bill,
          paymentStatus: deriveBillStatus(bill.id),
        },
        payment,
      };
    })
    .filter(
      (item): item is TenantBillHistoryItem => item !== null
    )
    .sort(
      (a, b) =>
        new Date(b.bill.entryDate).getTime() -
        new Date(a.bill.entryDate).getTime()
    );

  return of(history).pipe(delay(300));
}


export function getAllBills(): BillingResponse[] | undefined {
  return testBilling;
}

export function getBillById(id: number): BillingResponse | undefined {
  return testBilling.find(b => b.id === id);
}