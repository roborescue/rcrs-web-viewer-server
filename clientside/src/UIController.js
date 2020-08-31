function UIController(info){
    this.loadDataFromInfo = function(name, defaultValue) {
        return (name in this.info) ? this.info[name] : defaultValue;
    };

    this.start = async function(){
        if(this.isPlaying !== false){
            return;
        }

        this.isPlaying = setInterval(() => {
            let next = this.nextCycle();
            if(! next){
                this.pause();
            }
        }, this.playingDelay);

        this.reloadControllPanel();
    }

    this.pause = function(){
        if(this.isPlaying !== false){
            clearInterval(this.isPlaying);
        }

        this.isPlaying = false;
        this.reloadControllPanel();
    }

    this.reset = function(){
        this.pause();
        this.setCycle(0);
    }

    this.setLoadedCycle = function(cycle){
        if(this.lastLoadedCycle < cycle){
            this.lastLoadedCycle = cycle;
            this.reloadControllPanel();
        }
    }

    this.reloadControllPanel = function(){
        if(this.isPlaying !== false || this.currentCycle >= this.lastLoadedCycle){
            this.buttons.start.prop("disabled", true);
        }
        else{
            this.buttons.start.prop("disabled", false);
        }

        if(this.currentCycle == 0){
            this.buttons.back.prop("disabled", true);
        }
        else{
            this.buttons.back.prop("disabled", false);
        }

        if(this.currentCycle >= this.lastLoadedCycle){
            this.buttons.next.prop("disabled", true);
        }
        else{
            this.buttons.next.prop("disabled", false);
        }
    }

    this.setCycle = function(cycle){
        $("#cycle-number").html(cycle + " / " + this.lastCycle);

        this.currentCycle = cycle;
        this.showCycle(cycle);
        this.reloadControllPanel();
    }

    this.nextCycle = function(){
        if(this.currentCycle >= this.lastLoadedCycle){
            return false;
        }

        this.setCycle(this.currentCycle + 1);
        return true;
    }

    this.prevCycle = function(){
        if(this.currentCycle <= 0){
            return false;
        }

        this.setCycle(this.currentCycle - 1);
        return true;
    }

    // Buttons
    this.buttons = {
        next: $("#controll-next"),
        back: $("#controll-back"),
        start: $("#controll-start"),
        pause: $("#controll-pause"),
        reset: $("#controll-reset")
    };

    
    //
    // Setup
    //
    
    this.info = info;
    this.currentCycle = 0;
    this.isPlaying = false;
    this.lastLoadedCycle = -1;

    /**
     * @param {integer} cycle
     */
    let getScore = this.loadDataFromInfo("getScore", (cycle) => {return -1;});
    
    /**
     * @param {integer} cycle
     */
    this.showCycle = this.loadDataFromInfo("showCycle", (cycle) => {});
    
    /**
     * 
     */
    this.lastCycle = this.loadDataFromInfo("lastCycle", 0);
    
    /**
     * 
     */
    this.playingDelay = this.loadDataFromInfo("playingDelay", 1500);
    
    let teamName = this.loadDataFromInfo("teamName", "Unknown");
    let mapName = this.loadDataFromInfo("mapName", "Unknown");

    $("#team-name-field").html(teamName);
    $("#map-name-field").html(mapName);

    this.buttons.next.click(() => {
        uiController.nextCycle();
    });

    this.buttons.back.click(() => {
        uiController.prevCycle();
    });

    this.buttons.start.click(() => {
        uiController.start();
    });

    this.buttons.pause.click(() => {
        uiController.pause();
    });

    this.buttons.reset.click(() => {
        uiController.reset();
    });
}