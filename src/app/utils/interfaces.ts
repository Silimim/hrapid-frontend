export enum Role {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  User = 'USER',
}

export enum AutoFormMode {
  Add = 'ADD',
  Edit = 'EDIT',
}

export interface User {
  id: number;
  name: string;
  last_name: string | null;
  username: string;
  password: string | null;
  email: string;
  phone: string | null;
  roles: Role[];
}

export interface TokensPair {
  access_token: string;
  refresh_token: string;
}

export interface Company {
  id: number;
  company_name: string;
  address: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  phone1: string;
  phone2: string | null;
  email1: string;
  email2: string | null;
  sales: number | null;
  date_added: string | null;
  user_added_id: number | null;
}

export interface Employee {
  id: number;
  name: string;
  last_name: string;
  phone1: string | null;
  phone2: string | null;
  email1: string | null;
  email2: string | null;
  role: string | null;
  date_added: string | null;
  user_added_id: number | null;
}

export interface List {
  id: number;
  name: string;
  description: string | null;
  date_added: string | null;
  user_added_id: number | null;
}

export interface AutoTable {
  data: any[];
  headers: AutoTableHeaders[];
}

export interface AutoTableHeaders {
  header: string;
  field: string;
  type: string;
  formatType: AutoTableFormat;
  inputType: string;
  required: boolean;
}

export interface AutoTableFormat {
  type: string | null;
  enum: { key: string, value: any }[] | null;
}


export interface CrudPaths {
  get: string;
  add: string;
  edit: string;
  delete: string;
}
