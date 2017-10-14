import Account from "../model/account";
import Joi from "joi";
import { promisify } from "util";

const validate = promisify(Joi.validate);

const emailValidator = Joi.string().email();

class AuthenticationController {
  async authenticate(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "parameters are missing" });

    try {
      await validate(email, emailValidator);
    } catch (validationError) {
      return res.status(421).json({ message: "invalid email" });
    }

    const [username, domain] = email.split("@");
    const account = (await Account.getAccount({ username, domain }))[0];

    if (!account) {
      return res
        .status(404)
        .json({ message: `account with email ${email} not found` });
    }

    const authenticated = Account.comparePasswords(password, account.password);

    if (!authenticated) {
      return res.status(401).json({ message: `credentials mismatch` });
    }

    res.json({ authenticated });
  }
}

export default new AuthenticationController();
