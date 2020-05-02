import Joi from "joi";
import { promisify } from "util";

import Account from "../model/account";
import { generateToken } from "../helpers/tokenHelper";
import { isAdmin } from "../helpers/authorizationHelper";

const validate = promisify(Joi.validate);
const emailValidator = Joi.string().email();

class AuthenticationController {
  async authenticate(req, res) {
    const { email, password } = req.body;

    // email and password are required
    if (!email || !password)
      return res.status(400).json({ message: "parameters are missing" });

    // validate email
    try {
      await validate(email, emailValidator);
    } catch (validationError) {
      return res.status(422).json({ message: "invalid email" });
    }

    // check if account with email exists
    const [username, domain] = email.split("@");
    const account = (await Account.getAccount({ username, domain }))[0];

    if (!account) {
      return res.status(401).json({ message: `credentials mismatch` });
    }

    // check passwords
    const authenticated = await Account.comparePasswords(
      password,
      account.password
    );

    if (!authenticated) {
      return res.status(401).json({ message: `credentials mismatch` });
    }

    // generate JWT
    const token = await generateToken({ email });
    res.json({ token, admin: isAdmin(email), id: account.id });
  }
}

export default new AuthenticationController();
