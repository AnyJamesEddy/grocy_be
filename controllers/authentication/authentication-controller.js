import jwt from "jsonwebtoken";
import User from "../../models/authentication/user.js";


export function login(req, res, next) {}

async function getInfo(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId,
            {});

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({user: user});
    } catch (error) {
        next(error);
    }
}

export default {
    login,
    getInfo
}
