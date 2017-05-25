<?php
// 图片和表单内容的提交上传
// print_r($_FILES['upfile']['name'][1]);
// if($_FILES['files']){
// 	$file=$_FILES['files'];
// 	$fLength=count($file['name']);
// 	for ($i=0;$i<$fLength;$i++){
// 		$name=$file['name'][$i];
// 		$tmp=$file['tmp_name'][$i];
// 	    move_uploaded_file($tmp, 'uploads/'.iconv("UTF-8","gbk",$name));
// 	}
// 	// move_uploaded_file($tmp, 'uploads/'.$name);
// 	print_r($file);	
// }
// else if($_FILES['file']){
// 	$file=$_FILES['file'];
// 	$name=$file['name'][$i];
// 	$tmp=$file['tmp_name'][$i];
// 	print_r($name.'<br>'.$tmp);
// }

//blob读取不知如何读取
	$file=$_FILES['file'];
	$name=$file['name'];
	$tmp=$file['tmp_name'];
	move_uploaded_file($tmp, 'uploads/'.iconv("UTF-8","gbk",$name));
	print_r($name.'<br>'.$tmp);

?>