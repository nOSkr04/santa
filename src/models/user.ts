import { IUser } from "../interfaces/user";

export class User implements IUser {
  _id: string;
  role:string;
  phone: string;

  constructor({
    _id,
    phone,
    role
  }: IUser) {
    this._id = _id;
    this.phone = phone;
    this.role = role;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
