const { lastFiveAttendedClassesAction, attendanceInAMonthAction, lowAttendanceStudentsAction } = require('../controllers/attendance/attendance.controller');

module.exports = function(app) {
    //A middleware function for validating an auth token should ideal be placed before the controller function gets hit.
    app.get('/last-five-classes/:subjectCode/:studentId', lastFiveAttendedClassesAction);
    app.get('/attendance-in-month/:subjectCode/:studentId/:month', attendanceInAMonthAction);
    app.get('/low-attendance-students/:subjectCode', lowAttendanceStudentsAction);
};