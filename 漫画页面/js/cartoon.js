window.onload = function() {
    //判断入职天数根据天数加载不同的内容;
    if (localStorage.popup_counts == undefined) {
        localStorage.popup_counts = "0";
    }
    //获取当前日期的对应时间具体到时分秒;
    function if_newDay() {
        function getNewTime() {
            var getnewTime = new Date();
            var getnewHours = getnewTime.getHours();
            var getnewMinutes = getnewTime.getMinutes();
            var getnewSeconds = getnewTime.getSeconds();
            if (getnewHours == 0 && getnewMinutes == 0 && getnewSeconds == 1) {
                localStorage.popup_counts = "0";
            }
        }
        timer = setInterval(getNewTime, 1000);
    }
    if_newDay();
    if (day == 1) {
        if (localStorage.popup_counts.indexOf("0") != -1) {
            //跳转到漫画起始观看页
            $(".popcover").after('<div id="popup1"></div>');
            var popup = document.getElementById("popup1");
            var newbiePic = document.createElement("img");
            newbiePic.className = "newbiepic";
            newbiePic.src = "images/firstDay.png";
            popup.appendChild(newbiePic);
            var cancelbtn1 = document.createElement("img");
            cancelbtn1.className = "cancelbtn1";
            cancelbtn1.src = "images/cancelbtn.png";
            cancelbtn1.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtn1);
            var enterbtn = document.createElement("img");
            enterbtn.className = "enterbtn";
            enterbtn.src = "images/enterbtn.png";
            enterbtn.setAttribute("onclick", "firstday.showCartoon(this)");
            popup.appendChild(enterbtn);
            localStorage.popup_counts = localStorage.popup_counts.replace("0", "1");
            if (wHeight <= 800&&wHeight>=700) {
                $(".newbiepic").css("width", "550px");
            }
            else if(wHeight<700){
                $(".newbiepic").css("width", "480px");
            }
        } else {
            $(".popcover").hide();
            $(".cartoonsmpic").fadeIn();
        }
    } else if (day > 1 && day <= 90) {
        //if条件内day<=的数值需要做修改根据漫画的天数修改
        if (localStorage.popup_counts.indexOf("0") != -1) {
            common.showCartoon();
            localStorage.popup_counts = localStorage.popup_counts.replace("0", "1");
        } else {
            $(".popcover").hide();
            $(".cartoonsmpic").fadeIn();
        }
    } else {
        $(".popcover").hide();
    }
    //清理本地缓存
    localStorage.removeItem("popup_counts");
}
//判断浏览器的分辨率,兼容1366分辨率的老土做法;
var wHeight = $(window).height();
//用户注册日期与系统日期之间的差
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
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
    //计算天数差
var register_day = "2016-08-01";
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
var chapter_look=Math.ceil(day/3);
var minDay=day;

var list_page = 0;
//弹窗消失，小图显示

