import express from "express";
import bodyParser from "body-parser";
import {userRouter} from "./routes/users.js";
import helmet from "helmet";
import cors from "cors";
import {config} from "./config.js";
import * as db from "./database/sequelize.js";

const app = express()


app.use(helmet())
app.use(
    cors({
        origin: config.CORS_ORIGIN
    })
)

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/users', userRouter)



db.sequelize.sync({ force: false }).then(() => {
    app.listen(config.PORT, () => {
        console.log("Server is running ...")
    })
});