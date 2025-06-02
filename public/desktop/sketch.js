let socket;
let circleX = 200;
let circleY = 200;
let circleColor = [255, 0, 0]; // color inicial rojo

function setup() {
    createCanvas(300, 400);
    background(220);

    socket = io();

    socket.on('connect', () => {
        console.log('Connected to server');
    });

    socket.on('message', (data) => {
        console.log(`Received message: ${data}`);
        try {
            let parsedData = JSON.parse(data);

            if (parsedData.type === 'touch') {
                circleX = parsedData.x;
                circleY = parsedData.y;
            } else if (parsedData.type === 'color') {
                circleColor = [parsedData.r, parsedData.g, parsedData.b];
            }
        } catch (e) {
            console.error("Error parsing received JSON:", e);
        }
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
    fill(circleColor[0], circleColor[1], circleColor[2]);
    ellipse(circleX, circleY, 50, 50);
}
