window.onload=function(){
	waterfall("main","box");
	var dataint={"data":[{"src":"images/0.jpg"},{"src":"images/1.jpg"},{"src":"images/2.jpg"},{"src":"images/3.jpg"},{"src":"images/4.jpg"},{"src":"images/5.jpg"}]};
	window.onscroll=function(){
		if(checkscroll()){
			var oParent=document.getElementById("main");
			for(var i=0;i<dataint.data.length;i++){
				var abox=document.createElement("div");
				abox.className="box";
				oParent.appendChild(abox);
				var apic=document.createElement("div");
				apic.className="pic";
				abox.appendChild(apic);
				var aimg=document.createElement("img");
				aimg.src=dataint.data[i].src;
				apic.appendChild(aimg);
			}
			waterfall("main","box");
		}

	}
}

function waterfall(parent,box){
	var oParent=document.getElementById(parent);           //获取父级元素
	var arrBox=getClassObj(oParent,box);                   //获取存储块框box的数组arrBox;
	var arrBoxW=arrBox[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/arrBoxW);   //列数
	oParent.style.cssText="width:"+arrBoxW*num+"px;margin:0 auto";      //定义父级元素的宽度并且居中
	var boxHarr=[];                                                   
	for(var i=0;i<arrBox.length;i++){
		var boxH=arrBox[i].offsetHeight;
		if(i<num){
			boxHarr[i]=boxH;
		}
		else{
			minH=Math.min.apply(null,boxHarr);                           //求出高度数组中的最小高度
			minIndex=getMinIndex(boxHarr,minH);                          //求出数组中最小高度的对应索引
			arrBox[i].style.position="absolute";                         //给对象设置属性与 定位;
			arrBox[i].style.top=minH+"px";
			arrBox[i].style.left=arrBox[minIndex].offsetLeft+"px";
			boxHarr[minIndex]+=arrBox[i].offsetHeight;                   //更新在最小索引下添加一张图片的新高度
		}
	}
}

function getClassObj(parent,className){
	var obj=parent.getElementsByTagName("*");  //获取父级parent下的所有元素
	var boxs=[];                               //创建一个数组勇于收集子集;
	for(var i=0;i<obj.length;i++){
		if(obj[i].className==className){
			boxs.push(obj[i]);                 //获取所有元素中和目标className相同的元素
		}
	}
	return boxs;                               //返回获得元素集合;
}

function getMinIndex(arr,minH){
	for(var i in arr){
		if(arr[i]==minH){
			return i;
		}
	}
}
//判断滚动条高加上显示窗口的高是否大于最后一个元素所在的高度；
function checkscroll(){
	var oParent=document.getElementById("main");
	var oBoxs=getClassObj(oParent,"box");
	var i=oBoxs.length-1;
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	var lastHeight=oBoxs[i].offsetTop+oBoxs[i].offsetHeight/2;
	console.log(lastHeight);
	console.log(scrollTop);
	console.log(height);
	if(lastHeight<scrollTop+height){
		return true;
	}else{
		return false;
	}
}