export type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
};

export type GetUserType = {
  userId: number;
};
