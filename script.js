const state = {
    currentPos: {
        x: 0,
        y: 0
    }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;

const background = new Image();
background.src = "./assets/dirt_full_new.png";

background.onload = () => {
    for (let i = 0; i < 10; i ++) {
        for (let j = 0; j < 10; j++) {
            ctx.drawImage(background, i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
    
};

const overlayImage = new Image();
overlayImage.src = "./assets/wizard.png";
overlayImage.onload = () => {
    ctx.drawImage(overlayImage, 0, 0, tileSize, tileSize);
};


function updateCurrentPos(pos) {
    state.currentPos = pos
}

function move(direction, pos) {
    let x = pos.x;
    let y = pos.y;

    if (direction === "up" && y > 0 ) {
        const oldY = pos.y
        y = pos.y - 32
        ctx.clearRect(x, oldY, tileSize , tileSize)
        ctx.drawImage(background, x, oldY, tileSize, tileSize);
        ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
    } else if (direction === "down" && y < 320) {
        const oldY = pos.y
        y = pos.y + 32
        ctx.clearRect(x, oldY, tileSize , tileSize)
        ctx.drawImage(background, x, oldY, tileSize, tileSize);
        ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
    } else if (direction === "left" && x > 0) {
        const oldX = pos.x
        x = pos.x - 32
        ctx.clearRect(oldX, y, tileSize, tileSize)
        ctx.drawImage(background, oldX, y, tileSize, tileSize);
        ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
    } else if (direction === "right" &&  x < 320) {
        const oldX = pos.x
        x = pos.x + 32
        ctx.clearRect(oldX, y, tileSize, tileSize)
        ctx.drawImage(background, oldX, y, tileSize, tileSize);
        ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
    }

    updateCurrentPos({
        x: x,
        y: y
    })
    console.log(state)
}

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
            move('up', state.currentPos)
            break;
        case "ArrowDown":
            move('down', state.currentPos)
            break;
        case "ArrowLeft":
            move('left', state.currentPos)
            break;
        case "ArrowRight":
            move('right', state.currentPos)
            break;
    }
})