export enum Role {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER',
}

export interface User {
  username: string;
  email: string;
  roles: Role[];
}

export interface TokensPair {
  access_token: string;
  refresh_token: string;
}
