$(function() {
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
                if (getnewHours == 9 && getnewMinutes == 16 && getnewSeconds == 1) {
                    localStorage.popup_counts = "0";
                }
            }
            timer = setInterval(getNewTime, 1000);
        }
        if_newDay();
        if (!watchAll) {
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
                    if (wHeight <= 800 && wHeight >= 700) {
                        $(".newbiepic").css("width", "550px");
                    } else if (wHeight < 700) {
                        $(".newbiepic").css("width", "480px");
                    }
                    document.body.style.overflow='hidden';
                    document.body.style.height='100%';
                    document.documentElement.style.overflow='hidden';
                } else {
                    $(".popcover").hide();
                    $(".cartoonsmpic").fadeIn();
                }
            } else if (day > 1 && day <= 17) {
                //if条件内day<=的数值需要做修改根据漫画的天数修改
                if (localStorage.popup_counts.indexOf("0") != -1) {
                    common.showCartoon();
                    localStorage.popup_counts = localStorage.popup_counts.replace("0", "1");
                    document.body.style.overflow='hidden';
                    document.body.style.height='100%';
                    document.documentElement.style.overflow='hidden';
                } else {
                    $(".popcover").hide();
                    $(".cartoonsmpic").fadeIn();
                }
            }
            //因为漫画资源比较少，用判断来改善用户体验,当漫画资源充足时，条件再次进行修改;
            //if条件内day<=的数值需要做修改根据漫画的天数修改
            else if (day > 17 && day <= 90) {
                if (localStorage.popup_counts.indexOf("0") != -1) {
                    common.cartoonList();
                    localStorage.popup_counts = localStorage.popup_counts.replace("0", "1");
                } else {
                    $(".popcover").hide();
                    $(".cartoonsmpic").fadeIn();
                    $(".cartoonsmpic").attr("onclick", "common.cartoonList(this)");
                }
            } else {
                $(".popcover").hide();
            }
        } else {
            $(".popcover").hide();
            $(".cartoonsmpic").fadeIn();
            $(".cartoonsmpic").attr("onclick", "common.cartoonList(this)");
        }
        //清理本地缓存
        //localStorage.removeItem("popup_counts");
    })
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

var register_day = "2016-09-02";
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
//漫画目前的话数
//每次漫画更新时都需要对该变量进行更新
var cartoonLength = 9;
//计算天数差
var day = Math.floor(datedifference / (1000 * 60 * 60 * 24)) + 1;
//等于true时拥有查看所有的权限;
var watchAll = true;
if (watchAll) {
    chapter_look = cartoonLength;
} else {
    if (day >= 1 && day <= 5) {
        chapter_look = day;
    } else {
        chapter_look = 5 + Math.ceil((day - 5) / 3);
    }
};


var minDay = day;

var list_page = 0;
//弹窗消失，小图显示