var common = {
        cancelPop: function(obj) {
            $(obj).parent("#popup1").remove();
            $(".popcover").hide();
            $(".cartoonsmpic").fadeIn();
        },
        //上一张与下一张
        cartoonPrev: function() {
            var picId = $(".cartoonbox>img").attr("name");
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look) {
                    nowdayArr.push(dataint[i]);
                }
            }
            nowdayLength = nowdayArr.length;
            $(".cartoonPages span").eq(2).html(nowdayLength);
            if (picId <= 1) {
                if (chapter_look == 1) {

                } else {
                    chapter_look--;
                    var dayArr = [];
                    for (var i = 0; i < dataint.length; i++) {
                        if (dataint[i].day == chapter_look) {
                            dayArr.push(dataint[i]);
                        }
                    }
                    dayLength = dayArr.length;
                    $(".cartoonPages span").eq(2).html(dayLength);
                    picId = dayLength;
                    for (var j = 0; j < dataint.length; j++) {
                        if (dataint[j].day == chapter_look && dataint[j].id == picId) {
                            $(".cartoonbox>img").attr("src", dataint[j].src);
                            $(".cartoonbox>img").attr("name", dataint[j].id);
                            $(".cartoonPages span").eq(0).html(dataint[j].id);
                        }
                    }
                }
            } else {
                picId--;
                for (var i = 0; i < dataint.length; i++) {
                    if (dataint[i].day == chapter_look && dataint[i].id == picId) {
                        $(".cartoonbox>img").attr("src", dataint[i].src);
                        $(".cartoonbox>img").attr("name", dataint[i].id);
                        $(".cartoonPages span").eq(0).html(dataint[i].id);
                    }
                }
            }
        },
        cartoonNext: function() {
            var picId = $(".cartoonbox>img").attr("name");
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look) {
                    nowdayArr.push(dataint[i]);
                }
            }
            nowdayLength = nowdayArr.length;
            $(".cartoonPages span").eq(2).html(nowdayLength);
            if (picId >= nowdayLength) {
                //if条件内day<=的数值需要做修改根据漫画的天数修改
                if (chapter_look >= Math.ceil(day/3)) {

                } else {
                    chapter_look++;
                    var dayArr = [];
                    for (var k = 0; k < dataint.length; k++) {
                        if (dataint[k].day == chapter_look) {
                            dayArr.push(dataint[k]);
                        }
                    }
                    dayLength = dayArr.length;
                    $(".cartoonPages span").eq(2).html(dayLength);
                    picId = 1;
                    for (var j = 0; j < dataint.length; j++) {
                        if (dataint[j].day == chapter_look && dataint[j].id == picId) {
                            $(".cartoonbox>img").attr("src", dataint[j].src);
                            $(".cartoonbox>img").attr("name", dataint[j].id);
                            $(".cartoonPages span").eq(0).html(dataint[j].id);
                        }
                    }
                }
            } else {
                picId++;
                for (var i = 0; i < dataint.length; i++) {
                    if (dataint[i].day == chapter_look && dataint[i].id == picId) {
                        $(".cartoonbox>img").attr("src", dataint[i].src);
                        $(".cartoonbox>img").attr("name", dataint[i].id);
                        $(".cartoonPages span").eq(0).html(dataint[i].id);
                    }
                }
            }
        },
        cartoonList: function() {
            $("#popup1").remove();
            $(".popcover").after('<div id="popup1"></div>');
            var popup = document.getElementById("popup1");
            //添加目录页面下的取消按钮
            var cancelbtncartoon = document.createElement("img");
            cancelbtncartoon.className = "cancelbtncartoon";
            cancelbtncartoon.src = "images/cancelbtn.png";
            cancelbtncartoon.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtncartoon);
            //添加目录页面的主体
            var cartoonItem = document.createElement("div");
            cartoonItem.className = "cartoonItembox";
            popup.appendChild(cartoonItem);
            /*
            var showBg=document.createElement("img");
            showBg.className="cartoonItembox_bg";
            showBg.src="images/cartoonItem.png";
            cartoonItem.appendChild(showBg);
            */
            var showImg1 = document.createElement("img");
            //showImg1.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg1.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg1);
            var showImg2 = document.createElement("img");
            //showImg2.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg2.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg2);
            var showImg3 = document.createElement("img");
            //showImg3.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg3.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg3);
            var showImg4 = document.createElement("img");
            //showImg4.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg4.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg4);
            var showImg5 = document.createElement("img");
            //showImg5.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg5.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg5);
            var showImg6 = document.createElement("img");
            //showImg6.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg6.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg6);
            var showImg7 = document.createElement("img");
            //showImg7.setAttribute("onclick", "common.openthisCartoon(this)");
            showImg7.src = "images/showthisPic.png";
            cartoonItem.appendChild(showImg7);
            var itemBtn = document.createElement("div");
            itemBtn.className = "itemBtn";
            cartoonItem.appendChild(itemBtn);
            var listPrev = document.createElement("img");
            listPrev.className = "listPrev";
            listPrev.src = "images/listPrev.png";
            itemBtn.appendChild(listPrev);
            var listNext = document.createElement("img");
            listNext.className = "listNext";
            listNext.src = "images/listNext.png";
            itemBtn.appendChild(listNext);
            for(var q=0;q<Math.ceil(day/3);q++){
                $(".cartoonItembox>img").eq(q).attr("onclick","common.openthisCartoon(this)");
            };
            if (wHeight <= 800&&wHeight>=700) {
                $(".cartoonbox").css("width", "340px");
                $(".cartoonItembox").css("width", "400px");
                $(".cartoonItembox").css("height", "592px");
                $(".cartoonItembox").css("background-size", "cover");
                $(".cartoonItembox>img").css("margin", "0 0 12px 270px");
                $(".cartoonItembox>img").eq(0).css("margin", "105px 0 14px 270px");
                $(".cartoonItembox>img").eq(6).css("margin-bottom", "6px");
                $(".listPrev").css({"height":"50px","width":"50px"});
                $(".listNext").css({"height":"50px","width":"50px","margin-left":"160px"});
            }
            else if(wHeight<700){
                $(".cartoonbox").css("width", "340px");
                $(".cartoonItembox").css("width", "400px");
                $(".cartoonItembox").css("height", "592px");
                $(".cartoonItembox").css("background-size", "cover");
                $(".cartoonItembox>img").css("margin", "0 0 12px 270px");
                $(".cartoonItembox>img").eq(0).css("margin", "105px 0 14px 270px");
                $(".cartoonItembox>img").eq(6).css("margin-bottom", "6px");
                $(".listPrev").css({"height":"50px","width":"50px"});
                $(".listNext").css({"height":"50px","width":"50px","margin-left":"160px"});
            }
        },
        openthisCartoon: function(obj) {
            $("#popup1").remove();
            $(".popcover").after('<div id="popup1"></div>');
            var popup = document.getElementById("popup1");
            this_index = $(obj).index() + 1;
            chapter_look = this_index + list_page * 7;
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look) {
                    nowdayArr.push(dataint[i]);
                }
            }
            nowdayLength = nowdayArr.length;
            var listiconImg = document.createElement("img");
            listiconImg.className = "cartoonlisticon";
            listiconImg.src = "images/cartoonlisticon.png";
            listiconImg.setAttribute("onclick", "common.cartoonList()");
            popup.appendChild(listiconImg);
            //添加漫画内容
            var cartoonBox = document.createElement("div");
            cartoonBox.className = "cartoonbox";
            popup.appendChild(cartoonBox);
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look && dataint[i].id == 1) {
                    cartoonPic = document.createElement("img");
                    cartoonPic.src = dataint[i].src;
                    cartoonPic.name = dataint[i].id;
                    cartoonBox.appendChild(cartoonPic);
                }
            }
            //添加漫画页面下的取消按钮
            var cancelbtncartoon = document.createElement("img");
            cancelbtncartoon.className = "cancelbtncartoon";
            cancelbtncartoon.src = "images/cancelbtn.png";
            cancelbtncartoon.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtncartoon);
            //添加漫画右下角的翻页按钮
            var cartoonbtnBox = document.createElement("div");
            cartoonbtnBox.className = "cartoonbtnbox";
            popup.appendChild(cartoonbtnBox);
            var imgPrev = document.createElement("img");
            imgPrev.src = "images/cartoonPrev.png";
            imgPrev.setAttribute("onclick", "common.cartoonPrev()");
            cartoonbtnBox.appendChild(imgPrev);
            var cartoonPages = document.createElement("div");
            cartoonPages.className = "cartoonPages";
            cartoonbtnBox.appendChild(cartoonPages);
            var span1 = document.createElement("span");
            span1.innerHTML = "1";
            cartoonPages.appendChild(span1);
            var span2 = document.createElement("span");
            span2.innerHTML = "/";
            cartoonPages.appendChild(span2);
            var span3 = document.createElement("span");
            span3.innerHTML = nowdayLength;
            cartoonPages.appendChild(span3);
            var imgNext = document.createElement("img");
            imgNext.src = "images/cartoonNext.png";
            imgNext.setAttribute("onclick", "common.cartoonNext()");
            cartoonbtnBox.appendChild(imgNext);
            if (wHeight <= 800&&wHeight>=700) {
                $(".cartoonbox").css("width", "380px");
            }
            else if(wHeight<700){
                $(".cartoonbox").css("width", "340px");
            }
        },
        opentodayCartoon: function(obj) {
            $(obj).fadeOut();
            $(".popcover").show();
            $(".popcover").after('<div id="popup1"></div>');
            var popup = document.getElementById("popup1");
            /*
            this_index = $(obj).index() + 1;
            day = this_index + list_page * 7;
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == day) {
                    nowdayArr.push(dataint[i]);
                }
            }
            nowdayLength = nowdayArr.length;
            */
            var todayArr = [];
            var today = chapter_look;
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == today) {
                    todayArr.push(dataint[i]);
                }
            }
            todayLength = todayArr.length;
            var listiconImg = document.createElement("img");
            listiconImg.className = "cartoonlisticon";
            listiconImg.src = "images/cartoonlisticon.png";
            listiconImg.setAttribute("onclick", "common.cartoonList()");
            popup.appendChild(listiconImg);
            //添加漫画内容
            var cartoonBox = document.createElement("div");
            cartoonBox.className = "cartoonbox";
            popup.appendChild(cartoonBox);
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look && dataint[i].id == 1) {
                    cartoonPic = document.createElement("img");
                    cartoonPic.src = dataint[i].src;
                    cartoonPic.name = dataint[i].id;
                    cartoonBox.appendChild(cartoonPic);
                }
            }
            //添加漫画页面下的取消按钮
            var cancelbtncartoon = document.createElement("img");
            cancelbtncartoon.className = "cancelbtncartoon";
            cancelbtncartoon.src = "images/cancelbtn.png";
            cancelbtncartoon.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtncartoon);
            //添加漫画右下角的翻页按钮
            var cartoonbtnBox = document.createElement("div");
            cartoonbtnBox.className = "cartoonbtnbox";
            popup.appendChild(cartoonbtnBox);
            var imgPrev = document.createElement("img");
            imgPrev.src = "images/cartoonPrev.png";
            imgPrev.setAttribute("onclick", "common.cartoonPrev()");
            cartoonbtnBox.appendChild(imgPrev);
            var cartoonPages = document.createElement("div");
            cartoonPages.className = "cartoonPages";
            cartoonbtnBox.appendChild(cartoonPages);
            var span1 = document.createElement("span");
            span1.innerHTML = "1";
            cartoonPages.appendChild(span1);
            var span2 = document.createElement("span");
            span2.innerHTML = "/";
            cartoonPages.appendChild(span2);
            var span3 = document.createElement("span");
            span3.innerHTML = todayLength;
            cartoonPages.appendChild(span3);
            var imgNext = document.createElement("img");
            imgNext.src = "images/cartoonNext.png";
            imgNext.setAttribute("onclick", "common.cartoonNext()");
            cartoonbtnBox.appendChild(imgNext);
            if (wHeight <= 800&&wHeight>=700) {
                $(".cartoonbox").css("width", "380px");
            }
            else if(wHeight<700){
                $(".cartoonbox").css("width", "340px");
            }
        },
        showCartoon: function() {
            $(".popcover").after('<div id="popup1"></div>');
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look) {
                    nowdayArr.push(dataint[i]);
                }
            }
            nowdayLength = nowdayArr.length;
            //添加目录的icon
            var popup = document.getElementById("popup1");
            var listiconImg = document.createElement("img");
            listiconImg.className = "cartoonlisticon";
            listiconImg.src = "images/cartoonlisticon.png";
            listiconImg.setAttribute("onclick", "common.cartoonList()");
            popup.appendChild(listiconImg);
            //添加漫画内容
            var cartoonBox = document.createElement("div");
            cartoonBox.className = "cartoonbox";
            popup.appendChild(cartoonBox);
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look && dataint[i].id == 1) {
                    cartoonPic = document.createElement("img");
                    cartoonPic.src = dataint[i].src;
                    cartoonPic.name = dataint[i].id;
                    cartoonBox.appendChild(cartoonPic);
                }
            }
            //添加漫画页面下的取消按钮
            var cancelbtncartoon = document.createElement("img");
            cancelbtncartoon.className = "cancelbtncartoon";
            cancelbtncartoon.src = "images/cancelbtn.png";
            cancelbtncartoon.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtncartoon);
            //添加漫画右下角的翻页按钮
            var cartoonbtnBox = document.createElement("div");
            cartoonbtnBox.className = "cartoonbtnbox";
            popup.appendChild(cartoonbtnBox);
            var imgPrev = document.createElement("img");
            imgPrev.src = "images/cartoonPrev.png";
            imgPrev.setAttribute("onclick", "common.cartoonPrev()");
            cartoonbtnBox.appendChild(imgPrev);
            var cartoonPages = document.createElement("div");
            cartoonPages.className = "cartoonPages";
            cartoonbtnBox.appendChild(cartoonPages);
            var span1 = document.createElement("span");
            span1.innerHTML = "1";
            cartoonPages.appendChild(span1);
            var span2 = document.createElement("span");
            span2.innerHTML = "/";
            cartoonPages.appendChild(span2);
            var span3 = document.createElement("span");
            span3.innerHTML = nowdayLength;
            cartoonPages.appendChild(span3);
            var imgNext = document.createElement("img");
            imgNext.src = "images/cartoonNext.png";
            imgNext.setAttribute("onclick", "common.cartoonNext()");
            cartoonbtnBox.appendChild(imgNext);
            if (wHeight <= 800&&wHeight>=700) {
                $(".cartoonbox").css("width", "380px");
            }
            else if(wHeight<700){
                $(".cartoonbox").css("width", "340px");
            }
        }
    }
    //员工第一天时点击进入观看
