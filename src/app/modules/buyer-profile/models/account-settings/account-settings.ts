import { City } from "src/app/shared/models/city/city";

export interface AccountSettings {
    email?: string,
    password?: number,
    phone?: string,
    city?: null | City,
    language?: any,
    isNotificationOn?: boolean,
    status?: any,
    isDarkMode?: boolean,
    shopStatus?: string,
    isExternalProvider?: boolean,
    paymentType?: number
}
