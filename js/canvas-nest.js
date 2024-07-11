// canvas-nest.js

(function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'canvas-nest';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;
    var stars = [], count = 0, maxStars = 500;

    var Star = function () {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.radius = Math.random() * 1 + 1;
        this.alpha = Math.random();
    };

    Star.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255,' + this.alpha + ')';
        ctx.fill();
    };

    Star.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
        this.alpha += Math.random() * 0.05 - 0.025;
        if (this.alpha < 0) this.alpha = 0;
        if (this.alpha > 1) this.alpha = 1;
    };

    function init() {
        for (var i = 0; i < maxStars; i++) {
            stars.push(new Star());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        stars.forEach(function (star) {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
})();
