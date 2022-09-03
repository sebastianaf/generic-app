import Joi from "joi";

const id = Joi.number();

const getRoleSchema = Joi.object({
  id: id.required(),
});

export { getRoleSchema };
