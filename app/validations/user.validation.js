import {body} from "express-validator";
import {usersEmailIsUnique} from "../services/users.js";

export const userRegisterValidate = [
    body("username")
        .notEmpty()
        .withMessage("username is required"),
    body("email")
        .isEmail()
        .withMessage("email is required")
        .custom(async value => {
            if (await usersEmailIsUnique(value)) {
                throw new Error('E-mail already in use');
            }
        }),
    body("password")
        .notEmpty()
        .isLength({min: 1})
        .withMessage("password is required and must contain at least 1 characters ")
]

export const userLoginValidate = [
    body("email")
        .isEmail()
        .withMessage("email is required"),
    body("password")
        .notEmpty()
        .isLength({min: 1})
        .withMessage("password is required and must contain at least 1 characters ")
]
