var stop, staticx;
var img = new Image();
img.src = "leaf.png"; // 本地树叶图片的路径

function Leaf(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn;
}

Leaf.prototype.draw = function(cxt) {
    cxt.save();
    var xc = 40 * this.s / 4;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
    cxt.restore();
}

Leaf.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if(this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom('fnr');
        if(Math.random() > 0.4) {
            this.x = getRandom('x');
            this.y = 0;
            this.s = getRandom('s');
            this.r = getRandom('r');
        } else {
            this.x = window.innerWidth;
            this.y = getRandom('y');
            this.s = getRandom('s');
            this.r = getRandom('r');
        }
    }
}

function LeafList() {
    this.list = [];
}

LeafList.prototype.push = function(leaf) {
    this.list.push(leaf);
}

LeafList.prototype.update = function() {
    for(var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update();
    }
}

LeafList.prototype.draw = function(cxt) {
    for(var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt);
    }
}

LeafList.prototype.get = function(i) {
    return this.list[i];
}

LeafList.prototype.size = function() {
    return this.list.length;
}

function getRandom(option) {
    var ret, random;
    switch(option) {
        case 'x':
            ret = Math.random() * window.innerWidth;
            break;
        case 'y':
            ret = Math.random() * window.innerHeight;
            break;
        case 's':
            ret = Math.random();
            break;
        case 'r':
            ret = Math.random() * 6;
            break;
        case 'fnx':
            random = -0.5 + Math.random() * 1;
            ret = function(x, y) {
                return x + 0.5 * random - 1.7;
            };
            break;
        case 'fny':
            random = 1.5 + Math.random() * 0.7;
            ret = function(x, y) {
                return y + random;
            };
            break;
        case 'fnr':
            random = Math.random() * 0.03;
            ret = function(r) {
                return r + random;
            };
            break;
    }
    return ret;
}

function startLeaves() {
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement('canvas'), cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed; left: 0; top: 0; pointer-events: none;');
    canvas.setAttribute('id', 'canvas_leaves');
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    var leafList = new LeafList();
    for(var i = 0; i < 50; i++) {
        var leaf, randomX, randomY, randomS, randomR, randomFnx, randomFny;
        randomX = getRandom('x');
        randomY = getRandom('y');
        randomR = getRandom('r');
        randomS = getRandom('s');
        randomFnx = getRandom('fnx');
        randomFny = getRandom('fny');
        randomFnR = getRandom('fnr');
        leaf = new Leaf(randomX, randomY, randomS, randomR, {x: randomFnx, y: randomFny, r: randomFnR});
        leaf.draw(cxt);
        leafList.push(leaf);
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        leafList.update();
        leafList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee);
    });
}

window.onresize = function() {
    var canvasLeaves = document.getElementById('canvas_leaves');
    canvasLeaves.width = window.innerWidth;
    canvasLeaves.height = window.innerHeight;
}

img.onload = function() {
    startLeaves();
}

function stopLeaves() {
    if(staticx) {
        var child = document.getElementById("canvas_leaves");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
        staticx = false;
    } else {
        startLeaves();
    }
}
