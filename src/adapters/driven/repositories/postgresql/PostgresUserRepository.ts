import {User} from "../../../../domain/entities/User"
import {IUserRepository} from "../../../../ports/driven/repositories/IUserRepository"

export class PostgresUserRepository implements IUserRepository {
    public async Create(user: User): Promise<User> {
        throw new Error("Method not implemented.")
    }
    public async GetById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.")
    }
    public async GetByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.")
    }
    public async Update(user: User): Promise<User> {
        throw new Error("Method not implemented.")
    }
    public async Delete(id: string): Promise<void> {
        throw new Error("Method not implemented.")
    }
}