import {Permission} from "./Permission"

export interface Role {
    id: number
    createdAt: Date
    updatedAt: Date
    name: string
    permissions?: Permission[]
}