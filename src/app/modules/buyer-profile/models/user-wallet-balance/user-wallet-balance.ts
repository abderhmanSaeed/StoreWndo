export interface UserWalletBalance {
    walletBalance?: number,
    currentMonthTrans?: CurrentMonthTransData[],
    walletPercentages: WalletPercentages,
    monthWithYearList?: MonthWithYearListItem[]
}


export interface CurrentMonthTransData {
    date?: string,
    amount?: number,
    actionType?: string,
    transactionType?: string,
    transactionTypeE?: number
}

export interface WalletPercentages {
    topUps: number,
    sales: number
}


export interface MonthWithYearListItem {
    month: number,
    monthName: string,
    year: number
}
