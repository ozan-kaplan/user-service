import {Router, Request, Response, NextFunction} from "express"
import Controller from "./Controller"
import StatusCode from "../StatusCode"
import {IUserService} from "../../../../domain/services/interfaces/IUserService"

export default class AuthController implements Controller {
    private userService: IUserService
    router: Router

    constructor(userService: IUserService, router: Router) {
        this.userService = userService
        this.router = router

        //Define routes
        this.router.post("/register", this.Register.bind(this))
    }

    private async Register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            let {email, password} = req.body
            const loginResponse = await this.userService.Create(email, password)

            res.status(StatusCode.SuccessOK).send(loginResponse)

        } catch (error) {
                next(error)
        }
    }
}