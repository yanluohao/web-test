var score = 0;

var board = new Array();
$(document).ready(function() {
    newGame();
});

function newGame() {
    //初始化棋盘格
    init();

    //随机生成两个格子
    getNormalOneNumber();
    getNormalOneNumber();
}

function init() {
    //生成一个二维数组
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView();
}

function updateBoardView() {
    $(".number_box").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $(".allContainer").append('<div class="number_box" id="number_box_' + i + '_' + j + '"></div>');
            var theNumberbox = $("#number_box_" + i + "_" + j);

            if (board[i][j] == 0) {
                theNumberbox.css('width', '0px');
                theNumberbox.css('height', '0px');
                theNumberbox.css('top', getPosTop(i, j) + 50);
                theNumberbox.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumberbox.css('width', '80px');
                theNumberbox.css('height', '80px');
                theNumberbox.css('top', getPosTop(i, j));
                theNumberbox.css('left', getPosLeft(i, j));
                theNumberbox.css('background', getNumberBackground(board[i][j]));
                theNumberbox.css('color', getNumberColor(board[i][j]));
                theNumberbox.text(board[i][j]);
            }
        }
    }
}

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var smallbox = $("#smallbox_" + i + "_" + j);
        smallbox.css("top", getPosTop(i, j));
        smallbox.css("left", getPosLeft(i, j));
    }
}

function getNormalOneNumber() {
    if (nospace(board)) {
        return false;
    } else {
        //随机生成一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        while (true) {
            if (board[randx][randy] == 0) {
                break;
            } else {
                randx = parseInt(Math.floor(Math.random() * 4));
                randy = parseInt(Math.floor(Math.random() * 4));
            }
        }

        //随机在格子中生成一个数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;
        board[randx][randy] = randNumber;
        showNumberWithAnimation(randx, randy, randNumber);
        return true;
    }

}



//移动的方法
function moveLeft() {
    if (!canmoveLeft(board)) {
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    var timesStop=5;
                    for (var k = 0; k < j; k++) {
                        if (board[i][k] == 0 && has_wayInCol(i, k, j, board)) {
                            numberMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && has_wayInCol(i, k, j, board)&&timesStop==5||k>timesStop+1) {
                            numberMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            timesStop=k;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 100);
        return true;
    }
}

function moveRight() {
    if (!canmoveRight(board)) {
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j] != 0) {
                    for (var k = 3; k > j; k--) {
                        if (board[i][k] == 0 && has_wayInCol(i, j, k, board)) {
                            numberMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        } else if (board[i][k] == board[i][j] && has_wayInCol(i, j, k, board)) {
                            numberMoveAnimation(i, j, i, k);
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            break;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 100);
        return true;
    }
}

function moveTop() {
    if (!canmoveTop(board)) {
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[j][i] != 0) {
                    for (var k = 0; k < j; k++) {
                        if (board[k][i] == 0 && has_wayInRow(i, k, j, board)) {
                            numberMoveAnimation(j, i, k, i);
                            board[k][i] = board[j][i];
                            board[j][i] = 0;
                            continue;
                        } else if (board[k][i] == board[j][i] && has_wayInRow(i, k, j, board)) {
                            numberMoveAnimation(j, i, k, i);
                            board[k][i] += board[j][i];
                            board[j][i] = 0;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 100);
        return true;
    }
}

function moveBottom() {
    if (!canmoveBottom(board)) {
        return false;
    } else {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (board[j][i] != 0) {
                    for (var k = 3; k > j; k--) {
                        if (board[k][i] == 0 && has_wayInRow(i, j, k, board)) {
                            numberMoveAnimation(j, i, k, i);
                            board[k][i] = board[j][i];
                            board[j][i] = 0;
                            continue;
                        } else if (board[k][i] == board[j][i] && has_wayInRow(i, j, k, board)) {
                            numberMoveAnimation(j, i, k, i);
                            board[k][i] += board[j][i];
                            board[j][i] = 0;
                            break;
                        }
                    }
                }
            }
        }
        setTimeout(updateBoardView, 100);
        return true;
    }
}

function isgameover(){
    if(nomove()&&nospace(board)){
        $(".popup").show();
        // alert("游戏结束了，你可以通过点击New Game来开始新的游戏");
    }
}


function totalScore(board){
    var score=0;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            score+=board[i][j];
        }
    }
    $("#score").html(score);
}


//触摸事件
var hammertime = new Hammer($(".allContainer")[0]); //jquery对象转换成js对象
hammertime.on("swipeleft", function(e) {
    if (moveLeft()) {
        getNormalOneNumber();
        totalScore(board);
    }
    isgameover();
})
hammertime.on("swiperight", function(e) {
    if (moveRight()) {
        getNormalOneNumber();
        totalScore(board);
    }
    isgameover();
})
hammertime.on("swipeup", function(e) {
    if (moveTop()) {
        getNormalOneNumber();
        totalScore(board);
    }
    isgameover();
})
hammertime.on("swipedown", function(e) {
    if (moveBottom()) {
        getNormalOneNumber();
        totalScore(board);
    }
    isgameover();
})

$(document).keydown( function( event ){
    switch( event.keyCode ){
        case 37: //left
            if( moveLeft() ){
                getNormalOneNumber();
                totalScore(board);
                isgameover();
            }
            // else{
            //     isgameover();
            // }
            break;
        case 38: //up
            if( moveTop() ){
                getNormalOneNumber();
                totalScore(board);
                isgameover();
            }
            // else{
            //     isgameover();
            // }
            break;
        case 39: //right
            if( moveRight() ){
                getNormalOneNumber();
                totalScore(board);
                isgameover();
            }
            // else{
            //     isgameover();
            // }
            break;
        case 40: //down
            if( moveBottom() ){
                getNormalOneNumber();
                totalScore(board);
                isgameover();
            }
            // else{
            //     isgameover();
            // }
            break;
        default: //default
            break;
    }
});

function closePop(){
    $(".popup").hide();
}