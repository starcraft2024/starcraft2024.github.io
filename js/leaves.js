var stop, staticx;
var img = new Image();
img.src = "img/leaf.png"; // 本地树叶图片路径

class Leaf {
    constructor(x, y, s, r, fn) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.r = r;
        this.fn = fn;
    }

    draw(cxt) {
        cxt.save();
        const size = 50 * this.s;
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(img, -size / 2, -size / 2, size, size);
        cxt.restore();
    }

    update() {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        this.r = this.fn.r(this.r);
        if (this.x > window.innerWidth ||
            this.x < 0 ||
            this.y > window.innerHeight ||
            this.y < 0
        ) {
            this.reset();
        }
    }

    reset() {
        this.x = getRandom('x');
        this.y = 0;
        this.s = getRandom('s');
        this.r = getRandom('r');
    }
}

class LeafList {
    constructor() {
        this.list = [];
    }

    push(leaf) {
        this.list.push(leaf);
    }

    update() {
        for (const leaf of this.list) {
            leaf.update();
        }
    }

    draw(cxt) {
        for (const leaf of this.list) {
            leaf.draw(cxt);
        }
    }
}

function getRandom(option) {
    let ret;
    const random = Math.random();
    switch (option) {
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
            ret = function(x, y) {
                return x + 0.5 * random - 1.7;
            };
            break;
        case 'fny':
            ret = function(x, y) {
                return y + 1.5 + Math.random() * 0.7;
            };
            break;
        case 'fnr':
            ret = function(r) {
                return r + Math.random() * 0.03;
            };
            break;
    }
    return ret;
}

function startLeaves() {
    requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;

    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
    canvas.setAttribute('id', 'canvas_leaves');
    document.getElementsByTagName('body')[0].appendChild(canvas);

    var leafList = new LeafList();
    for (var i = 0; i < 50; i++) {
        var randomX = getRandom('x');
        var randomY = getRandom('y');
        var randomS = getRandom('s');
        var randomR = getRandom('r');
        var randomFnx = getRandom('fnx');
        var randomFny = getRandom('fny');
        var randomFnR = getRandom('fnr');
        var leaf = new Leaf(randomX, randomY, randomS, randomR, {
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        leafList.push(leaf);
    }

    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        leafList.update();
        leafList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee);
    });
}

window.onload = startLeaves;

window.onresize = function() {
    var canvasLeaves = document.getElementById('canvas_leaves');
    canvasLeaves.width = window.innerWidth;
    canvasLeaves.height = window.innerHeight;
};