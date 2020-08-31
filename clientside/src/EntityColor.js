EntityColor = {};

EntityColor.getBuildingColor = function(fieryness){
    switch(fieryness){
        case 0: //UNBURNT
            return [0.52, 0.52, 0.52];
        case 1: //HEATING
            return [0.69, 0.69, 0.21];
        case 2: //BURNING
            return [0.8, 0.47, 0.19];
        case 3: //INFERNO
            return [0.62, 0.20, 0.20];
        case 4: //WATER_DAMAGE
            return [0.19, 0.47, 0.51];
        case 5: //MINOR_DAMAGE
            return [0.39, 0.54, 0.82];
        case 6: //MODERATE_DAMAGE
            return [0.39, 0.27, 0.74];
        case 7: //SEVERE_DAMAGE
            return [0.31, 0.23, 0.54];
        case 8: //BURNT_OUT
            return [0.0, 0.0, 0.0];
    }
    return [0.52, 0.52, 0.52];
}

/**
 * @param {Object} entity
 * @returns {float[3]}
 */
EntityColor.getColor = function(entity){
    if(EntityHandler.isRoad(entity))
        return [0.72, 0.72, 0.72];
    if(EntityHandler.isBuilding(entity))
        return this.getBuildingColor(entity.Fieryness);
    if(EntityHandler.isBlockade(entity))
        return [0, 0, 0];

    switch (EntityHandler.getType(entity)) {
        case "Civilian":
            return [0, 1, 0];

        case "Fire brigade":
            return [1, 0, 0];
            
        case "Ambulance team":
            return [1, 1, 1];

        case "Police force":
            return [0, 0, 1];
    }
    return [0, 0, 0];
};