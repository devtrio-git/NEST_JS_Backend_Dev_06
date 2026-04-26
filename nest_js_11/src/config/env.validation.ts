import * as Joi from 'joi';

export default Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USER : Joi.string().required(),
  DATABASE_PASSWORD:Joi.string().required(),
  DATABASE_NAME:Joi.string().required(),
  DATABASE_PORT:  Joi.number().port().default(5432),
  ENV: Joi.string().valid('development', 'production').default('development'),
  PROFILE_API_TOKEN:Joi.string().required(),
})
