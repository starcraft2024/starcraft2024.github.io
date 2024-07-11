(function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'starfall-canvas';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var w, h;
    var stars = [];
    var maxStars = 300;

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (var i = 0; i < maxStars; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 1,
                d: Math.random() * maxStars,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        for (var i = 0; i < stars.length; i++) {
            var star = stars[i];
            ctx.moveTo(star.x, star.y);
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
    }

    function updateStars() {
        for (var i = 0; i < stars.length; i++) {
            var star = stars[i];
            star.y += Math.pow(star.d, 2) + 1;
            if (star.y > h) {
                star.y = 0;
                star.x = Math.random() * w;
            }
        }
    }

    function animate() {
        resizeCanvas();
        updateStars();
        drawStars();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    createStars();
    animate();

    window.addEventListener('resize', resizeCanvas);
})();
