import {Request, Response, Router} from 'express';
import {AuthService} from "../../../application/services/AuthService"
import HttpStatusCode from "../HttpStatusCode"
import Controller from "./BaseController"
import {IAuthService} from "../../../application/ports/services/IAuthService"

export class AuthController implements Controller {
    router: Router;
    private authService: IAuthService

    constructor(router: Router, authService: IAuthService) {
        this.router = router
        this.authService = authService

        this.router.post("/login", this.Login.bind(this))
        this.router.post("/logout", this.Logout.bind(this))
        this.router.post("/refresh-access-token", this.RefreshAccessToken.bind(this))
    }

    public async Login(req: Request, res: Response) {
        const {email, password} = req.body
        const tokens = await this.authService.Login(email, password)
        if (!tokens) {
            return res.status(HttpStatusCode.ClientErrorUnauthorized).send('Invalid credentials')
        }
        res.json(tokens)
    }

    public async Logout(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token)
            return res.status(HttpStatusCode.ClientErrorBadRequest).send('No token provided')

        await this.authService.Logout(token)
        res.status(HttpStatusCode.SuccessOK).send('Logged out')
    }

    public async RefreshAccessToken(req: Request, res: Response) {
        const {refreshToken} = req.body
        const newToken = await this.authService.RefreshAccessToken(refreshToken)
        if (!newToken)
            return res.status(HttpStatusCode.ClientErrorUnauthorized).send('Invalid refresh token')

        res.json({accessToken: newToken})
    }
}