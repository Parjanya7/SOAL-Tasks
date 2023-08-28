const AttendanceService = require('../../services/attendance/AttendanceService');

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const lastFiveAttendedClassesAction = async (req, res, next) => {
    try {
        //Instead of sending id of student directly in request params, we can use authentication tokens formed using user data like uuid and decode them to obtain uuid/id of the user. This practise is not a safe one to directly use the id columns from db.
        const studentId = req.params.studentId;
        const subjectCode = req.params.subjectCode;
        const attendance = new AttendanceService();
        const result =  await attendance.lastFiveAttendedClasses(studentId, subjectCode);
        res.status(200).json({
            state: true,
            message: 'List of last 5 classes attended by the student.',
            data: result
        });
    } catch (error) {
       next(error);
    }
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const attendanceInAMonthAction = async (req, res, next) => {
    try {
        //Instead of sending id of student directly in request params, we can use authentication tokens formed using user data like uuid and decode them to obtain uuid/id of the user. This practise is not a safe one to directly use the id columns from db.
        const studentId = req.params.studentId;
        const month = req.params.month;
        const subjectCode = req.params.subjectCode;
        const attendance = new AttendanceService();
        const result =  await attendance.attendanceInAMonth(studentId, month, subjectCode);
        res.status(200).json({
            state: true,
            message: `List of all classes attended by the student for the month of ${month}.`,
            data: result
        });
    } catch (error) {
       next(error);
    }
};

const lowAttendanceStudentsAction = async (req, res, next) => {
    try {
        const subjectCode = req.params.subjectCode;
        const attendance = new AttendanceService();
        const result =  await attendance.lowAttendanceStudents(subjectCode);
        res.status(200).json({
            state: true,
            message: `List of all students with attendance less than 85%.`,
            data: result
        });
    } catch (error) {
       next(error);
    }
};

module.exports = { lastFiveAttendedClassesAction, attendanceInAMonthAction, lowAttendanceStudentsAction };
