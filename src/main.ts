import dotenv from "dotenv"
import {IUserRepository} from "./application/ports/repositories/IUserRepository"
import {UserPostgreRepository} from "./infrastructure/repositories/UserPostgreRepository"
import {AuthService} from "./application/services/AuthService"
import {RedisClient} from "./infrastructure/redis/RedisClient"
import UserRestServer from "./infrastructure/http/UserRestServer"
import {IRedisClient} from "./application/ports/redis/IRedisClient"
import {IAuthService} from "./application/ports/services/IAuthService"
// Dotenv
dotenv.config()

const REST_SERVER_PORT: string | number = process.env.REST_SERVER_PORT || 5000
const redisClient: IRedisClient = new RedisClient()
const userRepository: IUserRepository = new UserPostgreRepository()
const authService: IAuthService = new AuthService(userRepository, redisClient)

const userRestServer: UserRestServer = new UserRestServer(REST_SERVER_PORT as number, authService)
userRestServer.listen()