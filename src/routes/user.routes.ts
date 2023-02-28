import validate from '../middlewares/validation.middleware';
import { UserCreateType } from '../types/user.types';
import { hashPassword } from '../utils/password';
import mw from '../middlewares/base.middleware';
import UserModel from '../db/models/user.model';
import { Express } from 'express';
import { omit } from 'lodash';
import { Knex } from 'knex';
import {
  firstNameValidator,
  birthDateValidator,
  lastNameValidator,
  passwordValidator,
  emailValidator,
} from '../utils/validators';

export default function UserRoutes(app: Express, db: Knex) {
  /**
   * Creates a new user.
   *
   * @returns created user without passwordHash and passwordSalt.
   */
  app.post(
    '/users/create',
    validate({
      body: {
        firstName: firstNameValidator.required(),
        lastName: lastNameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        birthDate: birthDateValidator.required(),
      },
    }),
    mw(async (req, res) => {
      const { firstName, lastName, email, password, birthDate } = req.data
        .body as UserCreateType;
      const [passwordHash, passwordSalt] = hashPassword(password);
      const [user] = await db('users')
        .insert({
          firstName,
          lastName,
          email,
          passwordHash,
          passwordSalt,
          birthDate,
        })
        .returning('*');

      res.send({
        result: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    })
  );

  /**
   * Gets all users.
   *
   * @returns all users without passwordHash and passwordSalt.
   */
  app.get('/users', async (_, res) => {
    const users = await UserModel.query().withGraphFetched('pets');

    res.send({
      result: users.map((user) => omit(user, ['passwordHash', 'passwordSalt'])),
    });
  });
}
