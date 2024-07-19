import {Role} from "./Role"

export interface User {
    id: number
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    role?: Role
}