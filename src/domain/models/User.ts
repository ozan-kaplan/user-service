export interface User {
    id: string
    createdAt: Date
    updatedAt: Date
    status: UserStatus
    name: string
    lastname: string
    phone: string
    email: string
    password: string
    salt: string
    refreshToken?: string | null
    refreshTokenExp?: Date | null
    resetPasswordToken?: string | null
}

export enum UserStatus {
    FIRST_LOGIN_PENDING = "FIRST_LOGIN_PENDING",
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
}

export enum Authority {
    SYS_ADMIN = "SYS_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
}