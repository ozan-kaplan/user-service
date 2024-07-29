import {Router, Request, Response, NextFunction} from "express"
import BaseController from "./BaseController"
import {ValidateEmailMiddleware} from "../middlewares/ValidateEmailMiddleware"
import {CreateUserHandler} from "../../application/features/handlers/CreateUserHandler"
import StatusCode from "../StatusCode"

export default class UserController implements BaseController {
    router: Router;

    private createUserHandler: CreateUserHandler

    constructor(router: Router, createUserHandler: CreateUserHandler) {
        this.router = router
        this.createUserHandler = createUserHandler

        //Define routes
        this.router.post("/users", ValidateEmailMiddleware, this.Create.bind(this))
        this.router.put("/users/:id", ValidateEmailMiddleware, this.Update.bind(this))
        this.router.get("/users/:id", this.Get.bind(this))
    }

    private async Create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
           const user = await this.createUserHandler.handle({
                name: req.body.name,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password
            })

            return res.status(StatusCode.SuccessCreated).send(user)

        } catch (error) {

        }
    }

    private async Update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {


        } catch (error) {

        }
    }

    private async Get(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {


        } catch (error) {

        }
    }
}