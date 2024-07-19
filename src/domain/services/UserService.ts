import {v4 as uuid} from "uuid"
import {Role} from "../entities/Role"
import crypto from "crypto"
import {User} from "../entities/User"
import {IUserRepository} from "../ports/repositories/IUserRepository"

export default class UserService {
    constructor(private userRepository: IUserRepository) {}

    public async Create(email: string, password: string, role?: Role): Promise<User> {
        // Check if email or password is empty
        if (!email || !password)
            throw new Error("Email or password is empty")

        // Check if the email is already in use
        const existingUser = await this.userRepository.GetByEmail(email)
        if (existingUser)
            throw new Error("Email already in use")

        const salt = crypto.randomBytes(16).toString("hex")
        const hashedPassword = this.HashToPassword(password, salt)

        const user = {
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            email,
            password: hashedPassword,
            salt
        }

        return await this.userRepository.Create(user)
    }

    public HashToPassword(password: string, salt: string): string {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    }
}