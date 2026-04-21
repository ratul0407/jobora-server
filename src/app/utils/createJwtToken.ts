import jwt, { Secret, SignOptions } from "jsonwebtoken";
export const createJwtToken = (
  payload: any,
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  } as SignOptions);

  return token;
};
