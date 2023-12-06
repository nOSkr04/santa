import { IAuth } from "../interfaces/auth";
import { IUser } from "../interfaces/user";
import { BaseModel } from "./base-model";

export class Auth extends BaseModel implements IAuth {
  _id?: string | null;
  name?: string | null;
  password?: string | null;
  token: string | null;
  user: IUser | null;

  constructor ({ name, password, token, user,_id, }: IAuth) {
    super();
    this.name = name;
    this.password = password;
    this.token = token;
    this.user = user;
    this._id = _id;
  }

  static fromJson (json: IAuth) {
    return new Auth(json);    
  }
}