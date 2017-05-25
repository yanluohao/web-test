<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
	<title></title>
	<link rel="stylesheet" href="">
	<script src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js"></script>
	<style>
		#process {
			display: block;
			width: 200px;
			height: 10px;
		}
		#status{
			width:0px;
			transition: all .2s;
			height: 100%;
			background: #ff6b00;
		}
		.container{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1000;
			background: #fff;
		}
		.bottom{
			position: absolute;
			bottom: 0;
			width: 100%;
			font-size: 0;
		}
		.bottom>div{
			display: inline-block;
			width: 20%;
			background: #18b4ed;
			color: #fff;
			font-size: 14px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			margin-right: 20%;
		}
		.bottom .confirm{
			margin-right: 0;
		}
		.show-image,
		.cover-range{
			position: absolute;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
		}
		.cover-range>div>div{
			position: absolute;
			background: rgba(0, 0, 0, 0.3);
			z-index: 1001;			
		}
		.top-cover{
			width: 100%;
			top: 0;
		}
		.bottom-cover{
			width: 100%;
		}
		.cover-range .clipbox{
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border: 1px dashed rgb(211,211,211);
			background: #fff;
			z-index: 10;
		}
		.show-image img{
			position: absolute;
			float: left;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			max-width: 100%;
			max-height: 100%;
			z-index: 999;
		}
		.show-image canvas{
			position: absolute;
			z-index: 1999;
		}
		.show-container,
		.cover-container{
			position: relative;
			height: 100%;
		}
	</style>
</head>

