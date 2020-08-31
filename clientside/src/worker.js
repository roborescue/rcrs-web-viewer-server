module = {}

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

const WORKER_COMMAND_LOADDATA = 'load_data';
const WORKER_COMMAND_PROGRESSREPORT = 'progress_report';
const WORKER_COMMAND_MAPBOUNDS = 'map_bounds';
const WORKER_COMMAND_CYCLEDATA = 'cycle_data';
const WORKER_COMMAND_INFO = 'info';

var dataLoader = {};

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
            dataLoader = new WorkerDataLoader(e.data.data, loadFunction);
            break;
    }

}
