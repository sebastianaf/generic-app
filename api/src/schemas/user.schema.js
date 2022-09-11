import Joi from "joi";

const _id = Joi.number();
const name = Joi.string().min(2);
const alias = Joi.string().min(2);
const password = Joi.string().min(2);
const roleId = Joi.number();
const userId = Joi.number();

const postUserSchema = Joi.object({
  name: name.required(),
  alias: alias.required(),
  password: password.required(),
  roleId: roleId.required(),
  userId: userId.required(),
});

const patchUserSchema = Joi.object({
  name,
  alias,
  password,
  roleId,
});

const getIdUserSchema = Joi.object({
  _id: _id.required(),
});

const getIdQueryUserSchema = Joi.object({
  _id,
});

export {
  postUserSchema,
  patchUserSchema,
  getIdUserSchema,
  getIdQueryUserSchema,
};
