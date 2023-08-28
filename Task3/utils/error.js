//A common error handing function, which will generate an appropiate error for a particular use case

/**
 *
 *
 * @param {*} err
 * @return {*} 
 */
const errorHandler = async (err) => {
    var response = {
        status: null,
        message: null,
        type: null,
        data: null
    };

    if (err.message == 'A particular customized error') {
        response.status = 500;
        response.message = 'Customized Error Message.';
        response.type = 'CustomizedErrorType';
        response.data = {};
    } else {
        response.status = 500;
        response.message = err.message;
        response.type = 'UnknownError';
        response.data = {};
    }

    return response;
}

module.exports = { errorHandler };
