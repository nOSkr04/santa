import { IUser } from "../interfaces/user";

export class User implements IUser {
  _id: string;
  auth: string;
  name: string;
  deadline: string;
  privacy:boolean;
  role:string;
  constructor({
    _id,
    auth,
    name,
    deadline,
    privacy,
    role
  }: IUser) {
    this._id = _id;
    this.auth = auth;
    this.name = name;
    this.deadline = deadline;
    this.privacy= privacy;
    this.role= role;
  
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
