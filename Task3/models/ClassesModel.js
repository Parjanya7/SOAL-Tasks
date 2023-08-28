const BaseModel = require("./base/BaseModel");

class ClassesModel extends BaseModel {
  static get tableName() {
    return "classes";
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
        subject_teacher: {
            relation: BaseModel.HasOneRelation,
            modelClass: 'SubjectTeacherUsersModel',
            join: {
                from: 'classes.subject_teacher_id',
                to: 'subject_teacher_users.id'
            }
        },
        slot: {
            relation: BaseModel.HasOneRelation,
            modelClass: 'SlotsModel',
            join: {
                from: 'classes.slot_id',
                to: 'slots.id'
            }
        }
    };
  }
}

module.exports = ClassesModel;
