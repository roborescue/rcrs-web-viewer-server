// function DataLoader(data, loadFunction=()=>{}){

//     /**
//      * 
//      * @param {integer} cycle 
//      * @returns {Object[]}
//      */
//     this.getCycleObject = function(cycle){
//         return this.cycles[cycle];
//     }
    
//     /**
//      * @returns integer 
//      */
//     this.getCyclesNumber = function(){
//         return this.cycles.length;
//     }

//     /**
//      * 
//      * @param {integer} cycle 
//      */
//     this.releaseCycleMemory = function(cycle){
//         delete this.cycles[cycle];
//     }

//     this.getInfoObject = function(){
//         return this.info;
//     }

//     this.createBaseCycle = function(data, loadFunction){
//         this.minX = Number.MAX_SAFE_INTEGER;
//         this.minY = Number.MAX_SAFE_INTEGER;
//         this.maxX = Number.MIN_SAFE_INTEGER;
//         this.maxY = Number.MIN_SAFE_INTEGER;

//         this.info = data[0].Info;
        
//         let map = data[0];
//         let entities = {all: {}, building: {}, road: {}, blockade:{}, human:{}};
//         for(let i = 0;i < map.Entities.length;i ++){
//             let entity = new Entity(map.Entities[i]);
//             let entityId = EntityHandler.getId(entity);
//             entities.all[entityId] = entity;
//             if(EntityHandler.isHuman(entity)) {
//                 entities.human[entityId] = entity;
//             }
//             else if(EntityHandler.isBlockade(entity)){
//                 entities.blockade[entityId] = entity;
//             }
//             else if(EntityHandler.isRoad(entity)){
//                 entities.road[entityId] = entity;
//             }
//             else{
//                 entities.building[entityId] = entity;
//             }
            
//             if(EntityHandler.isSurface(entity)){
//                 let entityVertices = EntityHandler.getVertices(entity);

//                 for(let j = 0;j < entityVertices.length;j = j + 2){
//                     let px = entityVertices[j];
//                     let py = entityVertices[j + 1];

//                     if(px < this.minX){
//                         this.minX = px;
//                     }
//                     if(py < this.minY){
//                         this.minY = py;
//                     }
//                     if(px > this.maxX){
//                         this.maxX = px;
//                     }
//                     if(py > this.maxY){
//                         this.maxY = py;
//                     }
//                 }
//             }
//         }

//         loadFunction("Map entities are loaded.");
//         this.cycles = [entities];
//     }

//     this.fillCycle = function(cycle){
//         // Deep clone last cycle
//         let newCycle = JSON.parse(JSON.stringify(
//             this.cycles[this.cycles.length - 1]
//         ));

//         let thisCycle = data[cycle];
//         for(let j in thisCycle.Entities){
//             let entityObject = thisCycle.Entities[j];
//             let id = EntityHandler.getId(entityObject);
//             let entity, entityId;

//             if(id in newCycle.all){
//                 Object.assign(newCycle.all[id], new Entity(entityObject));
//                 entity = newCycle.all[id];
//                 entityId = EntityHandler.getId(entity);
//             }
//             else{
//                 entity = new Entity(entityObject);
//                 entityId = EntityHandler.getId(entity);
//                 newCycle.all[entityId] = entity;
//             }

//             if(EntityHandler.isHuman(entity)) {
//                 newCycle.human[entityId] = entity;
//             }
//             else if(EntityHandler.isBlockade(entity)){
//                 newCycle.blockade[entityId] = entity;
//             }
//             else if(EntityHandler.isRoad(entity)) {
//                 newCycle.road[entityId] = entity;
//             }
//             else{
//                 newCycle.building[entityId] = entity;
//             }
//         }

//         this.cycles.push(newCycle);
//     }

//     this.fillCycles = function(data, loadFunction){
//         for(let cycle = 1;cycle < data.length;cycle ++){
//             this.fillCycle(cycle);
//         }
//         loadFunction("Game cycle entities are loaded.");
//     }


//     this.consturctor = function(data, loadFunction){
//         this.createBaseCycle(data, loadFunction);
//         this.fillCycles(data, loadFunction);
//     }
    
//     // Run
//     this.consturctor(data, loadFunction);
// }