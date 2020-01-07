class GameTS {

    private tdim: number[][];
    private cellColors: string[];
    private themeColor: string;

    constructor(cellColors:string[],themeColor:string) {
      this.cellColors = cellColors
      this.themeColor = themeColor
      this.tdim = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      this.init();
    }

    /**
     * init 初始化
     */
    init() {
      let self = this;
      self.getRestItem(null);
      self.getRestItem(null);
      self.rendering();
      this.addEvent();
    }

    /**
     * addEvent 事件绑定
     */
    addEvent () {
      let tdim = this.tdim;
      let self = this;
      let newGame =  <HTMLElement>document.getElementsByClassName('btn')[0];
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

    onNewGame() {
      let tdim = this.tdim;
      let gameover =  <HTMLElement>document.getElementsByClassName('gameover')[0];
      gameover.style.display = "none";
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          tdim[i][j] = 0;
        }
      }
      this.countScore();
      this.getRestItem(null);
      this.getRestItem(null);
      this.rendering();
    }

    /**
     * onKeyRight 点击向右键响应事件
     */
    onKeyRight () {
      let tdim = this.tdim;
      let self = this;
      let tdimf = self.clone(tdim);
      for (let i = 0; i < 4; i++) {
        let pos = 3;
        for (let j = 3; j >= 0; j--) {
          if (tdim[i][j] != 0) {
            if (pos > j) {
              tdim[i][pos--] = tdim[i][j];
              tdim[i][j] = 0;
            } else {
              tdim[i][pos--] = tdim[i][j];
            }
          }
        }

        for (let j = 3; j >= 1; j--) {
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
    onKeyLeft () {
      let tdim = this.tdim;
      let self = this;
      let tdimf = self.clone(tdim);
      for (let i = 0; i < 4; i++) {
        let pos = 0;
        for (let j = 0; j < 4; j++) {
          if (tdim[i][j] != 0) {
            if (pos < j) {
              tdim[i][pos++] = tdim[i][j];
              tdim[i][j] = 0;
            } else {
              tdim[i][pos++] = tdim[i][j];
            }
          }
        }

        for (let j = 0; j < 3; j++) {
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
    onKeyUp () {
      let tdim = this.tdim;
      let self = this;
      let tdimf = self.clone(tdim);
      for (let j = 0; j < 4; j++) {
        let pos = 0;
        for (let i = 0; i < 4; i++) {
          if (tdim[i][j] != 0) {
            if (pos < i) {
              tdim[pos++][j] = tdim[i][j];
              tdim[i][j] = 0;
            } else {
              tdim[pos++][j] = tdim[i][j];
            }
          }
        }

        for (let i = 0; i < 3; i++) {
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
    onKeyDown () {
      let tdim = this.tdim;
      let self = this;
      let tdimf = self.clone(tdim);
      for (let j = 0; j < 4; j++) {
        let pos = 3;
        for (let i = 3; i >= 0; i--) {
          if (tdim[i][j] != 0) {
            if (pos > i) {
              tdim[pos--][j] = tdim[i][j];
              tdim[i][j] = 0;
            } else {
              tdim[pos--][j] = tdim[i][j];
            }
          }
        }
        for (let i = 3; i >= 1; i--) {
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
    getRestItem (tdimf:any) {
      let tdim = this.tdim;
      let self = this;
      let newAry = [];
      let countdif = 0;
      let cnt = 0;
      //获取所有值为0的位置用i,j表示
      for (let i = 0; i < 4; i++) {
        for (let j = 3; j >= 0; j--) {
          if (tdim[i][j] == 0) {
            newAry.push({ i: i, j: j });
          }
        }
      }
      
      if (tdimf) {
        for (let p = 0; p < 4; p++) {
          for (let s = 3; s >= 0; s--) {
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

        for (let m = 0; m < 4; m++) {
          for (let n = 3; n >= 0; n--) {
            let compare = [];
            let count = 0;
            let cur = tdim[m][n];
            let ary = [];
            ary = [{ s: m - 1, t: n }, { s: m, t: n - 1 }, { s: m + 1, t: n }, { s: m, t: n + 1 }];

            ary.forEach(function (eml) {
              if ((eml.s >= 0 && eml.s < 4) && (eml.t >= 0 && eml.t < 4)) {
                compare.push(eml);
              }
            })
            for (let k = 0; k < compare.length; k++) {
              let curl = compare[k];
              if (tdim[curl.s][curl.t] != cur) {
                count++;
                //如果当前值和前后左右都不相等
                if (count >= compare.length) {
                  countdif++;
                  if (countdif >= 16) {
                    let gameover =  <HTMLElement>document.getElementsByClassName('gameover')[0];
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
        let ranNum = Math.floor(Math.random() * newAry.length);
        let item = newAry[ranNum];
        let tmp = Math.floor(Math.random() * 100);
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
    clone (tdim) {
      let newAry = [[], [], [], []];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          newAry[i][j] = tdim[i][j]
        }
      }
      return newAry
    }

    /**
     * rendering 渲染页面
     */
    rendering () {
      let tdim = this.tdim;
      let cellColors = this.cellColors;
      let themeColor = this.themeColor;
      let row =  <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("grid-row");
      let cell =  <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("grid-cell");
      for (let m = 0; m < 4; m++) {
        for (let n = 0; n < 4; n++) {
          let seqnum = m * 4 + n;
          if (tdim[m][n] != 0) {
            let num = tdim[m][n];
            switch (num) {
              case 2:
                cell[seqnum].style.background = cellColors[0];
                break;
              case 4:
                cell[seqnum].style.background = cellColors[1];
                break;
              case 8:
                cell[seqnum].style.background = cellColors[2];
                break;
              case 16:
                cell[seqnum].style.background = cellColors[3];
                break;
              case 32:
                cell[seqnum].style.background = cellColors[4];
                break;
              default:
                cell[seqnum].style.background = cellColors[5];
                break;
            }
            cell[seqnum].innerHTML = tdim[m][n].toString();
          }
          else {
            cell[seqnum].innerHTML = '';
            cell[seqnum].style.background = themeColor;
          }
        }
      }
    }

    /**
     * tryAgain 点击tryAgain按钮响应事件重新开始
     */
    tryAgain () {
      let tdim = this.tdim;
      let self = this;
      let againBtn = <HTMLElement>document.getElementById('again');
      againBtn.onclick = function () {
        let gameover = <HTMLElement>document.getElementsByClassName('gameover')[0];
        gameover.style.display = "none";
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
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
    countScore () {
      let tdim = this.tdim;
      let sum = 0;
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (tdim[i][j] > 2) {
            sum += tdim[i][j];
          }
        }
      }
      let score = document.getElementById('score');
      score.innerHTML = sum.toString();
    }
}

const cellColors = ['#EEE4DA', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b'],
const themeColor ="rgba(238, 228, 218, 0.35)"

new GameTS(cellColors, themeColor);

