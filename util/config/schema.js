import {decodeToken, getToken} from "./token.js";

export function getSchema(req) {
    const requestToken = getToken(req);
    const tokenDecoded = decodeToken(requestToken);
    const userId = getTenant(tokenDecoded);
    return "grocy_" + userId.replaceAll("-", "");
}

export function getTenant(tokenDecoded) {
    return tokenDecoded['users'][0].id;
}
