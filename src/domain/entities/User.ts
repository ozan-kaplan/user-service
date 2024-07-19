import {Role} from "./Role"

export interface User {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    salt: string
    role?: Role
}