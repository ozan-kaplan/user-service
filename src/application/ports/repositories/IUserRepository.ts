import {User} from "../../../domain/models/User"

export interface IUserRepository {
    Create(user: User): Promise<User>;
    Update(user: User): Promise<User>;
    Delete(id: string): Promise<void>;
    FindById(id: string): Promise<User | null>;
    FindByEmail(email: string): Promise<User | null>;
    FindByRefreshToken(refreshToken: string): Promise<User | null>;
    FindAll(skip: number, take: number): Promise<User[]>;
}