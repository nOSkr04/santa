import { ScopedMutator } from "swr/_internal";
import { IUser } from "../interfaces/user";

export class User implements IUser {
  _id: string;
  role:string;
  phone: string;
  eggCount: number;
  version: string;
  type: string;
  notificationCount:number;

  constructor({
    _id,
    phone,
    role,
    eggCount,
    version,
    type,
    notificationCount
  }: IUser) {
    this._id = _id;
    this.phone = phone;
    this.role = role;
    this.eggCount = eggCount;
    this.version = version;
    this.type = type;
    this.notificationCount = notificationCount;
  }

  setNotification(mutate: ScopedMutator) {
    this.notificationCount = 0;
    mutate("swr.user.me", User.fromJson(this), { revalidate: false });
    return this;
  }

  setEggMinus(mutate:ScopedMutator, egg:number){
    this.eggCount = this.eggCount - egg;
    mutate("swr.user.me", User.fromJson(this), { revalidate: false });
    return this;
  }

  setEggSum(mutate:ScopedMutator, egg:number){
    this.eggCount = this.eggCount + egg;
    mutate("swr.user.me", User.fromJson(this), { revalidate: false });
    return this;
  }

  static fromJson(json: IUser) {
    return new User(json);
  }

}