var common = {
        cancelPop: function(obj) {
            $(obj).parent("#popup1").remove();
            $(".popcover").hide();
            $(".cartoonsmpic").fadeIn();
            document.body.style.overflow='visible';
            document.documentElement.style.overflow='visible';
        },
        //上一张与下一张
        cartoonPrev: function() {
            var picId = $(".cartoonbox>img").attr("name");
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look) {
                    nowdayArr.push(dataint[i]);
                } else if (dataint[i].day > chapter_look) {
                    break;
                }
            }
            nowdayLength = nowdayArr.length;
            $(".cartoonPages span").eq(2).html(nowdayLength);
            if (picId <= 1) {
                if (chapter_look == 1) {

                } else {
                    chapter_look--;
                    //当图片增多时，该if部分的有关于list_page的数据需要做修改
                    if (chapter_look <= 7) {
                        list_page = 0;
                    } else if (chapter_look > 7 && chapter_look <= 14) {
                        list_page = 1;
                    }
                    var dayArr = [];
                    for (var i = 0; i < dataint.length; i++) {
                        if (dataint[i].day == chapter_look) {
                            dayArr.push(dataint[i]);
                        } else if (dataint[i].day > chapter_look) {
                            break;
                        }
                    }
                    dayLength = dayArr.length;
                    $(".cartoonPages span").eq(2).html(dayLength);
                    picId = dayLength;
                    for (var j = 0; j < dataint.length; j++) {
                        if (dataint[j].day == chapter_look && dataint[j].id == picId) {
                            $(".largePic").css("background", "url(" + dataint[j].src + ")");
                            $(".cartoonbox>img").remove();
                            cartoonPic = document.createElement("img");
                            cartoonPic.src = dataint[j].src;
                            cartoonPic.name = dataint[j].id;
                            $(".cartoonbox").append(cartoonPic);
                            $(".cartoonPages span").eq(0).html(dataint[j].id);
                            break;
                        }
                    }
                }
            } else {
                picId--;
                for (var i = 0; i < dataint.length; i++) {
                    if (dataint[i].day == chapter_look && dataint[i].id == picId) {
                        $(".largePic").css("background", "url(" + dataint[i].src + ")");
                        $(".cartoonbox>img").remove();
                        cartoonPic = document.createElement("img");
                        cartoonPic.src = dataint[i].src;
                        cartoonPic.name = dataint[i].id;
                        $(".cartoonbox").append(cartoonPic);
                        $(".cartoonPages span").eq(0).html(dataint[i].id);
                        break;
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
                } else if (dataint[i].day > chapter_look) {
                    break;
                }
            }
            //preloadimages(nowdayArr);
            nowdayLength = nowdayArr.length;
            $(".cartoonPages span").eq(2).html(nowdayLength);

            function nextdayCartoon() {
                var dayArr = [];
                for (var k = 0; k < dataint.length; k++) {
                    if (dataint[k].day == chapter_look) {
                        dayArr.push(dataint[k]);
                    } else if (dataint[k].day > chapter_look) {
                        break;
                    }
                }
                dayLength = dayArr.length;
                $(".cartoonPages span").eq(2).html(dayLength);
                picId = 1;
                for (var j = 0; j < dataint.length; j++) {
                    if (dataint[j].day == chapter_look && dataint[j].id == picId) {
                        $(".largePic").css("background", "url(" + dataint[j].src + ")");
                        $(".cartoonbox>img").remove();
                        cartoonPic = document.createElement("img");
                        cartoonPic.src = dataint[j].src;
                        cartoonPic.name = dataint[j].id;
                        $(".cartoonbox").append(cartoonPic);
                        $(".cartoonPages span").eq(0).html(dataint[j].id);
                        break;
                    }
                }
            }
            if (picId >= nowdayLength) {
                //if条件内day<=的数值需要做修改根据漫画的天数修改
                if (!watchAll) {
                    //if (chapter_look >= Math.ceil(day / 3))根据需求做出的修改
                    if (day >= 1 && day <= 5) {
                        if (chapter_look >= day) {

                        } else {
                            chapter_look++;
                            list_page = 0;
                            nextdayCartoon();
                        }
                    } else if (day > 5) {
                        if (5 + Math.ceil((day - 5) / 3) <= 7) {
                            if (chapter_look >= 5 + Math.ceil((day - 5) / 3)) {

                            } else {
                                chapter_look++;
                                list_page = 0;
                                nextdayCartoon();
                            }
                        } else if (5 + Math.ceil((day - 5) / 3) > 7 && 5 + Math.ceil((day - 5) / 3) <= 9) {
                            //当用户的注册天数处于该范围时，后续需要做修改。
                            //临时因为资源不够做的调整，后续需要做修改
                            if (chapter_look >= 5 + Math.ceil((day - 5) / 3)) {

                            } else {
                                //图片资源充足时list_page需要做修改
                                if (chapter_look > 7 && chapter_look < 5 + Math.ceil((day - 5) / 3)) {
                                    chapter_look++;
                                    list_page = 1;
                                    nextdayCartoon();
                                } else if (chapter_look <= 7) {
                                    chapter_look++;
                                    list_page = 0;
                                    nextdayCartoon();
                                }
                            }
                        } else {
                            //当用户注册天数超过上述范围时。
                            if (chapter_look >= 5 + Math.ceil((day - 5) / 3)) {

                            } else {
                                //图片资源充足时list_page需要做修改
                                if (chapter_look > 7 && chapter_look < 9) {

                                    chapter_look++;
                                    list_page = 1;
                                    nextdayCartoon();
                                } else if (chapter_look <= 7) {
                                    chapter_look++;
                                    list_page = 0;
                                    nextdayCartoon();
                                }
                            }
                        }
                    }
                } else {
                    if (chapter_look >= cartoonLength) {

                    } else {
                        chapter_look++;
                        if (chapter_look <= 7) {
                            list_page = 0;
                        } else if (chapter_look > 7 && chapter_look <= 9) {
                            list_page = 1;
                        }
                        nextdayCartoon();
                    }
                }

            } else {
                picId++;
                for (var i = 0; i < dataint.length; i++) {
                    if (dataint[i].day == chapter_look && dataint[i].id == picId) {
                        $(".largePic").css("background", "url(" + dataint[i].src + ")");
                        $(".cartoonbox>img").remove();
                        cartoonPic = document.createElement("img");
                        cartoonPic.src = dataint[i].src;
                        cartoonPic.name = dataint[i].id;
                        $(".cartoonbox").append(cartoonPic);
                        //$(".cartoonbox>img").attr({ "src": dataint[i].src, "name": dataint[i].id });
                        $(".cartoonPages span").eq(0).html(dataint[i].id);
                        break;
                    }
                }
            }
        },
        cartoonList: function(obj) {
            document.body.style.overflow='hidden';
            document.body.style.height='100%';
            document.documentElement.style.overflow='hidden';
            $(obj).fadeOut();
            $("#popup1").remove();
            $(".popcover").show();
            $(".popcover").after('<div id="popup1"></div>');
            var popup = document.getElementById("popup1");
            //添加目录页面下的取消按钮
            var cancelbtncartoon = document.createElement("img");
            cancelbtncartoon.className = "cancelbtncartoon";
            cancelbtncartoon.src = "images/cancelbtn.png";
            cancelbtncartoon.setAttribute("onclick", "common.cancelPop(this)");
            popup.appendChild(cancelbtncartoon);

            function addListBody() {
                popup.appendChild(cartoonItem);
                var showImg1 = document.createElement("img");
                showImg1.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg1);
                var showImg2 = document.createElement("img");
                showImg2.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg2);
                var showImg3 = document.createElement("img");
                showImg3.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg3);
                var showImg4 = document.createElement("img");
                showImg4.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg4);
                var showImg5 = document.createElement("img");
                showImg5.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg5);
                var showImg6 = document.createElement("img");
                showImg6.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg6);
                var showImg7 = document.createElement("img");
                showImg7.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg7);
            }
            //添加目录页面的主体
            if (list_page == 0) {
                var cartoonItem = document.createElement("div");
                cartoonItem.className = "cartoonItembox";
                cartoonItem.style.backgroundImage = "url(images/cartoonItem0.png)";
                addListBody();
            } else if (list_page == 1) {
                var cartoonItem = document.createElement("div");
                cartoonItem.className = "cartoonItembox";
                cartoonItem.style.backgroundImage = "url(images/cartoonItem1.png)";
                addListBody();
            } else if (list_page == 2) {
                var cartoonItem = document.createElement("div");
                cartoonItem.className = "cartoonItembox";
                cartoonItem.style.backgroundImage = "url(images/cartoonItem2.png)";
                addListBody();
            } else if (list_page == 3) {
                var cartoonItem = document.createElement("div");
                cartoonItem.className = "cartoonItembox";
                cartoonItem.style.backgroundImage = "url(images/cartoonItem3.png)";
                popup.appendChild(cartoonItem);
                addListBody();
            } else if (list_page == 4) {
                var cartoonItem = document.createElement("div");
                cartoonItem.className = "cartoonItembox";
                cartoonItem.style.backgroundImage = "url(images/cartoonItem4.png)";
                popup.appendChild(cartoonItem);
                var showImg1 = document.createElement("img");
                showImg1.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg1);
                var showImg2 = document.createElement("img");
                showImg2.src = "images/notshowthis.png";
                cartoonItem.appendChild(showImg2);
                var showImg3 = document.createElement("img");
                showImg3.src = "images/notshowthis.png";
            }
            var itemBtn = document.createElement("div");
            itemBtn.className = "itemBtn";
            cartoonItem.appendChild(itemBtn);
            var listPrev = document.createElement("img");
            listPrev.setAttribute("onclick", "common.cartoonListPagePrev()");
            listPrev.className = "listPrev";
            listPrev.src = "images/listPrev.png";
            itemBtn.appendChild(listPrev);
            var listNext = document.createElement("img");
            listNext.setAttribute("onclick", "common.cartoonListPageNext()");
            listNext.className = "listNext";
            listNext.src = "images/listNext.png";
            itemBtn.appendChild(listNext);

            var cartoonItemImg=$(".cartoonItembox>img");
            if (!watchAll) {
                if (day >= 1 && day <= 5) {
                    for (var q = 0; q < day; q++) {
                        cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                    }
                } else if (day > 5) {
                    if (5 + Math.ceil((day - 5) / 3) <= 7) {
                        for (var q = 0; q < 5 + Math.ceil((day - 5) / 3); q++) {
                            cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                        }
                    }
                    //暂时因为漫画资源不够的临时做法，后期有资源时需要进行修改。
                    else if (5 + Math.ceil((day - 5) / 3) > 7) {
                        if (5 + Math.ceil((day - 5) / 3) <= 9) {
                            if (list_page == 0) {
                                for (var q = 0; q < 7; q++) {
                                    cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                                }
                            } else {
                                for (var q = 0; q < 5 + Math.ceil((day - 5) / 3) - 7; q++) {
                                    cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                                }
                            }
                        } else { //该部分属于超过该指定日期但是仍是新人用户
                            if (list_page == 0) {
                                for (var q = 0; q < 7; q++) {
                                    cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                                }
                            } else {
                                for (var q = 0; q < 2; q++) {
                                    cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                                }
                            }
                        }
                    }
                }

            } else {
                if (list_page == 0) {
                    for (var q = 0; q < 7; q++) {
                        cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                    }
                } else {
                    for (var q = 0; q < 2; q++) {
                        cartoonItemImg.eq(q).attr({ "onclick": "common.openthisCartoon(this)", "src": "images/showthisPic.png" });
                    }
                }
            }
            if (wHeight <= 800 && wHeight >= 700) {
                $(".cartoonbox").css("width", "340px");
                $(".cartoonItembox").css({ "width": "400px", "height": "592px", "background-size": "cover" });
                cartoonItemImg.css("margin", "0 0 12px 270px");
                cartoonItemImg.eq(0).css("margin", "105px 0 14px 270px");
                cartoonItemImg.eq(6).css("margin-bottom", "6px");
                $(".listPrev").css({ "height": "50px", "width": "50px" });
                $(".listNext").css({ "height": "50px", "width": "50px", "margin-left": "160px" });
            } else if (wHeight < 700) {
                $(".cartoonbox").css("width", "340px");
                $(".cartoonItembox").css({ "width": "400px", "height": "592px", "background-size": "cover" });
                cartoonItemImg.css("margin", "0 0 12px 270px");
                cartoonItemImg.eq(0).css("margin", "105px 0 14px 270px");
                cartoonItemImg.eq(6).css("margin-bottom", "6px");
                $(".listPrev").css({ "height": "50px", "width": "50px" });
                $(".listNext").css({ "height": "50px", "width": "50px", "margin-left": "160px" });
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
                } else if (dataint[i].day > chapter_look) {
                    break;
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
                    largePic = document.createElement("div");
                    largePic.className = "largePic";
                    largePic.style.backgroundImage = "url(" + dataint[i].src + ")";
                    cartoonBox.appendChild(largePic);
                    break;
                }
            }
            magnify();
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
            if (wHeight <= 800 && wHeight >= 700) {
                $(".cartoonbox").css("width", "380px");
            } else if (wHeight < 700) {
                $(".cartoonbox").css("width", "340px");
            }
        },
        opentodayCartoon: function(obj) {
            //后续需要做修改
            if (chapter_look > 7) {
                list_page = 1;
            } else {
                list_page = 0;
            }
            $(obj).fadeOut();
            $(".popcover").show();
            $(".popcover").after('<div id="popup1"></div>');
            var popup = document.getElementById("popup1");
            var todayArr = [];
            var today = chapter_look;
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == today) {
                    todayArr.push(dataint[i]);
                } else if (dataint[i].day > chapter_look) {
                    break;
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
                    largePic = document.createElement("div");
                    largePic.className = "largePic";
                    largePic.style.backgroundImage = "url(" + dataint[i].src + ")";
                    cartoonBox.appendChild(largePic);
                    break;
                }
            }
            magnify();
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
            if (wHeight <= 800 && wHeight >= 700) {
                $(".cartoonbox").css("width", "380px");
            } else if (wHeight < 700) {
                $(".cartoonbox").css("width", "340px");
            }
        },
        showCartoon: function() {
            //if条件在图片资源更新时做修改;
            if (chapter_look > 7) {
                list_page = 1;
            } else {
                list_page = 0;
            }
            $(".popcover").after('<div id="popup1"></div>');
            var nowdayArr = [];
            for (var i = 0; i < dataint.length; i++) {
                if (dataint[i].day == chapter_look) {
                    nowdayArr.push(dataint[i]);
                } else if (dataint[i].day > chapter_look) {
                    break;
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
                    largePic = document.createElement("div");
                    largePic.className = "largePic";
                    largePic.style.backgroundImage = "url(" + dataint[i].src + ")";
                    cartoonBox.appendChild(largePic);
                    break;
                }
            }
            magnify();
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
            if (wHeight <= 800 && wHeight >= 700) {
                $(".cartoonbox").css("width", "380px");
            } else if (wHeight < 700) {
                $(".cartoonbox").css("width", "340px");
            }
        },
        cartoonListPagePrev: function() {
            if(day>11||watchAll){
                if (list_page == 0) {

                } else {
                    list_page--;
                    $(".cartoonItembox").css("background-image", "url(images/cartoonItem" + list_page + ".png)");
                    common.cartoonList();
                }
            }
        },
        cartoonListPageNext: function() {
            if(day>11||watchAll){
                //if条件需要做修改
                if (list_page == 1) {

                } else {
                    list_page++;
                    $(".cartoonItembox").css("background-image", "url(images/cartoonItem" + list_page + ".png)");
                    common.cartoonList();
                }
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
                    largePic = document.createElement("div");
                    largePic.className = "largePic";
                    largePic.style.backgroundImage = "url(" + dataint[i].src + ")";
                    cartoonBox.appendChild(largePic);
                    break;
                }
            }
            magnify();
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
            if (wHeight <= 800 && wHeight > 700) {
                $(".cartoonbox").css("width", "380px");
            } else if (wHeight < 700) {
                $(".cartoonbox").css("width", "340px");
            }
        }
    }
    //数据导入
