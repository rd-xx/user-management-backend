export type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type GetUserType = {
  userId: number;
};
