(function($) {
    var defaults = {
        length: 1
    }
    $.fn.industryChoosen = function(options) {
        $(this).on("click", function() {
            if (!options) {
                maxChoosenLength = defaults.length;
            } else if (options.length) {
                maxChoosenLength = options.length;
            } else {
                alert("请输入正确的参数");
                return false;
            }
            var multipleIndustryClickIndex = $(this).index(".multipleIndustryClick");
            multipleIndustryIndex = multipleIndustryClickIndex;
            industryGetPopupBody();
            industryGetAllInformation();
            if ($(".multipleIndustryClick").eq(multipleIndustryClickIndex).val().trim() == "") {

            } else {
                var industryVal = $(".multipleIndustryClick").eq(multipleIndustryClickIndex).val();
                industryValArr = industryVal.split(",");
                for (var i = 0; i < $(".nameModule span").length; i++) {
                    for (var j = 0; j < industryValArr.length; j++) {
                        if ($(".nameModule span").eq(i).html() == industryValArr[j]) {
                            $(".nameModule span").eq(i).addClass("active");
                        }
                    }
                }
            }
        })
    }
})(jQuery)

//变量控制能选择的数量多少,让其的值能在外部控制
// var maxChoosenLength=3;

function industryNameModuleClick(obj, maxChoosenLength) {
    if ($(".nameModule span.active").length < maxChoosenLength) {
        if ($(obj).hasClass("active")) {
            $(obj).removeClass("active");
        } else {
            $(obj).addClass("active");
        }
    } else if ($(".nameModule span.active").length = maxChoosenLength) {
        if ($(obj).hasClass("active")) {
            $(obj).removeClass("active");
        }
    }
}

//点击取消和x绑定的事件
function industryCancelProfession() {
    $(".popupCover").remove();
    $("#popupMultipleSelect").remove();
    $(".multipleIndustryClick").fadeIn();
}

//json数据传入

function industryGetIndustry() {
    var content = "";
    for (var i = 0; i < industryajson.length; i++) {
        content += '<div class="professionLine">';
        content += '<span class="professionTitle">' + industryajson[i].Name + '</span></div>';
    }
    $("#popupContent").append(content);
}

function industryGetProfessionName(num) {
    var content = '<div class="nameModule">';
    for (var i = 0; i < industrybjson.length; i++) {
        if (industrybjson[i].ParentId == num) {
            content += '<span onclick="industryNameModuleClick(this,maxChoosenLength)">' + industrybjson[i].Name + '</span>';
        }
    }
    content += '</div>';
    $(".professionLine").eq(num - 1).append(content);
}
//根据数据加载popupContent内容
function industryGetAllInformation() {
    industryGetIndustry();
    for (var i = 1; i < industryajson.length + 1; i++) {
        industryGetProfessionName(i);
    }
}

//弹出框的基本架构
function industryGetPopupBody() {
    var content = "";
    content += '<div class="popupCover"></div><div id="popupMultipleSelect"><div id="popupHeader"><h2>选择行业分类(最多选择' + maxChoosenLength + '个行业)</h2><p onclick="industryCancelProfession()">X</p></div><div id="popupContent"></div><div id="popupButtons"><div id="confirmBtn" onclick="confirmProfession()">确定</div><div id="cancelBtn" onclick="industryCancelProfession()">取消</div></div></div>';
    $(".multipleIndustryClick").eq(multipleIndustryIndex).before(content);
}

//定义一个全局变量
var multipleIndustryIndex;