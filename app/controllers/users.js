import {StatusCodes} from "http-status-codes";
import {validationResult} from "express-validator";
import {User} from "../models/users.js";
import {generateAccessToken} from "../utils/jwt.js";
import {getUserBy, getUsers, usersEmailIsUnique} from "../services/users.js";
import bcrypt from "bcrypt";


export const catchValidationResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errors.array(),
        });
    }
    next()
}


const updateFields = (record, newValues) => {
    Object.entries(newValues).forEach((property) => {
        const [key, value] = property
        record[key] = value
    })
    record.save()
}

export const userController = {
    create: async (req, res) => {
        const {username, email, password} = req.body
        const user = User.build({
            username, email, password: await bcrypt.hash(password, bcrypt.genSaltSync(8))
        })
        await user.save()
        res.status(StatusCodes.CREATED).json({accessToken: generateAccessToken({userId: user.id, isBlocked: user.isBlocked})})
    },

    login: async (req, res) => {
        const {email, password} = req.body
        const user = await getUserBy({email})
        if (!!user) {
            console.log(await bcrypt.compare("11", user.password))
            if (await bcrypt.compare(password, user.password)) {
                user.lastLoginDate = new Date()
                await user.save()
                return res.status(StatusCodes.OK).json({accessToken: generateAccessToken({userId: user.id, isBlocked: user.isBlocked})})
            }
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Check that your password is correct"})
        }
        res.status(StatusCodes.NOT_FOUND).json({message: "User not found"})
    },

    getAll: async (req, res) => {
        res.json(await getUsers())
    },

    getDetail: async (req, res) => {
        res.json(await getUserBy({id: [req.params.id]}))
    },

    change: async (req, res) => {
        const user = await getUserBy({id: [req.params.id]})
        if (req?.body?.email && await usersEmailIsUnique(req?.body?.email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'E-mail already in use'});
        }
        await updateFields(user, req.body)
        if (!!user) {
            res.json(user)
        }
        return res.status(StatusCodes.NOT_FOUND)
    },

    delete: async (req, res) => {
        const user = await getUserBy({id: [req.params.id]})
        user && await user.destroy()
        res.status(StatusCodes.NO_CONTENT).json()
    },

    notBlocked: async (req, res, next) => {
        if (req.user && req.user.isBlocked) {
            return res.status(StatusCodes.FORBIDDEN).json()
        }
        next()
    }
}