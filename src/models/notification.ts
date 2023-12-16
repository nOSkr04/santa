import { INotification } from "../interfaces/notification";

export class Notification implements INotification {
  _id: string;
  title: string;
  createdAt: string;
  users: string;
  constructor({
    _id,
    title,
    createdAt,
    users,
  }: INotification) {
    this._id = _id;
    this.title = title;
    this.createdAt = createdAt;
    this.users = users;
  }

  static fromJson(json: INotification) {
    return new Notification(json);
  }
}