<body>
	上传文件<input type="file" name="upfile" id="file" multiple><br>
	<div id="process">
		<div id="status"></div>
		<p id="status-num"></p>
	</div>


	<button id="upload-img">上传图片</button>
	<input id="fileImg" type="file" accept="image/gif,image/vnd.dwg,image/vnd.dxf,image/gif,image/jp2,image/jpeg,image/png,image/vnd.svf,image/tiff" />
	<div class="container">
		<div class="show-image">
			<!-- <div class="show-container"></div> -->
		</div>
		<div class="cover-range">
			<div class="cover-container">
				<div class="top-cover"></div>
				<div class="left-cover"></div>
				<div class="clipbox"></div>
				<div class="right-cover"></div>
				<div class="bottom-cover"></div>
			</div>
		</div>
		<div class="bottom">
			<div class="back">返回</div>
			<div class="clip">选择图片</div>
			<div class="confirm">确定</div>
		</div>
	</div>
	<script>
		let demoFile = document.getElementById("file");
		loadStatus=document.getElementById("status");
		loadNum=document.getElementById("status-num");
		uploadBtn = document.getElementById("upload");
		demoFile.addEventListener("change", callback, false);

		function callback() {
			//单个上传
			// var file = demoFile.files[0];
			//创建一个form对象
			// var data = new FormData();
			// data.append('myfile', file);

			var data = new FormData();
			for(var i=0;i<demoFile.files.length;i++){
				var file=demoFile.files[i];
				data.append('files[]',file,file.name);
				// append方法提供第三个可选参数用于指定文件名，这样就可以使用同一个表单项名，然后用文件名区分上传的多个文件。这样也方便前后台的循环操作。
			}
			console.log(data.get('files[]'));
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "controller.php");
			xhr.upload.onprogress=function(e){
				if(e.lengthComputable){
					var status=(event.loaded / event.total) * 100;
					loadStatus.style.width=parseInt(status)+"%";
					loadNum.innerHTML=parseInt(status)+"%";
					console.log(status);
				}
			}
			xhr.onload = function () {
				if (this.status === 200) {
					//对请求成功的处理
					console.log(xhr.responseText);
				}
			}
			xhr.send(data);


			// $.ajax({
			// 	url:"controller.php",
			// 	type:"post",
			// 	data:data,
			// 	contentType: false,    //不可缺
			// 	processData: false,    //不可缺
			// 	success(res){
			// 		console.log(res);
			// 	},
			// 	error(){
			// 		console.log("失败");
			// 	}
			// })
		}
	</script>
	<script type="text/javascript">
		var uploadBtn=document.querySelector("#upload-img");
		var uploadImgBtn=document.querySelector(".clip");
		var uploadFileImg=document.querySelector("#fileImg");
		var imgContainer=document.querySelector(".show-image");
		var rangeCover=document.querySelector(".cover-range");
		var clipBox=document.querySelector(".clipbox");
		var topCover=document.querySelector(".top-cover");
		var leftCover=document.querySelector(".left-cover");
		var rightCover=document.querySelector(".right-cover");
		var bottomCover=document.querySelector(".bottom-cover");
		var confirmBtn=document.querySelector(".confirm");

		imgContainer.style.height=imgContainer.clientHeight-40+"px";
		var canvasWidth=100;
		var canvasHeight=100;
		var options={
			width:canvasWidth,
			height:canvasHeight,
			x:(imgContainer.clientWidth/2)-(canvasWidth/2),
			y:(imgContainer.clientHeight/2)-(canvasHeight/2),
			type:"image/png"
		}


		rangeCover.style.height=imgContainer.clientHeight+"px";
		console.log(imgContainer.style.height,imgContainer.clientHeight);
		clipBox.style.width=canvasWidth+"px";
		clipBox.style.height=canvasHeight+"px";
		topCover.style.height=options.y+"px";
		leftCover.style.width=options.x+"px";
		leftCover.style.height=canvasHeight+"px";
		leftCover.style.top=options.y+"px";
		rightCover.style.width=leftCover.style.width;
		rightCover.style.height=leftCover.style.height;
		rightCover.style.top=leftCover.style.top;
		rightCover.style.right=0;
		bottomCover.style.height=topCover.style.height;
		bottomCover.style.bottom=0;


		uploadImgBtn.onclick=function(){
			if(!window.atob||!Blob||!FileReader){
				alert("换个高级点的浏览器吧,亲");
				return false;
			}
			uploadFileImg.click();
		}
		uploadFileImg.onchange=function(e){
			var that=this;
			var files=e.target.files;
			var reader=new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload=function(e){
				var mb=(e.total)/1024/1024;
				if(mb>2){
					alert("图片过大，请选择小一点的图片哟");
					return false;
				}
				var img=new Image();
				img.src=this.result;
				if(imgContainer.querySelector("canvas")){
					imgContainer.innerHTML="";
					// imgContainer.removeChild(imgContainer.querySelector("canvas"));
				}
				imgContainer.appendChild(img);
				var canvas=document.createElement("canvas");
				canvas.setAttribute("width",options.width);
				canvas.setAttribute("height",options.height);
				canvas.style.top=options.y+"px";
				canvas.style.left=options.x+"px";
				imgContainer.appendChild(canvas);
			}
		}
		confirmBtn.onclick=function(){
			var targetImg=imgContainer.querySelector("img");
			if(!targetImg){
				alert("请上传你的图片");
				return false;
			}
			var targetCanvas=imgContainer.querySelector("canvas");
			var left=targetImg.getBoundingClientRect().left;
			var top=targetImg.getBoundingClientRect().top;
			var canvasLeft=targetCanvas.getBoundingClientRect().left;
			var canvasTop=targetCanvas.getBoundingClientRect().top;
			var x=canvasTop-top;
			var y=canvasLeft-left;
			// var canvas2=document.createElement("canvas");
			// 	canvas2.setAttribute("width",options.width);
			// 	canvas2.setAttribute("height",options.height);
				// canvas2.style.position="relative";    方便调试时的使用
				// canvas2.style.zIndex="11111";
			var canvas2=targetCanvas;
			var ctx=canvas2.getContext('2d');
			ctx.drawImage(targetImg,x,y,canvasWidth,canvasHeight,0,0,canvasWidth,canvasHeight);
			// document.body.append(canvas2);
			//先转为base64
			var baseData=canvas2.toDataURL(options.type);//默认为png 
			baseData=baseData.split(",")[1];
			//再转为blob对象
			baseData=window.atob(baseData);
			var ia=new Uint8Array(baseData.length);
			for(var i=0,len=ia.length;i<len;i++){
				ia[i]=baseData.charCodeAt(i);
			}
			var blob=new Blob([ia],{type:options.type});

			//转为FormData
			var ajaxData=new FormData();
			imgContainer.removeChild(targetImg);
			ajaxData.append('file',blob);
			$.ajax({
				url:"controller.php",
				type:"POST",
				data:ajaxData,
				contentType: false,    //不可缺
				processData: false,    //不可缺
				success:function(res){
					console.log(res);
				}
			})
		}
	</script>

	<!--<?php
		// 图片和表单内容的提交上传
		// print_r($_FILES['upfile']['name'][1]);
		// for($i=0;$i<count($_FILES['upfile']['name']);$i++)
		// {
		// 	if($_FILES['upfile']['error'][$i]==0){
		// 		$file=$_FILES['upfile'];
		// 		$name=$file['name'][$i];
		// 		$tmp=$file['tmp_name'][$i];
		// 		move_uploaded_file($tmp, 'uploads/'.$name);
		// 	}
		// 	else{
		// 		echo '<script>alert("报错啦")</script>';
		// 	}
		// }
		// print_r($_POST['name']);
	?>-->
</body>

</html>