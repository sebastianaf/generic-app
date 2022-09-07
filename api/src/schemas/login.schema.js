import Joi from "joi";

const token = Joi.string().min(10);
const alias = Joi.string().min(2);
const password = Joi.string().min(2);

const getLoginSchema = Joi.object({
  token: token.required(),
});

const postLoginSchema = Joi.object({
  alias: alias.required(),
  password: password.required(),
});

export { getLoginSchema, postLoginSchema };
