import {User} from "../../../domain/models/User"

export interface IUserRepository {
    Create(user: User): Promise<User>;
    Update(id: string, user: User): Promise<User>;
    Delete(id: string): Promise<void>;
    FindById(id: string): Promise<User | null>;
    FindAll(skip: number, take: number): Promise<User[]>;
}