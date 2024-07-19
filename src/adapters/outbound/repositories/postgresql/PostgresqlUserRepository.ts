import prisma from "../../../../infrastructure/config/prisma/PrismaConfig"
import {IUserRepository} from "../../../../domain/repositories/IUserRepository"
import {User} from "../../../../domain/entities/User"

export class PostgresqlUserRepository implements IUserRepository {
    public async Create(user: User): Promise<User> {
        throw new Error("Method not implemented.")
    }
    public async GetById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.")
    }
    public async GetByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.")
    }
    public async Update(user: User): Promise<User> {
        throw new Error("Method not implemented.")
    }
    public async Delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}