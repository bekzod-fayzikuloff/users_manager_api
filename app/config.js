import {configDotenv} from "dotenv";

configDotenv()

export const config = {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    PORT: +process.env.PORT,
    DB_LINK: process.env.DB_LINK
}
