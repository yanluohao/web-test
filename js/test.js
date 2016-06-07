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
var arr=[1,1,2,3,2,5,3,4];
var b=[];
for(var i=0;i<arr.length;i++){
	if(b.toString().indexOf(arr[i])==-1)            数组去重2
		b.push(arr[i]);
}
console.log(b);
*/
/*
function a(){
	this.name="lee";
	this.age=11;
}
function b(age,name,ggrade){
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
console.log(c1.age);
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