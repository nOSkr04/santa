import { IBank } from "../interfaces/bank";
import { IWallet } from "../interfaces/wallet";

export class Wallet implements IWallet {
  _id: string;
  invoiceId: string;
  qrImage: string;
  urls: IBank[];
  constructor({
    _id,
    invoiceId,
    qrImage,
    urls,
  }: IWallet) {
    this._id = _id;
    this.invoiceId = invoiceId;
    this.qrImage = qrImage;
    this.urls = urls;

  }

  static fromJson(json: IWallet) {
    return new Wallet(json);
  }
}
