import {Role} from "./Role"

export interface Permission {
    id: string
    resource: string
    operation: string
    role: Role
}