var firstday = {
        showCartoon: function(obj) {
            $("#popup1>img").remove();
            //添加目录的icon
            var popup = document.getElementById("popup1");
            var listiconImg = document.createElement("img");
            listiconImg.className = "cartoonlisticon";
            listiconImg.src = "images/cartoonlisticon.png";
            listiconImg.setAttribute("onclick", "common.cartoonList()");
            popup.appendChild(listiconImg);
            //添加漫画内容
            var cartoonBox = document.createElement("div");
            cartoonBox.className = "cartoonbox";
            popup.appendChild(cartoonBox);
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == 1 && dataint[i].id == 1) {
                    cartoonPic = document.createElement("img");
                    cartoonPic.src = dataint[i].src;
                    cartoonPic.name = dataint[i].id;
                    cartoonBox.appendChild(cartoonPic);
                }
            }
            //添加漫画页面下的取消按钮
            var cancelbtncartoon = document.createElement("img");
            cancelbtncartoon.className = "cancelbtncartoon";
            cancelbtncartoon.src = "images/cancelbtn.png";
            cancelbtncartoon.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtncartoon);
            //添加漫画右下角的翻页按钮
            var cartoonbtnBox = document.createElement("div");
            cartoonbtnBox.className = "cartoonbtnbox";
            popup.appendChild(cartoonbtnBox);
            var imgPrev = document.createElement("img");
            imgPrev.src = "images/cartoonPrev.png";
            imgPrev.setAttribute("onclick", "common.cartoonPrev()");
            cartoonbtnBox.appendChild(imgPrev);
            var cartoonPages = document.createElement("div");
            cartoonPages.className = "cartoonPages";
            cartoonbtnBox.appendChild(cartoonPages);
            var span1 = document.createElement("span");
            span1.innerHTML = "1";
            cartoonPages.appendChild(span1);
            var span2 = document.createElement("span");
            span2.innerHTML = "/";
            cartoonPages.appendChild(span2);
            var span3 = document.createElement("span");
            span3.innerHTML = "3";
            cartoonPages.appendChild(span3);
            var imgNext = document.createElement("img");
            imgNext.src = "images/cartoonNext.png";
            imgNext.setAttribute("onclick", "common.cartoonNext()");
            cartoonbtnBox.appendChild(imgNext);
            if (wHeight <= 800&&wHeight>700) {
                $(".cartoonbox").css("width", "380px");
            }
            else if(wHeight<700){
                $(".cartoonbox").css("width", "340px");
            }
        }
    }
    //数据导入
