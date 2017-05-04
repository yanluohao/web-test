<?php
// 图片和表单内容的提交上传
// print_r($_FILES['upfile']['name'][1]);
$file=$_FILES['files'];
$fLength=count($file['name']);
for ($i=0;$i<$fLength;$i++){
	$name=$file['name'][$i];
	$tmp=$file['tmp_name'][$i];
    move_uploaded_file($tmp, 'uploads/'.iconv("UTF-8","gbk",$name));
}
// move_uploaded_file($tmp, 'uploads/'.$name);
print_r($file);

?>