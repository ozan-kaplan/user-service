import {User} from "../entities/User"

export interface IUserRepository {
    Create(user: User): Promise<User>
    GetById(id: number): Promise<User | null>
    GetByEmail(email: string): Promise<User | null>
    Update(user: User): Promise<User>
    Delete(id: number): Promise<boolean>
}