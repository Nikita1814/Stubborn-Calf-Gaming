export class Cell {

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



export class Vocation {
    stats = {
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Inteligence: 10,
        Wisdom: 10,
        Charisma: 10
    }

    armorTyes = ['light', 'medium', 'heavy']
}






/*WIP*/

// class Entity {
//     constructor () {}
//     image = './assets/orc.png';
// }


// class Scene {
//     constructor() {
//     }

//     cells =  []
// }
