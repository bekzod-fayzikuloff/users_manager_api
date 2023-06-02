import jwt from "jsonwebtoken";
import {config} from "../config.js";
import {StatusCodes} from "http-status-codes";
import {getUserBy} from "../services/users.js";


export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED)

    jwt.verify(token, config.TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(StatusCodes.FORBIDDEN)
        req.user = await getUserBy({id: [user.userId]})
        next()
    })
}