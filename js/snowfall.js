function Leaf() {
    //宽度50-100之间
    this.width = parseInt(Math.random() * 50) + 50;
    //树叶初始位置
    this.pos = {
        top: 0,
        left: parseInt(Math.random() * (document.documentElement.clientWidth - this.width))
    };
    //树叶速度50-80之间
    this.speed = parseInt(Math.random() * 30) + 50;
    //树叶开始下落时间100-1300之间
    this.fallTime = parseInt(Math.random() * 1200) + 100;

    //树叶初始化
    this.oImg = new Image(); //image内置方法
    this.oImg.src = '/img/' + (parseInt(Math.random() * 4) + 1) + ".png";
    this.oImg.style.width = this.width + "px";
    this.oImg.style.left = this.pos.left + "px";
    this.oImg.style.top = this.pos.top + "px";
    this.oImg.style.position = 'absolute';
    document.body.appendChild(this.oImg);
}

Leaf.prototype.fall = function() {
    var that = this;
    setInterval(function() {
        that.oImg.style.top = that.oImg.offsetTop + 10 + "px";
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
