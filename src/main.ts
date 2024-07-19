import dotenv from "dotenv"
import {IUserService} from "./domain/services/interfaces/IUserService"
import UserService from "./domain/services/UserService"
import {IUserRepository} from "./domain/ports/repositories/IUserRepository"
import {PostgresUserRepository} from "./adapters/repositories/postgresql/PostgresUserRepository"
import Server from "./adapters/rest/Server"

dotenv.config()

const  REST_SERVER_PORT: string | number = process.env.REST_SERVER_PORT || 5000

/* REPOSITORIES */
const userRepository: IUserRepository = new PostgresUserRepository()

/* SERVICES */
const userService: IUserService = new UserService(userRepository)

const restServer = new Server(REST_SERVER_PORT as number, userService)
restServer.listen()