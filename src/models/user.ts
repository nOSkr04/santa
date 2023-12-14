import { IUser } from "../interfaces/user";

export class User implements IUser {
  _id: string;
  role:string;
  phone: string;
  eggCount: string;
  version: string;
  type: string;

  constructor({
    _id,
    phone,
    role,
    eggCount,
    version,
    type
  }: IUser) {
    this._id = _id;
    this.phone = phone;
    this.role = role;
    this.eggCount = eggCount;
    this.version = version;
    this.type = type;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
