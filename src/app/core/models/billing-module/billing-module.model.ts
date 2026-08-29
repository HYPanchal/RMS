export interface BillingModel{
    id: number;
    tenantId: number;
    roomId: number;
    billingMonth: string;
    billingYear: string;
    rentAmount: number;
    electricity: string;
    water: string;
    maintenance: string | null;
    otherCharges:  string | null;
    otherChargesDescription: string | null;
    totalAmount: number;
    paymentStatus: string;
    amountPaid: string | null;
    paymentDueDate: string;
    paymentDate: string | null;
    note: string | null;
    entryDate: string;
    updatedDate: string;
}