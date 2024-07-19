import {User} from "../../entities/User"

export interface IUserRepository {
    Create(user: User): Promise<User>
    GetById(id: string): Promise<User | null>
    GetByEmail(email: string): Promise<User | null>
    Update(user: User): Promise<User>
    Delete(id: string): Promise<void>
}