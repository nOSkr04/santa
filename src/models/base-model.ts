export abstract class BaseModel {
  static fromJson(json: unknown): BaseModel {
    throw new Error(`Method not implemented. ${json}`);
  }
}