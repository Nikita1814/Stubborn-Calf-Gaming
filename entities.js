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




    const vehicleBrand = brandIdsData.find(brand => {
      return brand.techName === brandId || brand.displayName === brandId;
    });

    if (!vehicleBrand) {
      console.log(value)
      throw new Error(
        `No brand found for row ${idx}. Please ensure a valid brand name or ID is provided.`
      );
    } else {
      newValue.brandId = vehicleBrand.id;
      const {id,caravanMaximumNoseWeight, caravanMinimumNoseWeight,  caravanJockeyWheelDistanceToAxle, caravanJockeyWheelDistanceToTowBar, ...rest} = newValue
      
      const generatedProductKey = `${(newValue.productNameKey == null || newValue.productNameKey.length === 0) ?  (newValue.modelGroup + "_" + newValue.model+ "_" +newValue.layout + "_" +newValue.modelYear).trim() :  newValue.productNameKey}`
      
     if(newValue.typeId === "caravan") {
     return {...rest, productNameKey: generatedProductKey, caravanSpecificDetails: {
       maximumNoseWeight: caravanMaximumNoseWeight,
       minimumNoseWeight: caravanMinimumNoseWeight,
       jockeyWheelDistanceToAxle: caravanJockeyWheelDistanceToAxle,
       jockeyWheelDistanceToTowBar:caravanJockeyWheelDistanceToTowBar
     } }
     }
      return {...rest};
    }