import Joi from "joi";

const _id = Joi.number();
const name = Joi.string().min(2);

const getIdQueryRoleSchema = Joi.object({
  _id,
});

const getIdRoleSchema = Joi.object({
  _id: _id.required(),
});

const postRoleSchema = Joi.object({
  name: name.required(),
});

const patchRoleSchema = Joi.object({
  name: name.required(),
});

export {
  getIdQueryRoleSchema,
  getIdRoleSchema,
  postRoleSchema,
  patchRoleSchema,
};
