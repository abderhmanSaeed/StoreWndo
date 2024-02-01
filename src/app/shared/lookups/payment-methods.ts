import { PaymentMethods } from "../enums/payment-methods/payment-methods";
import { PaymentMethod } from "../models/payment-method/payment-method";

export const paymentMethods: PaymentMethod[] = [
    {
        id: PaymentMethods.Cash,
        name: "paymentMethods",
        checked: true,
        value: "cash",
        label: "payment-methods.cash-on-delievery",
        sublabel: "payment-methods.extra-fee-will-be-applied",
        iconPath: "assets/media/svg/cash-gray.svg",
        activeIconPath: "assets/media/svg/cash.svg",
        width: 14
    },
    {
        id: PaymentMethods.Credit,
        name: "paymentMethods",
        checked: false,
        value: "credit",
        label: "payment-methods.credit-card",
        sublabel: "",
        iconPath: "assets/media/svg/credit.svg",
        activeIconPath: "assets/media/svg/credit-active.svg",
        width: 16
    },
    {
        id: PaymentMethods.Wallet,
        name: "paymentMethods",
        checked: false,
        value: "wallet",
        label: "payment-methods.e-wallet",
        sublabel: "payment-methods.wallet-balance",
        iconPath: "assets/media/svg/wallet.svg",
        activeIconPath: "assets/media/svg/wallet-active.svg",
        width: 16
    },
]