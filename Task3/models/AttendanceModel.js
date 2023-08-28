const BaseModel = require("./base/BaseModel");

class AttendanceModel extends BaseModel {
  static get tableName() {
    return "attendance";
  }

  static get idColumn() {
    return "id";
  }

  static modifiers = {
    // modifiers
  };

  //relations
  static get relationMappings() {
    return {
        student: {
            relation: BaseModel.HasOneRelation,
            modelClass: 'UsersModel',
            join: {
                from: 'attendance.student_id',
                to: 'users.id'
            }
        },
        class: {
            relation: BaseModel.HasOneRelation,
            modelClass: 'ClassesModel',
            join: {
                from: 'attendance.class_id',
                to: 'classes.id'
            }
        }
    };
  }
}

module.exports = AttendanceModel;
