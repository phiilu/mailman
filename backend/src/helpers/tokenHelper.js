import jwt from "jsonwebtoken";
import { promisify } from "util";

import { secret } from "../config";

const sign = promisify(jwt.sign);

export const generateToken = async payload => {
  return await sign(payload, secret, { expiresIn: "7d" });
};
