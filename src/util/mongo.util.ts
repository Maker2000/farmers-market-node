export class MongoUtils {
  static removeExtraData(doc: any, ret: any): void {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
  }
  static removeId(doc: any, ret: any): void {
    delete ret._id;
    delete ret.__v;
  }
}
