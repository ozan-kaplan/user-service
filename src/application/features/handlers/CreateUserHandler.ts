import {v4 as uuid} from "uuid"
import {CreateUserCommand} from "../commands/CreateUserCommand"
import {IUserRepository} from "../../interfaces/repositories/IUserRepository"
import {User, UserStatus} from "../../../domain/models/User"
import {PasswordHasher} from "../../../utils/PasswordHasher"

export class CreateUserHandler {
    constructor(private userRepository: IUserRepository) {
    }

    async handle(command: CreateUserCommand): Promise<User> {
        const salt = await PasswordHasher.GenerateSalt()
        const hashedPassword = await PasswordHasher.Hash(command.password, salt)
        const user: User = {
            id: uuid(),
            createdAt: new Date(),
            updatedAt: new Date(),
            status: UserStatus.FIRST_LOGIN_PENDING,
            name: command.name,
            lastname: command.lastname,
            phone: command.phone,
            email: command.email,
            password: hashedPassword,
            salt: salt
        }

        await this.userRepository.Create(user)

        return user
    }
}