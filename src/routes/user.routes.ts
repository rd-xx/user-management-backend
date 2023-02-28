import { CreateUserType, GetUserType } from '../types/user.types';
import validate from '../middlewares/validation.middleware';
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
  idValidator,
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
        .body as CreateUserType;
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
        result: omit(user, ['passwordHash', 'passwordSalt']),
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

  /**
   * Gets a specific user.
   *
   * @returns user without passwordHash and passwordSalt.
   */
  app.get(
    '/users/:userId',
    validate({ params: { userId: idValidator.required() } }),
    async (req, res) => {
      const { userId } = req.data.params as GetUserType;
      const user = await UserModel.query()
        .findById(userId)
        .withGraphFetched('pets');

      // Will send {} if user is not found
      res.send({
        result: omit(user, ['passwordHash', 'passwordSalt']),
      });
    }
  );
}
