import { randomBytes, pbkdf2Sync } from 'crypto';
import { security } from './constants';

const passwordSecurity = security.password;

export function hashPassword(
  password: string,
  salt = randomBytes(passwordSecurity.saltlen).toString('hex')
) {
  return [
    pbkdf2Sync(
      password,
      salt,
      passwordSecurity.iterations,
      passwordSecurity.keylen,
      passwordSecurity.digest
    ).toString('hex'),
    salt,
  ];
}