var dataint = [{ "src": "dataint/1-1.png", "day": "1", "id": "1" }, { "src": "dataint/1-2.png", "day": "1", "id": "2" }, { "src": "dataint/1-3.png", "day": "1", "id": "3" }, { "src": "dataint/2-1.jpg", "day": "2", "id": "1" }, { "src": "dataint/2-2.jpg", "day": "2", "id": "2" }, { "src": "dataint/2-3.jpg", "day": "2", "id": "3" }, { "src": "dataint/3-1.jpg", "day": "3", "id": "1" }, { "src": "dataint/3-2.jpg", "day": "3", "id": "2" }, { "src": "dataint/3-3.jpg", "day": "3", "id": "3" }, { "src": "dataint/4-1.jpg", "day": "4", "id": "1" }, { "src": "dataint/4-2.jpg", "day": "4", "id": "2" }, { "src": "dataint/4-3.jpg", "day": "4", "id": "3" }, { "src": "dataint/4-4.jpg", "day": "4", "id": "4" }, { "src": "dataint/5-1.jpg", "day": "5", "id": "1" }, { "src": "dataint/5-2.jpg", "day": "5", "id": "2" }, { "src": "dataint/5-3.jpg", "day": "5", "id": "3" }, { "src": "dataint/6-1.jpg", "day": "6", "id": "1" }, { "src": "dataint/6-2.jpg", "day": "6", "id": "2" }, { "src": "dataint/6-3.jpg", "day": "6", "id": "3" }, { "src": "dataint/7-1.jpg", "day": "7", "id": "1" }, { "src": "dataint/7-2.jpg", "day": "7", "id": "2" }, { "src": "dataint/7-3.jpg", "day": "7", "id": "3" }]
