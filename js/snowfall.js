// falling-leaves.js

// 初始化 Canvas 和上下文
const canvas = document.createElement('canvas');
canvas.id = 'canvas_leaves';
canvas.style.position = 'fixed';
canvas.style.left = '0';
canvas.style.top = '0';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);
const cxt = canvas.getContext('2d');

const leaves = []; // 用于存储树叶对象

const leafImage = new Image();
leafImage.src = './leaf.png'; // 修改为你本地的树叶图片路径

class Leaf {
    constructor(x, y, s, r, fn) {
        this.x = x; // 树叶的 x 坐标
        this.y = y; // 树叶的 y 坐标
        this.s = s; // 树叶的大小
        this.r = r; // 树叶的旋转角度
        this.fn = fn; // 树叶的运动轨迹函数
    }

    draw() {
        cxt.save();
        const size = 50 * this.s; // 树叶大小
        cxt.translate(this.x, this.y);
        cxt.rotate(this.r);
        cxt.drawImage(leafImage, -size / 2, -size / 2, size, size);
        cxt.restore();
    }

    update() {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        this.r = this.fn.r(this.r);
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
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

    draw() {
        for (const leaf of this.list) {
            leaf.draw();
        }
    }
}

// 生成随机数或函数
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
            ret = random;
            break;
        case 'r':
            ret = random * 2 * Math.PI;
            break;
        case 'fnx':
            ret = () => -0.5 + random * 1;
            break;
        case 'fny':
            ret = () => 0.5 + random * 2;
            break;
        case 'fnr':
            ret = () => random * 0.02 - 0.01;
            break;
    }
    return typeof ret === 'function' ? ret : () => ret;
}

// 启动飘落效果
function startFallingLeaves() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const leafList = new LeafList();
    for (let i = 0; i < 50; i++) {
        const leaf = new Leaf(
            getRandom('x'),
            getRandom('y'),
            getRandom('s'),
            getRandom('r'),
            {
                x: getRandom('fnx'),
                y: getRandom('fny'),
                r: getRandom('fnr')
            }
        );
        leafList.push(leaf);
    }

    function animate() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        leafList.update();
        leafList.draw();
        requestAnimationFrame(animate);
    }

    animate();
}

// 处理窗口大小变化
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 加载树叶图片并启动效果
leafImage.onload = startFallingLeaves;
