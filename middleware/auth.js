import {ForbiddenError} from "@casl/ability";
import jwt from "jsonwebtoken";
import {defineAbilitiesFor} from "../abilities/defineAbilities.js";

const authenticate= async (req, res, next)=> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, 'someSuperSecretSecret');

        req.user = { id: decoded.id, role: decoded.role };
        req.ability = defineAbilitiesFor(req.user);

        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}

function authorize(action, subject) {
    return (req, res, next) => {
        try {
            ForbiddenError.from(req.ability).throwUnlessCan(action, subject);
            next();
        } catch (error) {
            if (error instanceof ForbiddenError) {
                res.status(403).json({ message: 'Accesso negato' });
            } else {
                next(error);
            }
        }
    };
}

export { authorize, authenticate};
