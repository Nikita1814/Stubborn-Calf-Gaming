

const state = {
    currentPos: {
        x: 0,
        y: 0
    }
}


class Cell {

    isPassable = true;
    isDamageable = false;
    doesDamage = false;
    isInterractable
    floorTile  = './assets/dirt_full_new.png';
    objects = []
    constructor(floorTile) {
        this.floorTile = floorTile
    }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 32;
const maxTiles = tileSize * 2 * 10




function generateGrassTerraint() {
    const res = []
    for (let i = 0; i < 20; i ++) {
        const row = []
        for (let j = 0; j < 20; j++) {
            row.push( new Cell('./assets/dirt_full_new.png'))
        }
        res.push(row)
    }

    return res
}

// const background = new Image();
// background.src = './assets/dirt_full_new.png'

// background.onload = () => {
//     for (let i = 0; i < 20; i ++) {
//         for (let j = 0; j < 20; j++) {
//             ctx.drawImage(background, i * tileSize, j * tileSize, tileSize, tileSize);
//         }
//     }
    
// };

const terrain = generateGrassTerraint()

    for (let i = 0; i < terrain.length; i ++) {
        for (let j = 0; j < terrain[i].length; j++) {
            const cell = terrain[i][j]
            // const background = new Image();
            // background.src = terrainToGenerate[i][j].floorTile;
            // ctx.drawImage(background, i * tileSize, j * tileSize, tileSize, tileSize);
            drawTile(cell, i * tileSize, j * tileSize, tileSize, tileSize, ctx)
        } 
    }

function drawTile(cell, posX, posY, height, width, ctx) {
    const background = new Image();
    background.src = cell.floorTile
    background.onload = () => {
        ctx.drawImage(background, posX, posY, height, width);
    }
}


const overlayImage = new Image();
overlayImage.src = "./assets/human_wizard_m.png";
overlayImage.onload = () => {
    ctx.drawImage(overlayImage, 0, 0, tileSize, tileSize);
};


function updateCurrentPos(pos) {
    state.currentPos = pos
}

// function move(direction, pos) {
//     let x = pos.x;
//     let y = pos.y;

//     if (direction === "up" && y > 0 ) {
//         const oldY = pos.y
//         y = pos.y - 32
//         ctx.clearRect(x, oldY, tileSize , tileSize)
//         ctx.drawImage(background, x, oldY, tileSize, tileSize);
//         ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
//     } else if (direction === "down" && y < maxTiles -32) {
//         const oldY = pos.y
//         y = pos.y + 32
//         ctx.clearRect(x, oldY, tileSize , tileSize)
//         ctx.drawImage(background, x, oldY, tileSize, tileSize);
//         ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
//     } else if (direction === "left" && x > 0) {
//         const oldX = pos.x
//         x = pos.x - 32
//         ctx.clearRect(oldX, y, tileSize, tileSize)
//         ctx.drawImage(background, oldX, y, tileSize, tileSize);
//         ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
//     } else if (direction === "right" &&  x < maxTiles - 32) {
//         const oldX = pos.x
//         x = pos.x + 32
//         ctx.clearRect(oldX, y, tileSize, tileSize)
//         ctx.drawImage(background, oldX, y, tileSize, tileSize);
//         ctx.drawImage(overlayImage, x, y, tileSize, tileSize);
//     }

//     updateCurrentPos({
//         x: x,
//         y: y
//     })
//     console.log(state)
// }


function move(direction, pos) {
    let x = pos.x;
    let y = pos.y;
    const oldTileImage =  new Image ();
    oldTileImage.src = terrain[pos.x][pos.y].floorTile
    oldTileImage.onload = () => {
        if (direction === "up" && y > 0 ) {
            const oldY = pos.y
            y = pos.y - 1
            ctx.clearRect(x * tileSize, oldY * tileSize, tileSize , tileSize)
            ctx.drawImage(oldTileImage, x * tileSize, oldY * tileSize, tileSize, tileSize);
            ctx.drawImage(overlayImage, x * tileSize, y * tileSize, tileSize, tileSize);
        } else if (direction === "down" && y < 19) {
            const oldY = pos.y
            y = pos.y + 1
            ctx.clearRect(x * tileSize, oldY * tileSize, tileSize , tileSize)
            ctx.drawImage(oldTileImage, x * tileSize, oldY * tileSize, tileSize, tileSize);
            ctx.drawImage(overlayImage, x * tileSize, y * tileSize, tileSize, tileSize);
        } else if (direction === "left" && x > 0) {
            const oldX = pos.x
            x = pos.x - 1
            ctx.clearRect(oldX * tileSize, y * tileSize, tileSize, tileSize)
            ctx.drawImage(oldTileImage, oldX * tileSize, y * tileSize, tileSize, tileSize);
            ctx.drawImage(overlayImage, x * tileSize, y * tileSize, tileSize, tileSize);
        } else if (direction === "right" &&  x < 19) {
            const oldX = pos.x
            x = pos.x + 1
            ctx.clearRect(oldX * tileSize, y * tileSize, tileSize, tileSize)
            ctx.drawImage(oldTileImage, oldX * tileSize , y * tileSize, tileSize, tileSize);
            ctx.drawImage(overlayImage, x * tileSize, y * tileSize, tileSize, tileSize);
        }
    
        updateCurrentPos({
            x: x,
            y: y
        })
        console.log(state)
    }
    
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