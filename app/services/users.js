import {User} from "../models/users.js";

export const getUserBy = async (fields) => {
    return await User.findOne({where: {...fields}})
}

export const getUsers = async () => {
    return await User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
}

export const usersEmailIsUnique = async (email) => {
    return  !!(await User.findOne({where: {email}}))
}
