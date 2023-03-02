import { InvalidArgumentError } from '../utils/errors';
import mw from './base.middleware';
import * as yup from 'yup';

export const validate = (
  validators: Record<string, Record<string, yup.Schema>>
) =>
  mw(async (req, _, next) => {
    const { body, params, query } = validators;

    try {
      req.data = await yup
        .object()
        .shape({
          ...(body ? { body: yup.object().shape(body) } : {}),
          ...(query ? { query: yup.object().shape(query) } : {}),
          ...(params ? { params: yup.object().shape(params) } : {})
        })
        .validate(
          {
            params: req.params,
            body: req.body,
            query: req.query
          },
          {
            abortEarly: false
          }
        );

      next();
    } catch (err) {
      if (err instanceof yup.ValidationError)
        throw new InvalidArgumentError(err.errors);

      throw err;
    }
  });

export default validate;
