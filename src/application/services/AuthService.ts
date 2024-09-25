import jwt from 'jsonwebtoken'
import {IUserRepository} from "../ports/repositories/IUserRepository"
import {IRedisClient} from "../ports/redis/IRedisClient"
import {Login} from "../../domain/models/Login"
import {IAuthService} from "../ports/services/IAuthService"
import {Payload} from "../../domain/models/Payload"

export class AuthService implements IAuthService {

    private userRepository: IUserRepository
    private redisClient

    constructor(userRepository: IUserRepository, redisClient: IRedisClient) {
        this.userRepository = userRepository
        this.redisClient = redisClient
    }

    public async Login(email: string, password: string): Promise<Login | null> {
        const user = await this.userRepository.FindByEmail(email)
        if (!user || user.password !== password) return null

        const accessToken = this.generateAccessToken({userId: user.id})
        const refreshToken = this.generateRefreshToken()
        user.refreshToken = refreshToken
        user.refreshTokenExp = new Date(Date.now() + 1000 * 60 * 60 * 24) // 24 saat
        await this.userRepository.Update(user)

        return {accessToken, refreshToken}
    }

    public async Logout(token: string): Promise<void> {
        await this.redisClient.Set(token, 'logged out')
    }

    public async RefreshAccessToken(refreshToken: string): Promise<string | null> {
        const user = await this.userRepository.FindByRefreshToken(refreshToken)
        if (!user || (user.refreshTokenExp && new Date() > user.refreshTokenExp)) return null

        return this.generateAccessToken({userId: user.id})
    }

    generateAccessToken(payload: Payload) {
        return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '15m'})
    }

    generateRefreshToken() {
        return jwt.sign({}, process.env.JWT_SECRET!, {expiresIn: '24h'})
    }

    public async IsAuthenticated(token: string): Promise<Payload | null> {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!)
            const isLoggedOut = await this.redisClient.Get(token)
            if (isLoggedOut) return null

            return payload as Payload
        } catch {
            return null
        }
    }
}