import {IUserRepository} from "../../application/interfaces/repositories/IUserRepository"
import {User, UserStatus} from "../../domain/models/User"
import {PrismaClient} from "@prisma/client";

export class UserPostgreRepository implements IUserRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }

    private toDomain(user: any): User {
        return {
            id: user.id,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            status: user.status as UserStatus,
            name: user.name,
            lastname: user.last_name,
            phone: user.phone,
            email: user.email,
            password: user.password,
            salt: user.salt,
            refreshToken: user.refresh_token,
            refreshTokenExp: user.refresh_token_exp,
            resetPasswordToken: user.reset_password_token
        }
    }

    public async Create(user: User): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: {
                id: user.id,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
                status: user.status,
                name: user.name,
                last_name: user.lastname,
                phone: user.phone,
                email: user.email,
                password: user.password,
                salt: user.salt,
                refresh_token: user.refreshToken,
                refresh_token_expires_at: user.refreshTokenExp
            }
        });

        return this.toDomain(newUser);
    }

    public async Update(id: string, user: Partial<User>): Promise<User> {
        const updatedUser = await this.prisma.user.update({
            where: {id},
            data: user
        });

        return this.toDomain(updatedUser);
    }

    public async Delete(id: string): Promise<void> {
        await this.prisma.user.update({where: {id: id, is_deleted: false}, data: {is_deleted: true}})
    }

    public async FindById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({where: {id}});

        if (!user)
            return null

        return this.toDomain(user);
    }

    public async FindAll(skip: number, take: number): Promise<User[]> {
        const users = await this.prisma.user.findMany({skip, take});

        return users.map((user: any) => this.toDomain(user));
    }
}