export interface UserVouchers {
    active?: Voucher[],
    used?: Voucher[]
}


export interface Voucher {
    code?: string,
    isPercentage?: boolean,
    isFreeShipping?: boolean,
    amount?: number,
    usedDate?: string,
    expiryDate?: string
    id?: number
}
