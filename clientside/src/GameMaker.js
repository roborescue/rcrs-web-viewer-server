"use strict";

/**
 * 
 * @param {Object} canvasDrawer
 * @param {function} loadFunction
 */
function GameMaker(canvasDrawer, loadFunction=()=>{}){

    /**
     * 
     * @param {integer} cycle 
     */
    this.drawCycle = function(cycle = this.currentCycle){
        this.canvasDrawer.drawer.historyManager.historian = this.histories[cycle];
        this.canvasDrawer.drawer.redraw();
    }

    this.getLastCycleNumber = function(){
        return this.getInfo().lastCycle;
    }

    /**
     * 
     */
    this.setCorrectScaleAndTranslation = function(minX, minY, maxX, maxY){

        let x = Math.abs(maxX - minX);
        let y = Math.abs(maxY - minY);

        let canvas = this.canvasDrawer.drawer.gl.canvas;
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        let xFitScale = canvasWidth / x;
        let yFitScale = canvasHeight / y;
        let scale = xFitScale < yFitScale ? xFitScale : yFitScale;
        scale = scale * 0.9;
        
        this.canvasDrawer.drawer.updateScale(scale);
        
        let newX = scale * x;
        let newY = scale * y;
        let xTranslation = (canvasWidth - newX) / 2;
        let yTranslation = (canvasHeight - newY) / 2;

        this.canvasDrawer.drawer.updateTranslation(xTranslation, yTranslation + y * scale);
    }

    this.loadCycle = function(cycle, data){
        this.histories[cycle] = data;
    }

    this.getInfo = function(){
        return this.infoObject;
    }

    this.setInfo = function(info){
        this.infoObject = info;
        this.allCycles = info.lastCycle;
    }

    /**
     * 
     * @param {Object} dataLoader 
     * @param {Object} canvasDrawer 
     */
    this.constructor = function(canvasDrawer, loadFunction){
        this.histories = [];
        this.currentCycle = 0;
        this.canvasDrawer = canvasDrawer;
        this.allCycles = 0; //TODO
        this.infoObject = {};
        this.positionMaker = new PositionMaker();

        loadFunction("Loading game entities ...", 50, false);
    }
    
    // calc
    this.constructor(canvasDrawer, loadFunction);
}