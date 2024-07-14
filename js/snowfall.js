function Leaf() {
    // 初始化树叶属性
    this.init();
}

Leaf.prototype.init = function() {
    // 宽度50-100之间
    this.width = parseInt(Math.random() * 50) + 50;
    // 树叶初始位置从右上方开始
    this.pos = {
        top: 0,
        left: document.documentElement.clientWidth - this.width
    };
    // 树叶速度50-80之间
    this.speed = parseInt(Math.random() * 30) + 50;
    // 树叶开始下落时间100-1300之间
    this.fallTime = parseInt(Math.random() * 1200) + 100;

    // 树叶初始化
    this.oImg = new Image(); // image内置方法
    this.oImg.src = '/img/' + (parseInt(Math.random() * 4) + 1) + ".png";
    this.oImg.style.width = this.width + "px";
    this.oImg.style.left = this.pos.left + "px";
    this.oImg.style.top = this.pos.top + "px";
    this.oImg.style.position = 'absolute';
    document.body.appendChild(this.oImg);
}

Leaf.prototype.fall = function() {
    var that = this;
    this.interval = setInterval(function() {
        if (that.oImg.offsetTop + that.oImg.offsetHeight >= window.innerHeight) {
            // 树叶到达页面底部后重新从右上方开始飘落
            that.oImg.style.top = '0px';
            that.oImg.style.left = (document.documentElement.clientWidth - that.width) + 'px';
        } else {
            that.oImg.style.top = that.oImg.offsetTop + 10 + "px";
        }
    }, this.speed);
};

document.addEventListener("DOMContentLoaded", function() {
    for (var i = 0; i < 8; i++) {
        (function(leaf) {
            setTimeout(function() {
                leaf.fall();
            }, leaf.fallTime);
        })(new Leaf());
    }
});
