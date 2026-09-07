export interface BillingModel{
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

export type PaymentStatus = 'PAID' | 'PARTIAL' | 'PENDING';