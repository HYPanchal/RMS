import { BillingResponse } from "../models/billing-module/billing-DTO.model";
import { BillingModel } from "../models/billing-module/billing-module.model"; 

export const testBilling: BillingModel[] = [

  // =========================================
  // TENANT 1 - PRIYA
  // Room 1 - Property 1
  // =========================================
  {
    id: 1,
    tenantId: 1,
    roomId: 1,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 12000,
    electricity: '850',
    water: '300',
    maintenance: '500',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 13650,
    paymentStatus: 'PAID',
    amountPaid: '13650',
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
    tenantId: 2,
    roomId: 2,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 10000,
    electricity: '700',
    water: '300',
    maintenance: '500',
    otherCharges: '200',
    otherChargesDescription: 'Parking',
    totalAmount: 11700,
    paymentStatus: 'PAID',
    amountPaid: '11700',
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
    tenantId: 3,
    roomId: 7,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 18000,
    electricity: '1100',
    water: '400',
    maintenance: '600',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 20100,
    paymentStatus: 'PENDING',
    amountPaid: '0',
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
    tenantId: 4,
    roomId: 10,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 10000,
    electricity: '650',
    water: '250',
    maintenance: '400',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 11300,
    paymentStatus: 'PARTIAL',
    amountPaid: '6000',
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
    tenantId: 5,
    roomId: 7,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 18000,
    electricity: '900',
    water: '400',
    maintenance: '600',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 19900,
    paymentStatus: 'PAID',
    amountPaid: '19900',
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
    tenantId: 6,
    roomId: 15,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 9000,
    electricity: '600',
    water: '250',
    maintenance: '350',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 10200,
    paymentStatus: 'PENDING',
    amountPaid: '0',
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
    tenantId: 7,
    roomId: 5,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 15000,
    electricity: '850',
    water: '350',
    maintenance: '500',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 16700,
    paymentStatus: 'PAID',
    amountPaid: '16700',
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
    tenantId: 8,
    roomId: 5,
    billingMonth: '08',
    billingYear: '2026',
    rentAmount: 15000,
    electricity: '800',
    water: '350',
    maintenance: '500',
    otherCharges: '0',
    otherChargesDescription: '',
    totalAmount: 16650,
    paymentStatus: 'PARTIAL',
    amountPaid: '8000',
    paymentDueDate: '2026-08-01',
    paymentDate: '2026-08-09',
    note: 'Partial payment received',
    entryDate: '2026-08-01',
    updatedDate: '2026-08-09'
  }

];

export function getAllBills(): BillingResponse[] | undefined {
  return testBilling;
}

export function getBillById(id: number): BillingResponse | undefined {
  return testBilling.find(b => b.id === id);
}