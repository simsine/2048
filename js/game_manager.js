class GameManager{
    constructor(gridSize, /*, Actuator, StorageManager*/){
        this.gridSize       = gridSize
        this.InputManager   = new InputManager
        // this.Actuator       = new Actuator
        // this.StorageManager = new StorageManager

        this.startingtiles  = 2

        this.setupGame()
    }
    setupGame(){
        if (!localStorage.getItem("gameState")){
            localStorage.setItem("gameState", gameState)
        }

        var gameState = [
            [2,512,1024,32],
            [2,4,64,2048],
            [4,128,8,4096],
            [256,8192,2,16]
        ]
        const gridContainer = document.querySelector(".grid-container")

        for (let r = 0; r < this.gridSize; r++) {
        for (let c = 0; c < this.gridSize; c++) {
                let tile = document.createElement("div")
                tile.id = r.toString() + "-" + c.toString() 
                let number = gameState[r][c]
                if (number !== 0) {
                    tile.classList = `tile tile-${number}`
                    tile.innerHTML = number
                }else{
                    tile.classList = "tile"
                }
                gridContainer.appendChild(tile)
        }}
    }
}

class InputManager{
    constructor(){
        this.listen()
    }
    listen(){
        var map = {
            "ArrowUp": 0, // Up
            "ArrowRight": 1, // Right
            "ArrowDown": 2, // Down
            "ArrowLeft": 3, // Left
            "k": 0, // Vim up
            "l": 1, // Vim right
            "j": 2, // Vim down
            "h": 3, // Vim left
            "w": 0, // W
            "d": 1, // D
            "s": 2, // S
            "a": 3  // A
        };
        
        document.addEventListener("keyup", (event)=>{
            var mapped = map[event.key]
            if (mapped !== undefined) {
                event.preventDefault();
                console.log(mapped)
                // this.emit("move", mapped);
              }
        })
    }
}