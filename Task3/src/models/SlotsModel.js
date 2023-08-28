const BaseModel = require("./base/BaseModel");

class SlotsModel extends BaseModel {
  static get tableName() {
    return "slots";
  }

  static get idColumn() {
    return "id";
  }

  static modifiers = {
    // modifiers
  };

  //relations
  static get relationMappings() {
    return {};
  }
}

module.exports = SlotsModel;
