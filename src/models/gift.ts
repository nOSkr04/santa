import { IGift } from "../interfaces/gift";

export class Gift implements IGift {
  _id: string;
  name: string;
  image: {
    url: string;
    blurHash: string;
  };
  type: string;
  productType: string;
  createdAt:string;
  quantity: string;
  isRandom: boolean;
  constructor({
    _id,
    image,
    name,
    type,
    createdAt,
    productType,
    quantity,
    isRandom
  }: IGift) {
    this._id = _id;
    this.image = image;
    this.name = name;
    this.type = type;
    this.createdAt= createdAt;
    this.productType= productType;
    this.quantity= quantity;
    this.isRandom= isRandom;
  
  }

  static fromJson(json: IGift) {
    return new Gift(json);
  }
}
