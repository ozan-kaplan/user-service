import {Permission} from "./Permission"

export interface Role {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    permissions?: Permission[]
}