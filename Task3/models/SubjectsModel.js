const BaseModel = require("./base/BaseModel");

class SubjectsModel extends BaseModel {
  static get tableName() {
    return "subjects";
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

module.exports = SubjectsModel;
