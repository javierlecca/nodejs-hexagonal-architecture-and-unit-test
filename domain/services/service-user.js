const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormUser = require('../orm/orm-user');


exports.GetAll = async (req, res) =>{
    try{
        data = await ormUser.GetAll();
        if(data.err){
            const response = await util.ResponseService('Failure',data.err.code,data.err.messsage,'');
            console.log(`/datacenters  :: [GET] ::  :: ${enum_.CODE_BAD_REQUEST}  :: ${response}` );
            return res.status(enum_.CODE_BAD_REQUEST).send(response);
        }else{
            const code = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
            const response = await util.ResponseService('Success','','Success Response',data);
            console.log(`/datacenters  :: [GET] ::  :: ${code}  :: ${response}` );
            return res.status(code).send(response);
        }
    } catch(err) {
        console.log("err = ", err);
        const response = await util.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        console.log(`/datacenters  :: [GET] ::  :: ${enum_.CODE_INTERNAL_SERVER_ERROR}  :: ${response}` );
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(response);
    }
}

exports.GetById = async (req, res) =>{
    console.log(enum_.CYAN_LOG, '[GET] = /datacenters/:id method = [GETBYID]');
    try{
        const id = req.params.id;
        if(isUuid(id)){
            data = await ormUser.GetById(id);
            if(data.err){
                return res.status(enum_.CODE_BAD_REQUEST).send(await util.ResponseService('Failure',data.err.code,data.err.messsage,''));
            }else{
                if (data) {
                    return res.status(enum_.CODE_OK).send(await util.ResponseService('Success','','Success Response',data));
                }else{
                    return res.status(enum_.CODE_NOT_FOUND).send(await util.ResponseService('Failure',enum_.ID_NOT_FOUND,'ID NOT FOUND',''));
                }
            }
        }else{
            return res.status(enum_.CODE_BAD_REQUEST).send(await util.ResponseService('Failure',enum_.FAIL_CONVERTED_UUID_TO_STRING,'Error trying convert uuid to string',''));
        }
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}


exports.Store = async (req, res) =>{
    console.log(enum_.GREEN_LOG, '[POST] = /datacenters/ method = [STORE]');

    let status = 'Success', errorCode ='', message='', data='', statusCode=0, resp={};

    try{
        const Name = req.body.Name;
        const LastName = req.body.LastName;
        const Age = req.body.Age;
        if( Name && LastName && Age ){
            respOrm = await ormUser.Store( Name, LastName, Age );
            if(respOrm.err){
                status = 'Failure', errorCode = data.err.code, message = data.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
                resp = await magic.ResponseService(status,errorCode,message,data)
            }else{
                message = 'User created', statusCode = enum_.CODE_CREATED;
                resp = await magic.ResponseService(status,errorCode,message,data)
            }
        }else{
            status = 'Failure', errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
            resp = await magic.ResponseService(status,errorCode,message,data)
        }
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.DeleteById = async (req, res) =>{
    console.log(enum_.RED_LOG, '[DELETE] = /datacenters/:id method = [DELETEBYID]');
    try{
        const id = req.params.id;
        if(isUuid(id)){
            const Name = req.body.Name;
            const Type = req.body.Type;
            const Location = req.body.Location;
            data = await ormUser.UpdateById(id);
            if(data.err){
                return res.status(enum_.CODE_BAD_REQUEST).send(await util.ResponseService('Failure',data.err.code,data.err.messsage,''));
            }else{
                return res.status(enum_.CODE_OK).send(await util.ResponseService('Success','','Datacenter deleted',''));
            }
        }else{
            return res.status(enum_.CODE_BAD_REQUEST).send(await util.ResponseService('Failure',enum_.FAIL_CONVERTED_UUID_TO_STRING,'Error trying convert uuid to string',''));
        }
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}
exports.UpdateById = async (req, res) =>{
    console.log(enum_.YELLOW_LOG, '[PATCH] = /datacenters/:id method = [UPDATEBYID]');
    try{
        const id = req.params.id;
        if(isUuid(id)){
            data = await ormUser.DeleteById(id);
            if(data.err){
                return res.status(enum_.CODE_BAD_REQUEST).send(await util.ResponseService('Failure',data.err.code,data.err.messsage,''));
            }else{
                return res.status(enum_.CODE_OK).send(await util.ResponseService('Success','','Datacenter updated',''));
            }
        }else{
            return res.status(enum_.CODE_BAD_REQUEST).send(await util.ResponseService('Failure',enum_.FAIL_CONVERTED_UUID_TO_STRING,'Error trying convert uuid to string',''));
        }
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await util.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}