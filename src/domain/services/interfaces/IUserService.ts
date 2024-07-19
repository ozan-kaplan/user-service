import {Role} from "../../entities/Role"
import {User} from "../../entities/User"

export interface IUserService {
    Create(email: string, password: string, role?: Role): Promise<User>
}