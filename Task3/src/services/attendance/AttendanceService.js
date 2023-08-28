const BaseService = require('../base/BaseService');
const AttendanceModel = require('../../models/AttendanceModel');
const { resolvePromise } = require('../../utils/async');


/**
 *
 *
 * @class AuthService
 * @extends { BaseService }
 */
class AttendanceService extends BaseService {
    constructor() {
        super();
    }

    lastFiveAttendedClasses = async (studentId, subjectCode ) => {
        try {
            let err, result;
            
            /*Query to select last 5 attended classes for the student with all the 
            details associated with the class(subject, teacher, slot) for a particular subject*/

            const selectionQuery = AttendanceModel.query()
            .select('class.class_code', 'class.subjectName', 'class.subject_code', 'class.teacherName', 'class.teacherEmail', 'class.start_time', 'class.end_time', 'class.day_of_week', 'class.date')
            .where({ student_id: studentId, is_present: true, 'class.subject_code': subjectCode })
            .limit(5)
            .joinRelated('class(classSelects)')
            .modifiers({
                classSelects: builder => builder
                .select('class_code', 'subject_teacher.subjectName', 'subject_teacher.subject_code', 'subject_teacher.teacherName', 'subject_teacher.teacherEmail', 'slot.start_time', 'slot.end_time', 'slot.day_of_week', 'slot.date')
                .joinRelated('[subject_teacher(subjectTeacherSelects), slot(slotSelects)]')
                .modifiers({
                    subjectTeacherSelects: builder2 => builder2
                    .select('subject.subjectName', 'subject.subject_code', 'teacher.teacherName', 'teacher.teacherEmail')
                    .joinRelated('[subject(subjectSelects), teacher(teacherSelects)]')
                    .modifiers({
                        subjectSelects: builder3 => builder3.select('subjects.name as subjectName', 'subject_code'),
                        teacherSelects: builder3 => builder3.select('users.name as teacherName', 'users.email as teacherEmail')
                    }),
                    slotSelects: builder2 => builder2.select('start_time', 'end_time', 'day_of_week', 'date')
                })
            });
            [err, result] = await resolvePromise(selectionQuery);

            if (err) {
                const errorResponse = await this.getErrorResponse(err);
                return Promise.reject(errorResponse);
            }

            return result;
        } catch (error) {
            const errorResponse = await this.getErrorResponse(error);
            return Promise.reject(errorResponse);
        }
    };

    attendanceInAMonth = async (studentId, month, subjectCode) => {
        try {
            let err, result;

            const currentYear = new Date().getFullYear(); //Year can also be requested from FE in order to see previous year's attendance.
            const dateRangeOfMonth = [`${currentYear}-${month}-01`, `${currentYear}-${month}-31`];

            /*Query to select all attended classes for a given month for the student with all 
            the details associated with the class(subject, teacher, slot) for a particular subject*/

            const selectionQuery = AttendanceModel.query()
            .select('class.class_code', 'class.subjectName', 'class.subject_code', 'class.teacherName', 'class.teacherEmail', 'class.start_time', 'class.end_time', 'class.day_of_week', 'class.date')
            .whereBetween('class.date', dateRangeOfMonth)
            .andWhere({ student_id: studentId, is_present: true, 'class.subject_code': subjectCode })
            .joinRelated('class(classSelects)')
            .modifiers({
                classSelects: builder => builder
                .select('class_code', 'subject_teacher.subjectName', 'subject_teacher.subject_code', 'subject_teacher.teacherName', 'subject_teacher.teacherEmail', 'slot.start_time', 'slot.end_time', 'slot.day_of_week', 'slot.date')
                .joinRelated('[subject_teacher(subjectTeacherSelects), slot(slotSelects)]')
                .modifiers({
                    subjectTeacherSelects: builder2 => builder2
                    .select('subject.subjectName', 'subject.subject_code', 'teacher.teacherName', 'teacher.teacherEmail')
                    .joinRelated('[subject(subjectSelects), teacher(teacherSelects)]')
                    .modifiers({
                        subjectSelects: builder3 => builder3.select('subjects.name as subjectName', 'subject_code'),
                        teacherSelects: builder3 => builder3.select('users.name as teacherName', 'users.email as teacherEmail')
                    }),
                    slotSelects: builder2 => builder2.select('start_time', 'end_time', 'day_of_week', 'date')
                })
            });
            [err, result] = await resolvePromise(selectionQuery);

            if (err) {
                const errorResponse = await this.getErrorResponse(err);
                return Promise.reject(errorResponse);
            }

            return result;
        } catch (error) {
            const errorResponse = await this.getErrorResponse(error);
            return Promise.reject(errorResponse);
        }
    };

    lowAttendanceStudents = async (subjectCode) => {
        try {
            let err, result;

            //Query to get count of all attended classes for all students for a particular subject
            const selectionQuery = AttendanceModel.query()
            .where({ is_present: true, 'class.subject_code': subjectCode })
            .count('class.date as attendance_count')
            .groupBy('student.studentName')
            .joinRelated('[class(classSelects), student(studentSelects)]')
            .modifiers({
                studentSelects: builder => builder.select('users.name as studentName'),
                classSelects: builder => builder
                .select('class_code', 'subject_teacher.subjectName', 'subject_teacher.subject_code', 'slot.start_time', 'slot.end_time', 'slot.day_of_week', 'slot.date')
                .joinRelated('[subject_teacher(subjectTeacherSelects), slot(slotSelects)]')
                .modifiers({
                    subjectTeacherSelects: builder2 => builder2
                    .select('subject.subjectName', 'subject.subject_code')
                    .joinRelated('subject(subjectSelects)')
                    .modifiers({
                        subjectSelects: builder3 => builder3.select('subjects.name as subjectName', 'subject_code')
                    }),
                    slotSelects: builder2 => builder2.select('start_time', 'end_time', 'day_of_week', 'date')
                })
            });
            [err, result] = await resolvePromise(selectionQuery);

            if (err) {
                const errorResponse = await this.getErrorResponse(err);
                return Promise.reject(errorResponse);
            }
            const studentAttendance = result;

            //Query to get the total number of classes of the particular subject
            const totalClassesQuery = AttendanceModel.query()
            .where({ 'class.subject_code': subjectCode })
            .countDistinct('class.date')
            .joinRelated('class(classSelects)')
            .modifiers({
                classSelects: builder => builder
                .select('slot.date', 'subject_teacher.subject_code')
                .joinRelated('[subject_teacher(subjectTeacherSelects), slot(slotSelects)]')
                .modifiers({
                    subjectTeacherSelects: builder2 => builder2
                    .select('subject.subject_code')
                    .joinRelated('subject(subjectSelects)')
                    .modifiers({
                        subjectSelects: builder3 => builder3.select('subject_code')
                    }),
                    slotSelects: builder2 => builder2.select('date')
                })
            });
            [err, result] = await resolvePromise(totalClassesQuery);
            
            if (err) {
                const errorResponse = await this.getErrorResponse(err);
                return Promise.reject(errorResponse);
            }

            const totalClasses = result;
            const threshold = 0.85;

            const lowAttendanceStudents = studentAttendance.filter(student => (student.attendance_count/totalClasses) < threshold);

            return lowAttendanceStudents;

        } catch (error) {
            const errorResponse = await this.getErrorResponse(error);
            return Promise.reject(errorResponse);
        }
    };
}

module.exports = AttendanceService;
