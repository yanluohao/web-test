function getPosTop(i, j) {
    return (i + 1) * 16 + i * 80;
}

function getPosLeft(i, j) {
    return (j + 1) * 16 + j * 80;
}

function getNumberBackground(num) {
    switch (num) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return "black";
}

function getNumberColor(num) {
    if (num <= 4) {
        return "#776e65";
    } else {
        return "white";
    }
}

function nospace(board) {
    var zeroArray = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                zeroArray.push(i);
            }
        }
    }
    if (zeroArray.length == 0) {
        return true;
    } else {
        return false;
    }
}


function showNumberWithAnimation(i, j, randNumber) {
    var theNumberbox = $("#number_box_" + i + "_" + j);
    theNumberbox.css('background', getNumberBackground(randNumber));
    theNumberbox.css('color', getNumberColor(randNumber));
    theNumberbox.text(randNumber);
    theNumberbox.animate({
        width: "80px",
        height: "80px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 100)
}

function canmoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canmoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canmoveTop(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                if (board[j - 1][i] == 0 || board[j - 1][i] == board[j][i]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canmoveBottom(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[j][i] != 0) {
                if (board[j + 1][i] == 0 || board[j][i] == board[j + 1][i]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function nomove() {
    if (canmoveBottom(board) || canmoveTop(board) || canmoveRight(board) || canmoveLeft(board)) {
        return false;
    }
    return true;
}

function has_wayInCol(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[col][i] != 0)
            return false;
    return true;
}

function has_wayInRow(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[i][row] != 0) {
            return false;
        }
    }
    return true;
}

function numberMoveAnimation(startX, startY, endX, endY) {
    var theNumberbox = $("#number_box_" + startX + "_" + startY);
    theNumberbox.animate({
        top: getPosTop(endX, endY),
        left: getPosLeft(endX, endY)
    }, 100);
}
