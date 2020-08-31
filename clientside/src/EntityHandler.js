var EntityHandler = {
};

EntityHandler.humans = [
    "Civilian", 
    "Ambulance team", 
    "Fire brigade",
    "Police force",
];

EntityHandler.surfaces = [
    "Road", 
    "Building", 
    "Refuge",
    "Blockade",
    "Hydrant",
    "Gas Station",
    "Ambulance centre",
    "Fire station",
    "Police office"
];

EntityHandler.buildings = [
    "Building", 
    "Refuge",
    "Gas Station",
    "Ambulance centre",
    "Fire station",
    "Police office"
];

EntityHandler.roads = [
    "Road",
    "Hydrant"
];

EntityHandler.blockades = [
    "Blockade"
];

/**
 * 
 * @param {integer[3]} color1 
 * @param {integer[3]} color2 
 */
EntityHandler.mixColors = function(color1, color2){
    retrun [
        (color1[0] + color2[0]) / 2,
        (color1[1] + color2[1]) / 2,
        (color1[2] + color2[2]) / 2
    ];
}

EntityHandler.getBuildingColor = function(fieryness){
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
EntityHandler.getColor = function(entity){
    if(this.isRoad(entity))
        return [0.72, 0.72, 0.72];
    if(this.isBuilding(entity))
        return this.getBuildingColor(entity.Fieryness);
    if(this.isBlockade(entity))
        return [0, 0, 0];

    switch (this.getType(entity)) {

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

EntityHandler.getType = function(entity){
    return entity.EntityName;
}

/**
 * @param {Object} entity
 * @returns {boolean}
 */
EntityHandler.isRoad = function(entity){
    return this.roads.includes(
        this.getType(entity)
    );
} 

/**
 * @param {Object} entity
 * @returns {boolean}
 */
EntityHandler.isHuman = function(entity){
    return this.humans.includes(
        this.getType(entity)
    );
}

/**
 * @param {Object} entity
 * @returns {boolean}
 */
EntityHandler.isSurface = function(entity){
    return this.surfaces.includes(
        this.getType(entity)
    );
}

/**
 * @param {Object} entity
 * @returns {boolean}
 */
EntityHandler.isBlockade = function(entity){
    return this.blockades.includes(
        this.getType(entity)
    );
}

/**
 * @param {Object} entity
 * @returns {boolean}
 */
EntityHandler.isBuilding = function(entity){
    return this.buildings.includes(
        this.getType(entity)
    );
}

EntityHandler.getId = function(entity){
    return entity.Id;
}

EntityHandler.getHumanVertices = function(cx, cy, r=1500,cuts=15){
    let x,y;
    let cut = (Math.PI*2)/cuts;
    let ox = cx + r * Math.cos(0);
    let oy = cy + r * Math.sin(0);
    let result = [ox,oy];

    for(let i = 0;i <= Math.PI * 2;i += cut){
        x = cx + r * Math.cos(i);
        y = cy + r * Math.sin(i);
        result.push(x,y);
    }

    return result;
}

EntityHandler.getVertices = function(entity){
    if(this.isSurface(entity)){
        return entity.Apexes;
    }
    else if(this.isHuman(entity)){
        let position = entity.Pos;
        return this.getHumanVertices(position[0], position[1]);
    }
    return [];
}