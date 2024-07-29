import {Authority} from "../../../domain/models/User"

export interface CreateUserCommand {
    name: string,
    lastname: string,
    phone: string,
    email: string,
    password: string
}