import Joi from "joi";

const id = Joi.number();
const name = Joi.string().min(4);
const alias = Joi.string().min(4);
const password = Joi.string().min(4);
const idUser = Joi.number();

const createUserSchema = Joi.object({
  name: name.required(),
  alias: alias.required(),
  password: password.required(),
  idUser: idUser.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  alias: alias.required(),
  password: password,
  idUser: idUser.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const loginUserSchema = Joi.object({
  alias: alias.required(),
  password: password.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema, loginUserSchema };
