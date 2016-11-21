/*
function a(){
	var i=0;
	function b(){
		i++;
		console.log(i);
	}
	return b;
}
var result=a();
result();
result();

var arr=[];
for(var i=0;i<3;i++){
	arr.push(i)
};
console.log(arr);
*/
/*
function loadDoc(){
	var XHR;
	if(window.XMLHttpRequest){
		XHR=new XMLHttpRequest();
	}
	else{
		XHR=new ActiveXObject("Microsoft.XMLHTTP");
	}

XHR.onreadystatechange=function(){
    if(XHR.status=200&&XHR.readyState==4){
        document.getElementById("t").innerHTML=XHR.responseText;
    }
    else{
        alert("your problem is"+XHR.statusText);
    }
 }
}
XHR.open("get",url,true);
XHR.send(null);
*/                           //AJAX的样例

/*
var arr=[1,2,2,2,1,3,3];
console.log(arr.sort().reverse());
*/

/*
var a="1111,2222,3333";
 var b=a.split(",");
 console.log(b);
 console.log( b.join("x"));
*/

/*
var arr=[1,2,3,3,4,5]
var b=arr.slice(2,4);
console.log(arr);
console.log(b);
*/

/*
var arr=[1,3,2,3,4,5]
    arr.splice(2,0,7);
    console.log(arr);            //数组的splice用法
    arr.splice(2,1);
    console.log(arr);
*/

/*
var arr=[1,1,2,3,2,4,5,4];

    arr.sort();
    b=[arr[0]];

    for(var i=0;i<arr.length;i++){
    	if(arr[i]!=b[b.length-1])
    		b.push(arr[i]);    
    }
    
    console.log(b);
    */  //数组去重

/*
var arr=[1,1,2,3,2,5,3,4,15,16];
var b=[];
for(var i=0;i<arr.length;i++){
	if(b.toString().indexOf(arr[i])==-1)            //数组去重2
		b.push(arr[i]);
}
console.log(b);
*/

/*
function a(){
	this.name="lee";
	this.age=11;
}
function b(age,name){
	this.grade="二年级";
	a.call(this,age,name);      //类式继承
}
var c=new b();
console.log(c);


function a1(){
	this.name="x";
}
function b1(){
	this.age="13";               //原型继承
}

b1.prototype=new a1();
var c1=new b1();
console.log(c1.name);
*/

/*
var date=new Date();           //日期本地化

console.log(date.toLocaleString());
*/

/*
document.oncontextmenu=function(evt){
    evt.preventDefault();                   //页面禁止复制;
}
document.onselectstart=function(evt){
    evt.preventDefault();
}
*/

/*
  function add(x){
    var sum=x;
    var temp=function(y){
        sum=sum+y;                            //类似add(1)(2)(3)的实现方式
        return temp;
    }
    temp.toString=function(){
        return sum;
    }
    return temp;
  }
  alert(add(3)(1));
*/

/*
function createCompare(pro){
	return function(obj1,obj2){
		var val1=obj1[pro];
		var val2=obj2[pro];
		if(val1<val2){
			return 1;
		}
		else if(val1>val2){
			return -1;                          //返回一个函数
		}
		else{
			return 0;
		}
	}
}

var compare=createCompare("name");
console.log(compare({name:"wsz"},{name:"hh"}));
*/

/*
myname="global";
function func(){
	console.log(myname);
	var myname="y";                           //var
	console.log(myname);
}
func();

//上述代码等同于
myname="global";
function func(){
	var myname;
	console.log(myname);    //所以是undefined
	myname="y";                           //var
	console.log(myname);
}
func();
*/

/*
//this相关
var foo = {x: 10};
 
var bar = {
  x: 20,
  test: function () {
 
    console.log(this === bar); // true
    console.log(this.x); // 20
 
    //this = foo; // 错误，任何时候不能改变this的值
 
    console.log(this.x); // 如果不出错的话，应该是10，而不是20
 
  }
 
};
bar.test();
foo.test=bar.test;
foo.test();


//获取url中的参数
function basejs_getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
*/

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
/* 
Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
*/

/*
//格式化计算天数差
    //计算天数差
var register_day = "2016-08-11";
var time_today = new Date().Format("yyyy-MM-dd");
var year_1 = register_day.substr(0, 4);
var year_2 = time_today.substr(0, 4);
var month_1 = register_day.substr(5, 2);
var month_2 = time_today.substr(5, 2);

var day_1 = register_day.substr(8, 2);
var day_2 = time_today.substr(8, 2);

temp_1 = year_1 + "/" + month_1 + "/" + day_1;
temp_2 = year_2 + "/" + month_2 + "/" + day_2;

var dateaa = new Date(temp_1);
var datebb = new Date(temp_2);
var datedifference = datebb.getTime() - dateaa.getTime();
var day = Math.floor(datedifference / (1000 * 60 * 60 * 24)) + 1;

//localStorage.removeItem("popup_counts");

console.log(day);
*/

// 多位数数字使用sort排序
var demoArr=[1,3,4,22,5,6,17,2,3,1,111,221];
function sortNumber(a,b){
    return a-b;
}
demoArr.sort(sortNumber);
console.log(demoArr);