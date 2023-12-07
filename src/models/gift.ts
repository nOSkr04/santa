import { IGift } from "../interfaces/gift";

export class Gift implements IGift {
  _id: string;
  name: string;
  image: {
    url: string;
    blurHash: string;
  };
  type: string;
  createdAt:string;
  constructor({
    _id,
    image,
    name,
    type,
    createdAt
  }: IGift) {
    this._id = _id;
    this.image = image;
    this.name = name;
    this.type = type;
    this.createdAt= createdAt;
  
  }

  static fromJson(json: IGift) {
    return new Gift(json);
  }
}
