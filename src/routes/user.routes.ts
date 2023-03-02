import validate from '../middlewares/validation.middleware';
import AuthMiddleware from '../middlewares/auth.middleware';
import { InvalidCredentialsError } from '../utils/errors';
import { hashPassword } from '../utils/password';
import mw from '../middlewares/base.middleware';
import UserModel from '../db/models/user.model';
import { security } from '../utils/constants';
import { sign } from 'jsonwebtoken';
import { Express } from 'express';
import { omit } from 'lodash';
import { Knex } from 'knex';
import {
  firstNameValidator,
  birthDateValidator,
  lastNameValidator,
  passwordValidator,
  emailValidator,
  idValidator
} from '../utils/validators';
import {
  CreateUserType,
  LoginUserType,
  GetUserType
} from '../types/user.types';

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
        birthDate: birthDateValidator.required()
      }
    }),
    mw(async (req, res) => {
      const { firstName, lastName, email, password, birthDate } = req.data
          .body as CreateUserType,
        [passwordHash, passwordSalt] = hashPassword(password),
        [user] = await db('users')
          .insert({
            firstName,
            lastName,
            email,
            passwordHash,
            passwordSalt,
            birthDate
          })
          .returning('*');

      res.send({
        result: omit(user, ['passwordHash', 'passwordSalt'])
      });
    })
  );

  /**
   * Creates a new JSON web token.
   *
   * @returns JWT.
   */
  app.post(
    '/users/login',
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required()
      }
    }),
    mw(async (req, res) => {
      const { email, password } = req.data.body as LoginUserType,
        [user] = await db('users').where({ email });
      if (!user) throw new InvalidCredentialsError();

      const [passwordHash] = hashPassword(password, user.passwordSalt);
      if (passwordHash !== user.passwordHash)
        throw new InvalidCredentialsError();

      const jwt = sign(
        {
          payload: {
            user: {
              id: user.id,
              fullName: `${user.firstName} ${user.lastName}`
            }
          }
        },
        security.jwt.secret,
        { expiresIn: security.jwt.expiresIn }
      );

      res.send({ result: jwt });
    })
  );

  /**
   * Gets all users.
   *
   * @returns all users without passwordHash and passwordSalt.
   */
  app.get('/users', AuthMiddleware, async (_, res) => {
    const users = await UserModel.query().withGraphFetched('pets');

    res.send({
      result: users.map((user) => omit(user, ['passwordHash', 'passwordSalt']))
    });
  });

  /**
   * Gets a specific user.
   *
   * @returns user without passwordHash and passwordSalt.
   */
  app.get(
    '/users/:userId',
    AuthMiddleware,
    validate({ params: { userId: idValidator.required() } }),
    async (req, res) => {
      const { userId } = req.data.params as GetUserType,
        user = await UserModel.query()
          .findById(userId)
          .withGraphFetched('pets');

      // Will send {} if user is not found
      res.send({
        result: omit(user, ['passwordHash', 'passwordSalt'])
      });
    }
  );
}
