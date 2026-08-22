export interface BillingRequest{
    id: number;
    tenantId: number;
    propertyId: number;
    
}

export interface BillingResponse {
    id: number;
    tenantId: number;
    roomId: number;
    billingMonth: string;
    billingYear: string;
    rentAmount: number;
    electricity: string;
    water: string;
    maintenance: string | null;
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