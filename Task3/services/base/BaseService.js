const { errorHandler } = require('../../utils/error');

/**
 *
 *
 * @class BaseService
 */
class BaseService {
    //Global Error Generation

    /**
     *
     *
     * @param {*} err
     * @memberof BaseService
     */
    getErrorResponse = async (err) => {
        var response = {
            status: 500,
            message: null,
            type: null,
            data: null
        };

        if(err.name == 'DBError'){
            response.message = err.message;
            response.type = err.name;
            response.data = {};
        }
        else {
            response = await errorHandler(err);
        }
        return response;
    }


    //Global Response Generation
    /**
     *
     *
     * @param {*} status
     * @param {*} message
     * @param {*} type
     * @param {*} data
     * @memberof BaseService
     */
    generateResponse = async (status, message, type, data) => {
        var response = {
            status: status,
            message: message,
            type: type,
            data: data
        };
        return response;
    };
}

module.exports = BaseService;
