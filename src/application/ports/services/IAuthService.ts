import {Login} from "../../../domain/models/Login"
import {Payload} from "../../../domain/models/Payload"

export interface IAuthService{
    Login(email: string, password: string): Promise<Login | null>
    Logout(token: string): Promise<void>
    RefreshAccessToken(refreshToken: string): Promise<string | null>
    IsAuthenticated(token: string): Promise<Payload | null>
}