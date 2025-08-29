import bcrypt from "bcryptjs";

export function loginEntity(password,people) {
    let payload;
    payload = people[0]['dataValues'];
    return {payload:payload, isEqual:bcrypt.compare(password, payload.password)};
}
