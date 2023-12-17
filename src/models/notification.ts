import { INotification } from "../interfaces/notification";

export class Notification implements INotification {
  _id: string;
  title: string;
  createdAt: string;
  users: string;
  isRead: boolean;
  constructor({
    _id,
    title,
    createdAt,
    users,
    isRead
  }: INotification) {
    this._id = _id;
    this.title = title;
    this.createdAt = createdAt;
    this.users = users;
    this.isRead = isRead;
  }

  static fromJson(json: INotification) {
    return new Notification(json);
  }
}
