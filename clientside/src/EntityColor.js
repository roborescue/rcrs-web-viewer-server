const HUMAN_HP_MAX = 10000;
const HUMAN_HP_INJURED = 7500;
const HUMAN_HP_CRITICAL = 1000;

const COLOR_HUMAN_TYPE_CIVILIAN = [0, 1, 0];
const COLOR_HUMAN_TYPE_FIRE_BRIGADE = [1, 0, 0];
const COLOR_HUMAN_TYPE_AMBULANCE_TEAM = [1, 1, 1];
const COLOR_HUMAN_TYPE_POLICE_FORCE = [0, 0, 1];
const COLOR_HUMAN_TYPE_DEAD = [0, 0, 0];

const COLOR_ROAD_DEFAULT = [0.72, 0.72, 0.72];
const COLOR_BLOCKADE_DEFAULT = [0, 0, 0];

const COLOR_BUILDING_FIERYNESS_UNBURNT = [0.52, 0.52, 0.52];
const COLOR_BUILDING_FIERYNESS_HEATING = [0.69, 0.69, 0.21];
const COLOR_BUILDING_FIERYNESS_BURNING = [0.8, 0.47, 0.19];
const COLOR_BUILDING_FIERYNESS_INFERNO = [0.62, 0.20, 0.20];
const COLOR_BUILDING_FIERYNESS_WATER_DAMAGE = [0.19, 0.47, 0.51];
const COLOR_BUILDING_FIERYNESS_MINOR_DAMAGE = [0.39, 0.54, 0.82];
const COLOR_BUILDING_FIERYNESS_MODERATE_DAMAGE = [0.39, 0.27, 0.74];
const COLOR_BUILDING_FIERYNESS_SEVERE_DAMAGE = [0.31, 0.23, 0.54];
const COLOR_BUILDING_FIERYNESS_BURNT_OUT = [0.0, 0.0, 0.0];

EntityColor = {};

EntityColor.getDarker = function(color){
    return [
        color[0] / 2,
        color[1] / 2,
        color[2] / 2
    ];
}

EntityColor.getBuildingColor = function(fieryness){
    switch(fieryness){
        case 0: //UNBURNT
            return COLOR_BUILDING_FIERYNESS_UNBURNT;
        case 1: //HEATING
            return COLOR_BUILDING_FIERYNESS_HEATING;
        case 2: //BURNING
            return COLOR_BUILDING_FIERYNESS_BURNING;
        case 3: //INFERNO
            return COLOR_BUILDING_FIERYNESS_INFERNO;
        case 4: //WATER_DAMAGE
            return COLOR_BUILDING_FIERYNESS_WATER_DAMAGE;
        case 5: //MINOR_DAMAGE
            return COLOR_BUILDING_FIERYNESS_MINOR_DAMAGE;
        case 6: //MODERATE_DAMAGE
            return COLOR_BUILDING_FIERYNESS_MODERATE_DAMAGE;
        case 7: //SEVERE_DAMAGE
            return COLOR_BUILDING_FIERYNESS_SEVERE_DAMAGE;
        case 8: //BURNT_OUT
            return COLOR_BUILDING_FIERYNESS_BURNT_OUT;
    }
    return COLOR_BUILDING_FIERYNESS_UNBURNT;
}

EntityColor.getHumanColor = function(type, hp){
    if(hp == 0)
        return COLOR_HUMAN_TYPE_DEAD;

    let color;
    switch (type) {
        case "Civilian":
            color = COLOR_HUMAN_TYPE_CIVILIAN;
            break;
        case "Fire brigade":
            color = COLOR_HUMAN_TYPE_FIRE_BRIGADE;
            break;
        case "Ambulance team":
            color = COLOR_HUMAN_TYPE_AMBULANCE_TEAM;
            break;
        case "Police force":
            color = COLOR_HUMAN_TYPE_POLICE_FORCE;
            break;
    }

    if(hp < HUMAN_HP_CRITICAL)
        color = this.getDarker(color);
    
    if(hp < HUMAN_HP_INJURED)
        color = this.getDarker(color);

    if(hp < HUMAN_HP_MAX)
        color = this.getDarker(color);

    return color;
}

/**
 * @param {Object} entity
 * @returns {float[3]}
 */
EntityColor.getColor = function(entity){
    if(EntityHandler.isRoad(entity))
        return COLOR_ROAD_DEFAULT;
    if(EntityHandler.isBuilding(entity))
        return this.getBuildingColor(entity.Fieryness);
    if(EntityHandler.isBlockade(entity))
        return COLOR_BLOCKADE_DEFAULT;

    if(EntityHandler.isHuman(entity))
        return this.getHumanColor(
            EntityHandler.getType(entity),
            EntityHandler.getHP(entity)
        );

    return [0, 0, 0];
};