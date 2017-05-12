// 写这个的主要原因是在开发过程中出现了4.35*200=869.999999999的问题

//加法
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = Number(arg1.toString().split(".")[1].length);
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = Number(arg2.toString().split(".")[1].length);
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

//减法
function accSub(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = Number(arg1.toString().split(".")[1].length);
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = Number(arg2.toString().split(".")[1].length);
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // n = (r1 >= r2) ? r1 : r2;
    return Number((arg1 * m - arg2 * m) / m);
    // Number(((arg1 * m - arg2 * m) / m).toFixed(n))  //控制精确长度
}

//乘法
function accMul(arg1, arg2) {
    var m = 0;
    var str1 = arg1.toString();
    var str2 = arg2.toString();
    try {
        m += str1.split(".")[1].length;
    } catch (e) {

    }
    try {
        m += str2.split(".")[1].length;
    } catch (e) {

    }
    return Number(str1.replace(".", "")) * Number(str2.replace(".", "")) / Math.pow(10, m);
}

//除法
function accDiv(arg1, arg2) {
    var t1=0;
    var t2=0;
    var str1 = arg1.toString();
    var str2 = arg2.toString();
    try {
        t1 = str1.split(".")[1].length;
    } catch (e) {

    }
    try {
        t2 = str2.split(".")[1].length;
    } catch (e) {

    }
    str1 = Number(str1.replace(".", ""));
    str2 = Number(str2.replace(".", ""));
    return (str1/str2)*Math.pow(10,(t2-t1));
}
