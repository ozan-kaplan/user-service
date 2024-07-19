import express, {Router, Request, Response} from "express"
import helmet from "helmet"
import StatusCode from "./StatusCode"
import AuthController from "./Controllers/AuthController"
import {IUserService} from "../../../domain/services/interfaces/IUserService"

export default class Server {
    private express: express.Express
    private readonly port: number
    private readonly userService: IUserService

    constructor(port: number, userService: IUserService) {
        this.port = port
        this.userService = userService

        this.express = express()

        // Config
        this.config()
        this.healthcheck()

        // Controller
        this.initializeControllers()

        // General handlers
        this.handlers()
    }


    public listen() {
        this.express.listen(this.port, () => {
            console.log(`🚀 Hexagon APP REST server is running port: ${this.port}`)
        })
    }


    private config(): void {
        this.express.use(express.json())
        this.express.disable("x-powered-by")

        this.express.use(helmet.contentSecurityPolicy())
        this.express.use(helmet.crossOriginEmbedderPolicy())
        this.express.use(helmet.crossOriginOpenerPolicy())
        this.express.use(helmet.crossOriginResourcePolicy())
        this.express.use(helmet.dnsPrefetchControl())
        this.express.use(helmet.expectCt())
        this.express.use(helmet.frameguard())
        this.express.use(helmet.hidePoweredBy())
        this.express.use(helmet.hsts())
        this.express.use(helmet.ieNoOpen())
        this.express.use(helmet.noSniff())
        this.express.use(helmet.originAgentCluster())
        this.express.use(helmet.permittedCrossDomainPolicies())
        this.express.use(helmet.referrerPolicy())
        this.express.use(helmet.xssFilter())
    }

    private healthcheck(): void {
        this.express.use("/healthcheck", async (req: Request, res: Response) => {
            const healthcheck = {
                uptime: process.uptime(),
                timestamp: Date.now(),
                message: "OK"
            }

            try {
                return res.send(healthcheck)
            } catch (error) {
                healthcheck.message = (error as Error).message
                return res.status(StatusCode.ServerErrorServiceUnavailable).send(healthcheck)
            }
        })
    }

    private handlers(): void {
        // Custom 404 response
        this.express.use((req: Request, res: Response) => {
            return res.status(StatusCode.ClientErrorNotFound).send({message: "Sorry can't find that!"})
        })

        // Custom error handler
        this.express.use((err: Error, req: Request, res: Response) => {
            console.error(err.stack)
            return res.status(StatusCode.ServerErrorInternal).send({message: "Something broke!", code: "SERVER_ERROR"})
        })
    }

    private initializeControllers(): void {
        const authController = new AuthController(this.userService, Router())


        this.express.use("/v1/auth", authController.router)
    }
}