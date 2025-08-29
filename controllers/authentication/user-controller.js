import User from "../../models/authentication/user.js";
import bcrypt from "bcryptjs";
import {getUserId} from "../../util/config/token.js";
import {login} from "./authentication-controller.js";

export async function createUser(req, res, next) {
    const userID = getUserId(req);
    const newUser = req.body;
    await User.findByPk(userID, {
    }).then(user => {console.log(user)})
}

export default {
    createUser,
}
