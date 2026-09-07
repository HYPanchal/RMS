import { BillingModel } from "./billing-module.model";

export interface BillingRequest{
    propertyId?: number;
    roomId?: number;
    month?: string;
}

export interface GenerateBillRequest {
    roomId: number;
    electricityUnit: number;
}

export interface BillingResponse {
    id: number;
    roomId: number;
    billingMonth: string;
    billingYear: string;
    rentAmount: number;
    electricityUnit: string;
    electricity: string;
    water: string;
    maintenance: string | null;
    otherCharges:  string | null;
    otherChargesDescription: string | null;
    totalAmount: number;
    paymentStatus: string;
    paymentDueDate: string;
    paymentDate: string | null;
    note: string | null;
    entryDate: string;
    updatedDate: string;
}

export interface TenantPayment {
  id: number;
  billId: number;
  tenantId: number;
  shareAmount: number;         // this tenant's portion of totalAmount (equal split by default)
  amountPaid: number;
  paymentStatus: string;       // 'PAID' | 'PENDING'
  paymentDate: string | null;
  note: string | null;
  createdDate: string;
  updatedDate: string;
}

export interface RecordPaymentRequest {
  tenantPaymentId: number;
  amountPaid: number;
  paymentDate: string;
}

// Combined shape for Tenant Details' billing history section
export interface TenantBillHistoryItem {
  bill: BillingModel;
  payment: TenantPayment;
}