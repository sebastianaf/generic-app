import { AccessModel } from "../db/mongoose-models";

class AccessService {
  constructor() {}

  async updateOne(_id, doc) {
    const res = await AccessModel.updateOne({ _id }, doc);
    return res;
  }

  async save(doc) {
    let accessObj = new AccessModel(doc);
    const res = await accessObj.save();
    return res;
  }

  async find(filter) {
    let res = await AccessModel.find(filter);
    return res;
  }
  
  async findOne(filter) {
    let res = await AccessModel.findOne(filter);
    return res;
  }

  async findById(_id) {
    let res = await AccessModel.findById(_id);
    return res;
  }

  async deleteOne(_id) {
    let res = await AccessModel.deleteOne({ _id });
    return res;
  }
}

export default AccessService;
