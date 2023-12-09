import { IBank } from "../interfaces/bank";

export class Bank implements IBank {
  _id: string;
  description: string;
  link: string;
  logo: string;
  name: string;
  constructor({
    _id,
    description,
    name,
    link,
    logo
  }: IBank) {
    this._id = _id;
    this.description = description;
    this.name = name;
    this.link = link;
    this.logo = logo;

  }

  static fromJson(json: IBank) {
    return new Bank(json);
  }
}
