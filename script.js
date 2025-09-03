const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Scales Canvas full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Variables
const sky = new Image();
sky.src = "assets/sky.png";

const cloud = new Image();
cloud.src = "assets/cloud.png"

const clouds = Array.from({ length: 15}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height * 0.3),
    w: 256,
    h: 128,
    speed: 1 + Math.random() * 2
}));

const castle = new Image();
castle.src = "assets/castle.png";

const grass = new Image();
grass.src = "assets/grass_tile.png";

let cloudX = 0;

// Adds Clouds
function drawClouds() {
    clouds.forEach(c => {
        ctx.drawImage(cloud, c.x, c.y, c.w, c.h);
        c.x += c.speed;

        if (c.x > canvas.width) {
            c.x = -c.w - Math.random() * canvas.width;
            c.y = Math.random() * (canvas.height * 0.3);
        }
    });
}

// Adds Sky
function drawBackground() {
    ctx.drawImage(sky, 0, 0, canvas.width, canvas.height);
}

// Adds Castles
function drawCastle() {
    const castleWidth = 250;
    const castleHeight = 250;

    const playerX = 50;
    const playerY = canvas.height - castleHeight;

    const enemyX = canvas.width - castleWidth - 50;
    const enemyY = canvas.height - castleHeight;

    ctx.drawImage(castle, playerX, playerY, castleWidth, castleHeight);
    ctx.drawImage(castle, enemyX, enemyY, castleWidth, castleHeight);
}

// Creates Canvas
function drawCoverImage(img) {
    const scale = Math.max(
        canvas.width / img.width, 
        canvas.height / img.height
    );
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Game Loop
function gameLoop() {
    if (sky.complete) {
        drawBackground(sky);
    }

    if (grass.complete) {
        const pattern = ctx.createPattern(grass, "repeat");
        ctx.fillStyle = pattern;
        const groundHeight = 120;
        ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
    } else {
        ctx.fillStyle = "green";
        ctx.fillRect(0, canvas.height - 120, canvas.width, 120);
    }

    drawClouds();
    drawCastle();
    requestAnimationFrame(gameLoop);
}

gameLoop();
