let socket;
let lastTouchX = null;
let lastTouchY = null;
const threshold = 5;

function setup() {
    createCanvas(300, 400);
    background(220);

    socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO error:', error);
    });
}

function draw() {
    background(220);
    fill(255, 128, 0);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Toca para mover\nPresiona una tecla para color', width / 2, height / 2);
}

function touchMoved() {
    if (socket && socket.connected) {
        let dx = abs(mouseX - lastTouchX);
        let dy = abs(mouseY - lastTouchY);

        if (dx > threshold || dy > threshold || lastTouchX === null) {
            let touchData = {
                type: 'touch',
                x: mouseX,
                y: mouseY
            };
            socket.emit('message', JSON.stringify(touchData));

            lastTouchX = mouseX;
            lastTouchY = mouseY;
        }
    }
    return false;
}

function keyPressed() {
    if (socket && socket.connected) {
        // Cambiar aleatoriamente el color
        let r = floor(random(0, 256));
        let g = floor(random(0, 256));
        let b = floor(random(0, 256));

        let colorData = {
            type: 'color',
            r: r,
            g: g,
            b: b
        };

        socket.emit('message', JSON.stringify(colorData));
    }
}
