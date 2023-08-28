const BaseModel = require("./base/BaseModel");

class SubjectTeacherUsersModel extends BaseModel {
  static get tableName() {
    return "subject_teacher_users";
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
        teacher: {
            relation: BaseModel.HasOneRelation,
            modelClass: 'UsersModel',
            join: {
                from: 'subject_teacher_users.user_id',
                to: 'users.id'
            }
        },
        subject: {
            relation: BaseModel.HasOneRelation,
            modelClass: 'SubjectsModel',
            join: {
                from: 'subject_teacher_users.subject_id',
                to: 'subjects.id'
            }
        }
    };
  }
}

module.exports = SubjectTeacherUsersModel;
