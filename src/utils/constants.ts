export const security = {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: '1 day'
  },
  password: {
    saltlen: 32,
    iterations: 123943,
    keylen: 256,
    digest: 'sha512'
  }
};
