const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormUser = require('../orm/orm-user');
const { isUuid } = require('uuidv4');


exports.GetAll = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormUser.GetAll();
        if(respOrm.err){
            status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetById = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        if(isUuid(id)){
            respOrm = await ormUser.GetById(id);
            if(respOrm && respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                if (respOrm) {
                    message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
                }else{
                    status = 'Failure', errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
                }
            }
        }else{
            status = 'Failure', errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error trying convert uuid to string', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}


exports.Store = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const Name = req.body.Name;
        const LastName = req.body.LastName;
        const Age = req.body.Age;
        if( Name && LastName && Age ){
            respOrm = await ormUser.Store( Name, LastName, Age );
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User created', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.UpdateById = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        if(isUuid(id)){
            const Name = req.body.Name;
            const LastName = req.body.LastName;
            const Age = req.body.Age;
            if( Name && LastName && Age ){
                respOrm = await ormUser.UpdateById( Name, LastName, Age, id );
                if(respOrm.err){
                    status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
                }else{
                    message = 'User updated', statusCode = enum_.CODE_CREATED;
                }
            }else{
                status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
            }
        }else{
            status = 'Failure', errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error trying convert uuid to string', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}
exports.DeleteById = async (req, res) =>{
    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        if(isUuid(id)){
            respOrm = await ormUser.DeleteById(id);
            if(respOrm.err){
                status = 'Failure', errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'User deleted', statusCode = enum_.CODE_OK;
            }
        }else{
            status = 'Failure', errorCode = enum_.FAIL_CONVERTED_UUID_TO_STRING, message = 'Error trying convert uuid to string', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}