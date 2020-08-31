var EntityHandler = {
};

EntityHandler.humans = [
    ENTITY_NAME_CIVILIAN, 
    ENTITY_NAME_AMBULANCE_TEAM, 
    ENTITY_NAME_FIRE_BRIGADE,
    ENTITY_NAME_POLICE_FORCE,
];

EntityHandler.surfaces = [
    ENTITY_NAME_ROAD, 
    ENTITY_NAME_BUILDING, 
    ENTITY_NAME_REFUGE,
    ENTITY_NAME_BLOCKADE,
    ENTITY_NAME_HYDRANT,
    ENTITY_NAME_GAS_STATION,
    ENTITY_NAME_AMBULANCE_CENTRE,
    ENTITY_NAME_FIRE_STATION,
    ENTITY_NAME_POLICE_OFFICE
];

EntityHandler.buildings = [
    ENTITY_NAME_BUILDING, 
    ENTITY_NAME_REFUGE,
    ENTITY_NAME_GAS_STATION,
    ENTITY_NAME_AMBULANCE_CENTRE,
    ENTITY_NAME_FIRE_STATION,
    ENTITY_NAME_POLICE_OFFICE
];

EntityHandler.roads = [
    ENTITY_NAME_ROAD,
    ENTITY_NAME_HYDRANT
];

EntityHandler.blockades = [
    ENTITY_NAME_BLOCKADE
];

EntityHandler.getColor = function(entity){
    return EntityColor.getColor(entity);
};

EntityHandler.getType = function(entity){
    return entity[ENTITY_ATTR_ENTITY_NAME];
}

EntityHandler.getHP = function(entity){
    return entity[ENTITY_ATTR_HP];
}

EntityHandler.getIcon = function(entity){
    switch(this.getType(entity)){
        case ENTITY_NAME_HYDRANT:
            return ICONS_HYDRANT;
        case ENTITY_NAME_POLICE_OFFICE:
            return ICONS_POLICE_OFFICE;
        case ENTITY_NAME_AMBULANCE_CENTRE:
            return ICONS_AMBULANCE_CENTRE;
        case ENTITY_NAME_FIRE_STATION:
            return ICONS_FIRE_STATION;
        case ENTITY_NAME_REFUGE:
            return ICONS_REFUGE;
        case ENTITY_NAME_GAS_STATION:
            return ICONS_GAS_STATION;
    }
    return false;
};

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
    return entity[ENTITY_ATTR_ID];
}

/**
 * 
 * @param {Object} entity 
 * @returns {float[2]}
 */
EntityHandler.getCenterOfPolygon = function(entity){
    let apexes = entity[ENTITY_ATTR_APEXES];
    if(apexes){
        let sum = [0, 0], vl = apexes.length;
        for(let i = 0;i < vl;i ++){
            sum[i % 2] += apexes[i];
        }
        sum[0] /= vl / 2;
        sum[1] /= vl / 2;
        return sum;
    }
    return false;
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
        return entity[ENTITY_ATTR_APEXES];
    }
    else if(this.isHuman(entity)){
        let position = entity[ENTITY_ATTR_POSITION];
        return this.getHumanVertices(position[0], position[1]);
    }
    return [];
}