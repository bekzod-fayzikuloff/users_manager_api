import jwt from "jsonwebtoken";
import {config} from "../config.js";

export const generateAccessToken = (signFields) => jwt.sign(signFields, config.TOKEN_SECRET)
