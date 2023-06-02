import {sequelize} from "../database/sequelize.js";
import {DataTypes} from "sequelize";

export const User = sequelize.define('user', {
    id: {
        field: 'userId',
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        field: "userName",
        type: DataTypes.STRING,
        notNull: true
    },
    email: {
        field: "userEmail",
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        unique: true,
        notNull: true
    },
    password: {
        field: "userPasswordHash",
        type: DataTypes.STRING,
        notNull: true
    },
    joinDate: {
        field: "userJoinDate",
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    lastLoginDate: {
        field: "userLastLoginDate",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    isBlocked: {
        field: "userIsBlocked",
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});
