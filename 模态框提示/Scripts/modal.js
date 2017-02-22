(function($) {
    $.fn.confirmModal = function(options) {
        var defaults = {
            info: "默认值",
            confirm: function() {
                confirmModal.cancel()
            }
        }
        $(this).on("click", function() {
            console.log($(this).length);
            if (!options) {
                var info = defaults.info;
                var confirm = defaults.confirm;
            } else {
                if (!options.info) {
                    var info = defaults.info;
                } else {
                    var info = options.info;
                }
                if (!options.confirm) {
                    var confirm = defaults.confirm;
                } else {
                    var confirm = options.confirm;
                }
            }
            confirmModal.cover();
            confirmModal.confirmModalContent(info);
            $("body").on("click", ".confirmModal-sure", function() {
                confirm();
                confirmModal.cancel();
            })
        })
    }
    $.fn.tipModal = function(options) {
        var defaults = {
            info: "初始化"
        }
        $(this).on("click", function() {
            if (!options) {
                var info = defaults.info;
            }
            else{
            	var info =options.info;
            }
            tipModal.cover();
            tipModal.tipContent(info);
        })
    }
})(jQuery)



var confirmModal = {
    //加载遮罩层
    cover: function() {
        var content = '<div class="popcover"></div>';
        $("body").append(content);
    },
    confirmModalContent: function(info) {
        var content = '<div class="modal-confirmModal"><div class="confirmModal-head"><span>X</span></div>';
        content += '<div class="confirmModal-content">' + info + '</div>';
        content += '<div class="confirmModal-foot clearfix"><div class="confirmModal-btns"><div class="confirmModal-sure">确定</div><div class="confirmModal-cancel">取消</div></div></div></div>';
        $("body").append(content);
        $("body").on("click", ".confirmModal-head span", function() {
            confirmModal.cancel();
        })
        $("body").on("click", ".confirmModal-cancel", function() {
            confirmModal.cancel();
        })
    },
    cancel: function() {
    	$("body").off("click",".confirmModal-head span");
    	$("body").off("click",".confirmModal-cancel");
        $("body").off("click", ".confirmModal-sure");
        $(".popcover").remove();
        $(".modal-confirmModal").remove();
    }
}

var tipModal = {
    //加载遮罩层
    cover: function() {
        var content = '<div class="popcover"></div>';
        $("body").append(content);
    },
    tipContent: function(info) {
        var content = '<div class="modal-tipModal"><div class="tipModal-head"><span>X</span></div>';
        content += '<div class="tipModal-content">' + info + '</div>';
        content += '<div class="tipModal-foot clearfix"><div class="tipModal-btns"><div class="tipModal-sure">确定</div></div></div></div>';
        $("body").append(content);
        $("body").on("click", ".tipModal-head span", function() {
            tipModal.cancel();
        })
        $("body").on("click", ".tipModal-sure", function() {
            tipModal.cancel();
        })
    },
    cancel: function() {
    	$("body").off("click",".tipModal-head span");
    	$("body").off("click",".tipModal-sure");
        $(".popcover").remove();
        $(".modal-tipModal").remove();
    }
}
