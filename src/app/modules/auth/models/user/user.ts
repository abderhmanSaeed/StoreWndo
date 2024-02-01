export interface User {
    id?: string,
    name?: string,
    email?: string,
    imagePath?: string,
    isRemoved?: boolean,
    access_Token?: string,
    refresh_Token?: string,
    expires_In?: number,
    token_Type?: string,
    scope?: 'offline_access WndoApp',
    userName?: string,
    isVerified?: boolean,
    isSeller?: boolean,
    isActiveSeller?: boolean,
    isFirstLogin?: boolean,
    isExternalProvider?: boolean
}
