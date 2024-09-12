export type UserRegistration = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserLoginResponse = {
  token: string;
};

export type UsersResponse = {
  name: string;
  email: string;
  isVerified: boolean;
};
