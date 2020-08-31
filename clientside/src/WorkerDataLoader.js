/**
 * 
 * @param {float[]} vertexList 
 * @returns {float[]}
 */
function mirrorYs(vertexList){
    return vertexList.map((value, index) => value * (index % 2 == 1 ? -1 : 1))
}


function WorkerDataLoader(data, loadFunction=()=>{}){

    /**
     * 
     * @param {integer} cycle 
     * @returns {Object[]}
     */
    this.getCycleObject = function(cycle){
        return this.cycles[cycle];
    }
    
    /**
     * @returns integer 
     */
    this.getCyclesNumber = function(){
        return this.cycles.length;
    }

    /**
     * 
     * @param {integer} cycle 
     */
    this.releaseCycleMemory = function(cycle){
        delete this.cycles[cycle];
    }

    this.getInfoObject = function(){
        return this.info;
    }

    this.createBaseCycle = function(data, loadFunction){
        this.minX = Number.MAX_SAFE_INTEGER;
        this.minY = Number.MAX_SAFE_INTEGER;
        this.maxX = Number.MIN_SAFE_INTEGER;
        this.maxY = Number.MIN_SAFE_INTEGER;

        data[0].Info.lastCycle = data.length - 1;
        postInfo(data[0].Info);
        
        let map = data[0];
        let entities = {all: {}, building: {}, road: {}, blockade:{}, human:{}};
        for(let i = 0;i < map.Entities.length;i ++){
            let entity = new Entity(map.Entities[i]);
            let entityId = EntityHandler.getId(entity);
            entities.all[entityId] = entity;
            if(EntityHandler.isHuman(entity)) {
                entities.human[entityId] = entity;
            }
            else if(EntityHandler.isBlockade(entity)){
                entities.blockade[entityId] = entity;
            }
            else if(EntityHandler.isRoad(entity)){
                entities.road[entityId] = entity;
            }
            else{
                entities.building[entityId] = entity;
            }
            
            if(EntityHandler.isSurface(entity)){
                let entityVertices = EntityHandler.getVertices(entity);

                for(let j = 0;j < entityVertices.length;j = j + 2){
                    let px = entityVertices[j];
                    let py = entityVertices[j + 1];

                    if(px < this.minX){
                        this.minX = px;
                    }
                    if(py < this.minY){
                        this.minY = py;
                    }
                    if(px > this.maxX){
                        this.maxX = px;
                    }
                    if(py > this.maxY){
                        this.maxY = py;
                    }
                }
            }
        }

        postMapbounds(this.minX, this.minY, this.maxX, this.maxY);
        loadFunction("Map entities are loaded.");
        this.cycles = [entities];
        this.postCycleAfterBake(0, entities);
    }

    this.fillCycle = function(cycle){
        // Deep clone last cycle
        let newCycle = JSON.parse(JSON.stringify(
            this.cycles[this.cycles.length - 1]
        ));

        let thisCycle = data[cycle];
        for(let j in thisCycle.Entities){
            let entityObject = thisCycle.Entities[j];
            let id = EntityHandler.getId(entityObject);
            let entity, entityId;

            if(id in newCycle.all){
                Object.assign(newCycle.all[id], new Entity(entityObject));
                entity = newCycle.all[id];
                entityId = EntityHandler.getId(entity);
            }
            else{
                entity = new Entity(entityObject);
                entityId = EntityHandler.getId(entity);
                newCycle.all[entityId] = entity;
            }

            if(EntityHandler.isHuman(entity)) {
                newCycle.human[entityId] = entity;
            }
            else if(EntityHandler.isBlockade(entity)){
                newCycle.blockade[entityId] = entity;
            }
            else if(EntityHandler.isRoad(entity)) {
                newCycle.road[entityId] = entity;
            }
            else{
                newCycle.building[entityId] = entity;
            }
        }

        this.cycles.push(newCycle);
        this.postCycleAfterBake(cycle, newCycle);
    }

    this.fillCycles = function(data, loadFunction){
        for(let cycle = 1;cycle < data.length;cycle ++){
            this.fillCycle(cycle);
        }
        loadFunction("Game cycle entities are loaded.");
    }

    this.postCycleAfterBake = function(cycle, data){
        let historyManager = new HistoryManager(this.baseHistorian.clone());
        historyManager = this.fillHistoryWithCycleObject(
            historyManager, 
            data,
            cycle
        );
        postCycleData(cycle, historyManager.historian);
    }

    this.fillHistoryWithCycleObject = function(historyManager, cycleObject, cycle){
        if(cycle == 0){
            this.fillHistoryWithObject(historyManager, cycleObject.road);
            this.baseHistorian = historyManager.historian.clone();
        }

        this.fillHistoryWithObject(historyManager, cycleObject.building);
        this.fillHistoryWithObject(historyManager, cycleObject.blockade);
        this.fillHistoryWithObject(historyManager, cycleObject.human);

        return historyManager;
    }

    this.fillHistoryWithObject = function(historyManager, objectList){
        for(let id in objectList){
            let entity = objectList[id];
            
            this.positionMaker.reset();
            this.positionMaker.addPolygon(
                mirrorYs(
                    EntityHandler.getVertices(entity)
                )
            );

            // Draw Polygon
            let color = EntityHandler.getColor(entity);
            historyManager.setColor(color[0], color[1], color[2], 1);
            
            let positionsList = this.positionMaker.getPositionsList();

            historyManager.submitVanilla(
                positionsList
            );

            // Draw Icon
            let icon = EntityHandler.getIcon(entity);
            if(icon){
                let point = EntityHandler.getCenterOfPolygon(entity);
                historyManager.setTextureSlut(textures[icon]);
                historyManager.setTextureResolution(SETTING_ICON_RADIUS*4, SETTING_ICON_RADIUS*4);
                historyManager.setTextureTranslation(
                    point[0] - SETTING_ICON_RADIUS,
                    SETTING_ICON_RADIUS - point[1]
                );

                let x1 = point[0] - SETTING_ICON_RADIUS;
                let y1 = point[1] - SETTING_ICON_RADIUS;
                let x2 = point[0] + SETTING_ICON_RADIUS;
                let y2 = point[1] + SETTING_ICON_RADIUS;

                historyManager.submitVanilla([
                    x1, -y1,
                    x1, -y2,
                    x2, -y1,
                    x2, -y1,
                    x1, -y2,
                    x2, -y2
                ]);
            }
        }
        
        return historyManager;
    }

    this.consturctor = function(data, loadFunction){
        this.positionMaker = new PositionMaker();
        this.baseHistorian = new Historian();

        this.createBaseCycle(data, loadFunction);
        this.fillCycles(data, loadFunction);
    }
    
    // Run
    this.consturctor(data, loadFunction);
}