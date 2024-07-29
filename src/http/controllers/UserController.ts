import {Router, Request, Response, NextFunction} from "express"
import BaseController from "./BaseController"
import {ValidateEmailMiddleware} from "../middlewares/ValidateEmailMiddleware"
import {CreateUserHandler} from "../../application/features/handlers/CreateUserHandler"
import StatusCode from "../StatusCode"
import {GetUserByIdHandler} from "../../application/features/handlers/GetUserByIdHandler"

export default class UserController implements BaseController {
    router: Router;

    private createUserHandler: CreateUserHandler
    private getUserByIdHandler: GetUserByIdHandler

    constructor(router: Router, createUserHandler: CreateUserHandler, getUserByIdHandler: GetUserByIdHandler) {
        this.router = router
        this.createUserHandler = createUserHandler
        this.getUserByIdHandler = getUserByIdHandler


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
            const user = await this.getUserByIdHandler.handle({ id: req.params.id});
            res.status(StatusCode.SuccessOK).send(user)
        } catch (error) {

        }
    }
}