var dataint = [{ "src": "dataint/1-1.png", "day": "1", "id": "1" }, { "src": "dataint/1-2.png", "day": "1", "id": "2" }, { "src": "dataint/1-3.png", "day": "1", "id": "3" }, { "src": "dataint/2-1.jpg", "day": "2", "id": "1" }, { "src": "dataint/2-2.jpg", "day": "2", "id": "2" }, { "src": "dataint/2-3.jpg", "day": "2", "id": "3" }, { "src": "dataint/3-1.jpg", "day": "3", "id": "1" }, { "src": "dataint/3-2.jpg", "day": "3", "id": "2" }, { "src": "dataint/3-3.jpg", "day": "3", "id": "3" }, { "src": "dataint/4-1.jpg", "day": "4", "id": "1" }, { "src": "dataint/4-2.jpg", "day": "4", "id": "2" }, { "src": "dataint/4-3.jpg", "day": "4", "id": "3" }, { "src": "dataint/4-4.jpg", "day": "4", "id": "4" }, { "src": "dataint/5-1.jpg", "day": "5", "id": "1" }, { "src": "dataint/5-2.jpg", "day": "5", "id": "2" }, { "src": "dataint/5-3.jpg", "day": "5", "id": "3" }, { "src": "dataint/6-1.jpg", "day": "6", "id": "1" }, { "src": "dataint/6-2.jpg", "day": "6", "id": "2" }, { "src": "dataint/6-3.jpg", "day": "6", "id": "3" }, { "src": "dataint/7-1.jpg", "day": "7", "id": "1" }, { "src": "dataint/7-2.jpg", "day": "7", "id": "2" }, { "src": "dataint/7-3.jpg", "day": "7", "id": "3" },
    { "src": "dataint/8-1.jpg", "day": "8", "id": "1" }, { "src": "dataint/8-2.jpg", "day": "8", "id": "2" }, { "src": "dataint/8-3.jpg", "day": "8", "id": "3" },
    { "src": "dataint/9-1.jpg", "day": "9", "id": "1" }, { "src": "dataint/9-2.jpg", "day": "9", "id": "2" }, { "src": "dataint/9-3.jpg", "day": "9", "id": "3" }
]

