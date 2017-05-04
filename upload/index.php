<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
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
	</style>
</head>

<body>
	上传文件<input type="file" name="upfile" id="file" multiple><br>
	<div id="process">
		<div id="status"></div>
		<p id="status-num"></p>
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