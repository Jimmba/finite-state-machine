class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    

    constructor(config) {
        this.history=[];
        this.pointer=-1;
        this.config=config;
        this.state=config['initial']; //throws an exception
        this.changeState(this.state);
        //console.log("Constructor: history " + this.history + ", pointer = " + this.pointer);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.config["states"][state]){
            throw new Error;
        }else{
            this.state=state;
            if(this.pointer +1<this.history.length){
                //console.log("clean array from pointer " + this.pointer);
                this.history.splice(this.pointer+1);
                //console.log("cleaned history " + this.history);
            }
            this.history.push(state);
            this.pointer+=1; //pointer
            //console.log("    history after " + this.history);
            return state;
        }
        
    }
        
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(!this.config["states"][this.state]["transitions"][event]){
            throw new Error;
        }else{
            let state = this.config["states"][this.state]["transitions"][event];
            this.changeState(state);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState("normal");
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let allStates=[],
        states=[];
        for (let key in this.config["states"]){
            allStates.push(key);
        }
        if (event ==null){
            states=allStates;
        }else{
            for (let i=0; i<allStates.length; i++){
                for (let key in this.config["states"][allStates[i]]["transitions"]){
                    if (event== key){
                        states.push(allStates[i]);
                    }
                }
            }
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        //console.log("UNDO: history is " + this.history + "\n pointer is " + this.pointer);
        if (this.pointer<1){
            return false;
        }else{
            this.pointer-=1;
             let state=this.history[this.pointer];
             //console.log("UNDO: change to "+ state +"\n");
             this.state=state;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        //console.log("REDO: history is " + this.history + "\n pointer is " + this.pointer);
        //console.log("pointer " + this.pointer + " history " + this.history);
        if (this.pointer==this.history.length-1){
            return false;
        }else{
            this.pointer+=1;
             let state=this.history[this.pointer];
             //console.log("REDO: change to "+ state +"\n");
             this.state=state;
            return true;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history=[];
        this.pointer=-1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