function magnify() {
    // 定义图像的实际尺寸、
    var native_width = 0;
    var native_height = 0;
    // 首先、我们应该获得图像的实际尺寸、（本地的图片）
    $('.cartoonbox>img').load(function() {
            // 这里我们需要重新创建一个和之前相同的图像对象、
            // 因为我们不能直接获得图像尺寸的宽高、
            // 因为我们在HTML里已经指定了图片宽度为200px、
            var img_obj = new Image();
            img_obj.src = $(this).attr('src');

            //  在这里这段代码写在这里是非常有必要的、
            //  如果在图像加载之前就访问的话、return的宽高值为0、
            native_width = img_obj.width;
            native_height = img_obj.height;

            // 现在、我来开始写鼠标移动的函数、mousemove()
            $('.cartoonbox').mousemove(function(e) {
                // 获得鼠标X轴和Y轴的坐标
                //  先获得magnify相对与document的定位position
                var magnify_offset = $(this).offset();

                // 这里我们用鼠标相对与文档的位置减去鼠标相对于magnify这个人容器的位置 来得到鼠标的位置
                var mouse_x = e.pageX - magnify_offset.left;
                var mouse_y = e.pageY - magnify_offset.top;


                // 现在、我们来调整一下放大镜的隐藏与显示、
                if (mouse_x > 0 && mouse_y > 0 && mouse_x < $(this).width() && mouse_y < $(this).height()) {
                    $('.largePic').fadeIn(100);
                } else {
                    $('.largePic').fadeOut(100);
                }
                if ($('.largePic').is(':visible')) {
                    // 放大镜图片背景的定位是根据鼠标在小图片上改变的位置来改变的、
                    // 因此、我们应该先得到放大的比例、来定位这个放大镜里背景图片的定位、

                    /*
                    var ratio_x = mouse_x/$('.small').width();//得到的是缩放的比例       
                    var large_x = ratio_x*native_width;
                    // 我们需要让它在放大镜的中间位置显示、
                    large_x = large_x - $('.large').width()/2;
                    // 因为背景图片的定位、这里需要转化为负值、
                    large_x = large_x*-1;
                    // 现在我们来整合一下所有的计算步骤、
                    */
                    var rx = Math.round(mouse_x / $('.cartoonbox>img').width() * native_width - $('.largePic').width() / 2) * -1;
                    var ry = Math.round(mouse_y / $('.cartoonbox>img').height() * native_height - $('.largePic').height() / 2) * -1;
                    var bgp = rx + 'px ' + ry + 'px';

                    // 现在我们应该来写放大镜跟随鼠标的效果、
                    // 放大镜移动的位置 相对于文档的位置 减去 放大镜相对于放大这个层的offset的位置、
                    // 再减去放大镜宽高的一半、保证放大镜的中心跟随鼠标

                    var gx = mouse_x - $('.largePic').width() / 2;
                    var gy = mouse_y - $('.largePic').height() / 2;

                    $('.largePic').css({
                        'left': gx,
                        'top': gy,
                        'backgroundPosition': bgp
                    })
                }
            })
        })
        // 最后、我们来把这个mousemove()这个函数来放在这个load这个函数里
}
