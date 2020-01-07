
var Game = (function (options) {
    var constructor = function () {
        this.tdim = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        this.init();
    }

    /**
     * init 初始化
     */
    var init = function() {
        var self = this;
        self.getRestItem();
        self.getRestItem();
        self.rendering();
        this.addEvent();
    }

    /**
     * addEvent 事件绑定
     */
    var addEvent = function() {
        var tdim = this.tdim;
        var self = this;
        var newGame = document.getElementsByClassName('btn')[0];
        newGame.onclick = this.onNewGame.bind(this);
        document.body.onkeydown = function (event) {
            if (event.keyCode == 39)   //向右code为39
            {
                self.onKeyRight();
            }

            if (event.keyCode == 37)   //向右code为39
            {
                self.onKeyLeft();
            }

            if (event.keyCode == 38)   //向右code为39
            {
                self.onKeyUp();
            }

            if (event.keyCode == 40)   //向右code为39
            {
                self.onKeyDown();
            }
        }

    }

    var onNewGame = function () {
        var tdim = this.tdim;
        var gameover = document.getElementsByClassName('gameover')[0];
        gameover.style.display = "none";
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                tdim[i][j] = 0;
            }
        }
        this.countScore();
        this.getRestItem();
        this.getRestItem();
        this.rendering();
    }

    /**
     * onKeyRight 点击向右键响应事件
     */
    var onKeyRight = function() {
        var tdim = this.tdim;
        var self = this;
        var tdimf = self.clone(tdim);
        for (var i = 0; i < 4; i++) {
            var pos = 3;
            for (var j = 3; j >= 0; j--) {
                if (tdim[i][j] != 0) {
                    if (pos > j) {
                        tdim[i][pos--] = tdim[i][j];
                        tdim[i][j] = 0;
                    } else {
                        tdim[i][pos--] = tdim[i][j];
                    }
                }
            }

            for (j = 3; j >= 1; j--) {
                if (tdim[i][j] == tdim[i][j - 1] && tdim[i][j] > 0 && tdim[i][j - 1] > 0) {
                    tdim[i][j] = tdim[i][j] + tdim[i][j - 1];
                    tdim[i][j - 1] = 0;
                }
            }

        }
        self.rendering();
        self.getRestItem(tdimf);
        self.countScore();
        setTimeout(function () {
            self.rendering();
        }, 500)

    }

    /**
     * onKeyLeft 按下向左键响应事件
     */
    var onKeyLeft = function() {
        var tdim = this.tdim;
        var self = this;
        var tdimf = self.clone(tdim);
        for (var i = 0; i < 4; i++) {
            var pos = 0;
            for (var j = 0; j < 4; j++) {
                if (tdim[i][j] != 0) {
                    if (pos < j) {
                        tdim[i][pos++] = tdim[i][j];
                        tdim[i][j] = 0;
                    } else {
                        tdim[i][pos++] = tdim[i][j];
                    }
                }
            }

            for (j = 0; j < 3; j++) {
                if (tdim[i][j] == tdim[i][j + 1] && tdim[i][j] > 0 && tdim[i][j + 1] > 0) {
                    tdim[i][j] = tdim[i][j] + tdim[i][j + 1];
                    tdim[i][j + 1] = 0;
                }
            }

        }
        self.rendering();
        self.getRestItem(tdimf);
        self.countScore();
        setTimeout(function () {
            self.rendering();
        }, 500)

    }

    /**
     * onKeyUp 按下向下键响应事件
     */
    var onKeyUp = function() {
        var tdim = this.tdim;
        var self = this;
        var tdimf = self.clone(tdim);
        for (var j = 0; j < 4; j++) {
            var pos = 0;
            for (var i = 0; i < 4; i++) {
                if (tdim[i][j] != 0) {
                    if (pos < i) {
                        tdim[pos++][j] = tdim[i][j];
                        tdim[i][j] = 0;
                    } else {
                        tdim[pos++][j] = tdim[i][j];
                    }
                }
            }

            for (i = 0; i < 3; i++) {
                if (tdim[i][j] == tdim[i + 1][j] && tdim[i][j] > 0 && tdim[i + 1][j] > 0) {
                    tdim[i][j] = tdim[i][j] + tdim[i + 1][j];
                    tdim[i + 1][j] = 0;
                }
            }

        }
        self.rendering();
        self.getRestItem(tdimf);
        self.countScore();
        setTimeout(function () {
            self.rendering();
        }, 500)

    }

    /**
     * onKeyDown 按下向下键响应事件
     */
    var onKeyDown = function() {
        var tdim = this.tdim;
        var self = this;
        var tdimf = self.clone(tdim);
        for (var j = 0; j < 4; j++) {
            var pos = 3;
            for (var i = 3; i >= 0; i--) {
                if (tdim[i][j] != 0) {
                    if (pos > i) {
                        tdim[pos--][j] = tdim[i][j];
                        tdim[i][j] = 0;
                    } else {
                        tdim[pos--][j] = tdim[i][j];
                    }
                }
            }
            for (i = 3; i >= 1; i--) {
                if (tdim[i][j] == tdim[i - 1][j]) {
                    tdim[i][j] = tdim[i][j] + tdim[i - 1][j];
                    tdim[i - 1][j] = 0;
                }
            }

        }
        self.rendering();
        self.getRestItem(tdimf);
        self.countScore();
        setTimeout(function () {
            self.rendering();
        }, 500)

    }

    /**
     * getRestItem 从剩下的空白格子里选择一个并产生新数2或者4
     * @param tdimf
     */
    var getRestItem = function(tdimf) {
        var tdim = this.tdim;
        var self = this;
        var newAry = [];
        var countdif = 0;
        var cnt = 0;
        //获取所有值为0的位置用i,j表示
        for (var i = 0; i < 4; i++) {
            for (j = 3; j >= 0; j--) {
                if (tdim[i][j] == 0) {
                    newAry.push({i: i, j: j});
                }
            }
        }
        //
        if (tdimf) {
            for (var p = 0; p < 4; p++) {
                for (var s = 3; s >= 0; s--) {
                    if (tdim[p][s] == tdimf[p][s]) {
                        cnt++;
                        if (cnt == 16 && newAry.length > 0) {
                            return
                        }
                    }
                }
            }
        }

        //一个数与前后左右都不相等结束
        if (newAry.length <= 0) {

            for (var m = 0; m < 4; m++) {
                for (n = 3; n >= 0; n--) {
                    var compare = [];
                    var count = 0;
                    var cur = tdim[m][n];
                    var ary = [];
                    ary = [{s: m - 1, t: n}, {s: m, t: n - 1}, {s: m + 1, t: n}, {s: m, t: n + 1}];

                    ary.forEach(function (eml) {
                        if ((eml.s >= 0 && eml.s < 4) && (eml.t >= 0 && eml.t < 4)) {
                            compare.push(eml);
                        }
                    })
                    for (var k = 0; k < compare.length; k++) {
                        var curl = compare[k];
                        if (tdim[curl.s][curl.t] != cur) {
                            count++;
                            //如果当前值和前后左右都不相等
                            if (count >= compare.length) {
                                countdif++;
                                if (countdif >= 16) {
                                    var gameover = document.getElementsByClassName('gameover')[0];
                                    gameover.style.display = "block";
                                    self.tryAgain();
                                    return
                                }
                            }

                        } else {
                            return
                        }
                    }
                }
            }
        } else {
            var ranNum = Math.floor(Math.random() * newAry.length);
            var item = newAry[ranNum];
            var tmp = Math.floor(Math.random() * 100);
            if (tmp > 20) {
                tdim[item.i][item.j] = 2;
            }
            else {
                tdim[item.i][item.j] = 4;
            }
            console.log(tdim);
        }
    }

    /**
     * clone 克隆二维数组
     * @param tdim
     * @returns {*[]}
     */
    var clone = function(tdim) {
        var newAry = [[], [], [], []];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                newAry[i][j] = tdim[i][j]
            }
        }
        return newAry
    }

    /**
     * rendering 渲染页面
     */
    var rendering = function () {
        var tdim = this.tdim;
        var row = document.getElementsByClassName("grid-row");
        var cell = document.getElementsByClassName("grid-cell");
        for (var m = 0; m < 4; m++) {
            for (var n = 0; n < 4; n++) {
                var seqnum = m * 4 + n;
                if (tdim[m][n] != 0) {
                    var num = tdim[m][n];
                    switch (num) {
                        case 2:
                            cell[seqnum].style.background = '#EEE4DA';
                            break;
                        case 4:
                            cell[seqnum].style.background = '#ede0c8';
                            break;
                        case 8:
                            cell[seqnum].style.background = '#f2b179';
                            break;
                        case 16:
                            cell[seqnum].style.background = '#f59563';
                            break;
                        case 32:
                            cell[seqnum].style.background = '#f67c5f';
                            break;
                        default:
                            cell[seqnum].style.background = '#f65e3b';
                            break;
                    }
                    cell[seqnum].innerHTML = tdim[m][n];
                }
                else {
                    cell[seqnum].innerHTML = '';
                    cell[seqnum].style.background = 'rgba(238, 228, 218, 0.35)';
                }
            }
        }
    }

    /**
     * tryAgain 点击tryAgain按钮响应事件重新开始
     */
    var tryAgain = function() {
        var tdim = this.tdim;
        var self = this;
        var againBtn = document.getElementById('again');
        againBtn.onclick = function () {
            var gameover = document.getElementsByClassName('gameover')[0];
            gameover.style.display = "none";
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    tdim[i][j] = 0;
                }
            }
            self.countScore();
            self.rendering();
        }
    }

    /**
     * countScore 计算得分
     */
    var countScore = function() {
        var tdim = this.tdim;
        var sum = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (tdim[i][j] > 2) {
                    sum += tdim[i][j];
                }
            }
        }
        var score = document.getElementById('score');
        score.innerHTML = sum;
    }

    var prototype = constructor.prototype;
    prototype.init = init;
    prototype.addEvent = addEvent;
    prototype.onNewGame = onNewGame;
    prototype.onKeyRight = onKeyRight;
    prototype.onKeyLeft = onKeyLeft;
    prototype.onKeyUp = onKeyUp;
    prototype.onKeyDown = onKeyDown;
    prototype.getRestItem = getRestItem;
    prototype.clone = clone;
    prototype.rendering = rendering;
    prototype.tryAgain = tryAgain;
    prototype.countScore = countScore;
    return constructor;
})()

new Game();

