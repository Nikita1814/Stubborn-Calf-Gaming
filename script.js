

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
            event.preventDefault()
            move('up', state.currentPos)
            break;
        case "ArrowDown":
            event.preventDefault()
            move('down', state.currentPos)
            break;
        case "ArrowLeft":
            event.preventDefault()
            move('left', state.currentPos)
            break;
        case "ArrowRight":
            event.preventDefault()
            move('right', state.currentPos)
            break;
    }
})

// menu navigation

const menuSection = document.querySelector(".menu-section")
const menuButtons = document.querySelector(".buttons")


menuButtons.addEventListener('click', (e) => {
    console.log(e.target.classList)
     if(e.target.classList.contains("menu-section-button") && e.target.id) {
        const menuSlides = [...document.querySelectorAll(".menu-slide")]
        const menuButtonGroups = [...document.querySelectorAll(".menu-buttons-group")]
        const menuToActivate = e.target.id.split('-')[1]

        menuSlides.forEach(menuSlide => {
            const menuType = menuSlide.id.split('-')[1]
            if (menuType === menuToActivate) {
                menuSlide.classList.remove("menu-hidden")
            } else {
                menuSlide.classList.add("menu-hidden")
            }
        })


        menuButtonGroups.forEach(btnGrp => {
            const grpId = btnGrp.id.split('-')[1]
            if (grpId === menuToActivate) {
                btnGrp.classList.remove("menu-hidden")
            } else {
                btnGrp.classList.add("menu-hidden")
            }
        })
     }
})


const combatModeToggle = document.querySelector(".toggle-combat")
combatModeToggle.addEventListener('click', () => {
    const combatWindow = document.querySelector('.combat-screen')
    if (combatWindow.classList.contains("menu-hidden")) {
        combatWindow.classList.remove("menu-hidden")
    } else {
        combatWindow.classList.add("menu-hidden")
    }
})

function animateHit() {
    console.log('animating')
    const element = document.querySelector(".human-fighter");
    let start;

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  // Math.min() is used here to make sure the element stops at exactly 200px
  const shift = Math.min(elapsed, 500);
  element.style.backgroundImage = `url(./assets/large_sprites/medium-fighter/9-${Math.round(shift/100)}.PNG)`;
  element.style.backgroundSize = "cover"
  console.log(shift)
  if (shift < 500) {
    requestAnimationFrame(step);
  } else {
    element.style = ""
  }
}

requestAnimationFrame(step);
}

const attackButton = document.querySelector(".attack-button")

attackButton.addEventListener('click', () =>{
    console.log("Attack!")
    animateHit()
})