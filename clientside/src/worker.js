module = {}

// Imports
importScripts('../src/Constants.js');
importScripts('../src/Entity.js');
importScripts('../src/EntityColor.js');
importScripts('../src/EntityHandler.js');
importScripts('../src/WorkerDataLoader.js');
importScripts('../node_modules/earcut/src/earcut.js');
// importScripts('../src/HistoryManager.js');
// importScripts('../src/Historian.js');
// importScripts('../src/PositionMaker.js');

// Just for PositionMaker, Historian and HistoryManager
importScripts('../preview/CanvasDrawer.js'); 


// Global Variables
var dataLoader = {};
var textures;

function wl(log){
    console.log("WorkerLog: " + log);
}

function loadFunction(text, progress=-1, end=false){
    progressReport(text, progress, end);
    wl(text);
}

function progressReport(text, percent = -1, end=false){
    postMessage({
        command: WORKER_COMMAND_PROGRESSREPORT,
        percent: percent,
        text: text,
        end: end
    });
}

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

function postCycleData(cycle, data){
    wl("cycle " + cycle + " sent");
    postMessage({
        command: WORKER_COMMAND_CYCLEDATA,
        cycle: cycle,
        data: data.getDataCopy()
    });
}

function postInfo(info){
    wl("map info sent");
    postMessage({
        command: WORKER_COMMAND_INFO,
        info: info
    });
}

onmessage = function(e){
    let command = e.data.command;
    switch(command){
        case WORKER_COMMAND_LOADDATA:
            textures = e.data.textures;
            dataLoader = new WorkerDataLoader(e.data.data, loadFunction);
            break;
    }

}
