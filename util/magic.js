const enum_ = require('./enum');

exports.ResponseService = async(status, errorCode, message, data)=>{
    return await {status: status, Resp:{errorCode: errorCode, message: message, data: data}}

}

exports.LogSuccess = (msg) => {
    console.log(enum_.GREEN_LOG, msg);
}
exports.LogInfo = (msg) => {
    console.log(enum_.CYAN_LOG, msg);
}
exports.LogWarning = (msg) => {
    console.log(enum_.YELLOW_LOG, msg);
}
exports.LogDanger = (msg) => {
    console.log(enum_.RED_LOG, msg);
}


exports.ResponseService = async(status, code, message, data)=>{
    return await {status: status, Resp:{Error: code, message: message, data: data}}

}