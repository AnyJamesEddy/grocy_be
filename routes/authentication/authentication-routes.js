import Router from "express";
import authentication from '../../controllers/authentication/authentication-controller.js'
import {authenticate, authorize} from "../../middleware/auth.js";

const authenticationRouter = Router();

authenticationRouter.post('/login', authentication.login);

authenticationRouter.get('/user/me',authenticate, authorize('read', 'User'), authentication.getInfo);

export default authenticationRouter;
