import Joi from "joi";

const _id = Joi.string();
const pathname = Joi.string().min(2);
const isPublic = Joi.boolean();
const POST = Joi.array();
const GET = Joi.array();
const PATCH = Joi.array();
const DELETE = Joi.array();

const postAccessSchema = Joi.object({
  pathname: pathname.required(),
  isPublic: isPublic.required(),
  POST: POST.required(),
  GET: GET.required(),
  PATCH: PATCH.required(),
  DELETE: DELETE.required(),
});

const patchAccessSchema = Joi.object({
  isPublic,
  POST,
  GET,
  PATCH,
  DELETE,
});

const getIdAccessSchema = Joi.object({
  _id: _id.required(),
});

const getIdQueryAccessSchema = Joi.object({
  _id,
});

export {
  postAccessSchema,
  patchAccessSchema,
  getIdAccessSchema,
  getIdQueryAccessSchema,
};
