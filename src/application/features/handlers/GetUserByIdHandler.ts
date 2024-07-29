import {IUserRepository} from "../../interfaces/repositories/IUserRepository"
import {User  } from "../../../domain/models/User"
import {GetUserByIdQuery} from "../queries/GetUserByIdQuery"

export class GetUserByIdHandler {
    constructor(private userRepository: IUserRepository) {
    }

    async handle(command: GetUserByIdQuery): Promise<User | null> {
        return await this.userRepository.FindById(command.id)
    }
}