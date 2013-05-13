//jsToolBox   JS工具箱


//json的序列化和反序列化
/*
var obj = {  
    "name": "LiLi", 
    "age": 22,  
    "sex": "F"  
}; 
 
var str = JSON.stringify(obj); 
console.log(str); 
 
var obj2 = JSON.parse(str); 
console.log(obj2); 
*/

//获取当前时间并序列化
exports.getTimeNow = function () {

	var timeNow = new Date(); // 初始化日期对象			
	var daystr = timeNow.getFullYear() +"-"+checkTime(timeNow.getMonth()+1)+"-"+checkTime(timeNow.getDate());
    var timestr = checkTime(timeNow.getHours())+":"+checkTime(timeNow.getMinutes())+":"+checkTime(timeNow.getSeconds());
    return daystr+" "+timestr;
	
};

//获取当前时间并序列化.辅助函数
function checkTime(i){
	if(i<10)
	i = "0"+i;
	return i;
}


//获取提交的参数
exports.getParam = function(req,paramName){
    if(!req.query[paramName])
        return req.body[paramName];

    return req.query[paramName];
};

//返回数据模型
exports.sqlObj = {
    code:"0",
    cause:"",
    value:{}
};

//返回接口模型
exports.ifObj = {
    req:null,
    res:null,
    ifName:"",
    userName:"",
    accessToken:"",
    caseNo:"",
    sqlCmd:""
};
