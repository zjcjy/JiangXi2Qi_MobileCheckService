/**
 * 项目内部不公开接口，用于对信令Token的相关操作
 * User: 陈瑾毅
 * Date: 13-4-14
 * Time: 上午2:38
 * To change this template use File | Settings | File Templates.
 */

exports.checkAccessToken = function (_AccessToken,_callback,_ifObj){
    _callback(true,_ifObj);
};

exports.getAccessToken = function (_UserName,_callback,_ifObj) {
    _callback("123",_ifObj);
};