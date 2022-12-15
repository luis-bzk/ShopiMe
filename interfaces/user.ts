export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "client";

  createdAt?: string;
  updatedAt?: string;
}

export interface IUserResponse {
  name: string;
  email: string;
  role: "admin" | "client";
}
