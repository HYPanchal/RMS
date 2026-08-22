export interface BillingModel{
    id: number;
    tenantId: number;
    roomId: number;
    billingMonth: string;
    billingYear: string;
    rentAmount: number;
    electricity: string;
    water: string;
    maintenance: string;
    otherCharges:  string;
    otherChargesDescription: string;
    totalAmount: number;
    paymentStatus: string;
    amountPaind: string;
    paymentDate: string;
    note: string;
    entryDate: string;
    updatedDate: string;
}