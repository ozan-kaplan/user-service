import {Role} from "./Role"

export interface Permission {
    id: number
    resource: string
    operation: string
    role: Role
}