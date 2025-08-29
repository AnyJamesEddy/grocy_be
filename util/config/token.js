import jwt from "jsonwebtoken";

export function getFullToken(req) {
    return req.header('authorization');
}

export function getToken(req) {
    return req.header('authorization').split(" ")[1];
}

export function decodeToken(token) {
    return jwt.decode(token, {});
}

export function getUserId(req) {
    const requestToken = getToken(req);
    const tokenDecoded = decodeToken(requestToken);
    const {users} = {...tokenDecoded};
    return users[0].id;
}
