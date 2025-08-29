import {sendErrorResponse} from "../functions/sendResponde.js";

export function unauthorized(res) {
    sendErrorResponse(res, 401, 'unauthorized');
}

export function authorizationHeader(req) {
    return !!req.header('authorization')
}
