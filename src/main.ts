import dotenv from "dotenv"
import {IUserRepository} from "./application/interfaces/repositories/IUserRepository"
import {UserPostgreRepository} from "./infrastructure/repositories/UserPostgreRepository"
import {CreateUserHandler} from "./application/features/handlers/CreateUserHandler"
import UserRestServer from "./http/UserRestServer"
import {GetUserByIdHandler} from "./application/features/handlers/GetUserByIdHandler"
// Dotenv
dotenv.config()

const REST_SERVER_PORT: string | number = process.env.REST_SERVER_PORT || 5000

const userRepository: IUserRepository = new UserPostgreRepository()
const createUserHandler = new CreateUserHandler(userRepository)
const getUserByIdHandler = new GetUserByIdHandler(userRepository)

const userRestServer: UserRestServer = new UserRestServer(REST_SERVER_PORT as number, createUserHandler, getUserByIdHandler)
userRestServer.listen()