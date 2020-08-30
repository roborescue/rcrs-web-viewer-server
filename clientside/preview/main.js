"use strict";

// Constants
const CANVAS_ID = 'canv';

// Global Variables
var gameMaker;
var uiController;

// Modal
$("#loadingModal").modal('show');

// Canvas Size Set
let canvasContainer = $("#canvas-container");
let cbw = canvasContainer.width();
let cbh = canvasContainer.height()
let canvas = document.getElementById(CANVAS_ID);
canvas.width = cbw-5;
canvas.height = cbh-10;

// UI Setup
function UISetup(gameMaker){
    let info = gameMaker.getInfo();

    uiController = new UIController({
        teamName: info.TeamName,
        mapName: info.MapName,
        showCycle: (cycle) => {gameMaker.drawCycle(cycle);}, 
        lastCycle: gameMaker.getLastCycleNumber(),
        playingDelay: 500
    });
}

function setProgressBarSize(x,y=100){
    let valeur = 100 * x / y;
    $('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur); 
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }
async function loadFunction(text, progress=-1, end=false){
    console.log(text, progress, end);
    await sleep(1);
    document.getElementById("status").innerText = text;

    if(progress > 0){
        setProgressBarSize(progress);
    }

    if(end){
        $("#loadingModal").modal('hide');
        setTimeout(function(){ $("#loadingModal").modal('hide'); }, 1000);
    }
}

// var mainCommand = function(map, cycles){
//     loadFunction("Map file loaded ...",15);

//     let dataLoader = new DataLoader(map, cycles, loadFunction);
//     let canvasDrawer = new CanvasDrawer({
//         'id': 'canv',
//         'errorFunction': ()=>alert("Error!"),
//         'cartographer': true
//     });

//     gameMaker = new GameMaker(dataLoader, canvasDrawer, loadFunction);
//     UISetup(gameMaker);
// }

$(() => {
    const WORKER_COMMAND_LOADDATA = 'load_data';
    const WORKER_COMMAND_PROGRESSREPORT = 'progress_report';
    const WORKER_COMMAND_MAPBOUNDS = 'map_bounds';
    const WORKER_COMMAND_CYCLEDATA = 'cycle_data';
    const WORKER_COMMAND_INFO = 'info';

    let worker = new Worker('../src/worker.js');
    
    worker.onmessage = function(e){
        let command = e.data.command;
        switch(command){
            case WORKER_COMMAND_PROGRESSREPORT:
                loadFunction(e.data.text, e.data.percent);
                break;

            case WORKER_COMMAND_MAPBOUNDS:
                console.log("Map BOUNDSSSSSSS");
                gameMaker.setCorrectScaleAndTranslation(
                    e.data.minX,
                    e.data.minY,
                    e.data.maxX,
                    e.data.maxY,
                );
                break;
            
            case WORKER_COMMAND_CYCLEDATA:
                let historian = new Historian();
                historian.memo = e.data.data.memo;
                historian.keys = e.data.data.keys;

                gameMaker.loadCycle(
                    e.data.cycle, 
                    historian
                );
                if(e.data.cycle == 0){
                    uiController.setCycle(0);
                }
                if(e.data.cycle == 2){
                    loadFunction("Completed.", 100, true);
                }
                break;
            
            case WORKER_COMMAND_INFO:
                gameMaker.setInfo(e.data.info);
                UISetup(gameMaker);
                break;
        }
    }

    loadFunction("Downloading cycles data ...", 5);
    $.get("data/vc.jlog", function(data) {

        loadFunction("Map file downloaded ...",10);
        data = data.split("\n");
        data = data.filter(x => x.trim().length > 0);
        data = data.map(x => JSON.parse(x));
        // mainCommand(data);

        worker.postMessage({
            command: WORKER_COMMAND_LOADDATA,
            data: data
        });

        loadFunction("Map file loaded ...",15);
        
        // let dataLoader = new DataLoader(data, cycles, loadFunction);
        let canvasDrawer = new CanvasDrawer({
            'id': 'canv',
            'errorFunction': ()=>alert("Error!"),
            'cartographer': true
        });
    
        gameMaker = new GameMaker(canvasDrawer, loadFunction);
        // UISetup(gameMaker);
    });
})