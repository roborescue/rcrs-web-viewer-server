
module = {};

importScripts('../node_modules/earcut/src/earcut.js');
importScripts('../preview/CanvasDrawer.js'); 


// Global Variables
var dataLoader = {};
var textures;


/**
 * Submit log for Worker.
 * 
 * @param {string} log log content
 */
function wl(log){
    console.log("WorkerLog: " + log);
}

/**
 * Load function.
 * 
 * @param {string} text status content
 * @param {integer} progress percentage of progress
 * @param {boolean} end is end of progress
 */
function loadFunction(text, progress=-1, end=false){
    progressReport(text, progress, end);
    wl(text);
}

/**
 * Progress report.
 * 
 * @param {string} text status content
 * @param {integer} progress percentage of progress
 * @param {boolean} end is end of progress
 */
function progressReport(text, percent = -1, end=false){
    postMessage({
        command: WORKER_COMMAND_PROGRESSREPORT,
        percent: percent,
        text: text,
        end: end
    });
}

/**
 * Post map bounds.
 * 
 * @param {number} minX Minimum X
 * @param {number} minY Minimum Y
 * @param {number} maxX Maximum X
 * @param {number} maxY Maximum Y
 */
function postMapbounds(minX, minY, maxX, maxY){
    wl("map bounds sent");
    postMessage({
        command: WORKER_COMMAND_MAPBOUNDS,
        minX: minX,
        minY: minY,
        maxX: maxX, 
        maxY: maxY
    });
}

/**
 * Post cycle data object.
 * 
 * @param {integer} cycle cycle number
 * @param {Object} data data object
 */
function postCycleData(cycle, data, info={}){
    wl("cycle " + cycle + " sent");
    postMessage({
        command: WORKER_COMMAND_CYCLEDATA,
        cycle: cycle,
        data: data.getDataCopy(),
        info: info
    });
}

/**
 * Post cycle data object.
 * 
 * @param {integer} cycle cycle number
 * @param {Object} data data object
 */
function postBaseData(data){
    wl("Base data sent");
    postMessage({
        command: WORKER_COMMAND_BASEDATA,
        data: data.getDataCopy()
    });
}

/**
 * Post info object.
 * 
 * @param {Object} info info object
 */
function postInfo(info){
    wl("map info sent");
    postMessage({
        command: WORKER_COMMAND_INFO,
        info: info
    });
}

/**
 * handle incoming massage
 * 
 * @param {Object} e massage object
 */
function handleIncomingMassage(e){
    let command = e.data.command;
    switch(command){
        case WORKER_COMMAND_LOADDATA:
            textures = e.data.textures;
            dataLoader = new WorkerDataLoader(e.data.data, loadFunction);
            break;
    }
}

onmessage = (e) => handleIncomingMassage(e);
