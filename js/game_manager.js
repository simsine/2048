class GameManager{
    constructor(gridSize, startingtiles){
        this.gridSize       = gridSize
        this.gridContainer  = document.querySelector(".grid-container")

        this.startingtiles  = startingtiles

        this.setupGame()
        this.listen()
    }
    setupGame(){
        // Check if gameState localstorage key exists, 
        if (localStorage.getItem("gameState") !== null){
            this.gameState = JSON.parse(localStorage.getItem("gameState"))
        }else{
            this.gameState = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]
            localStorage.setItem("gameState", JSON.stringify(this.gameState))
        }

        this.updateGridContainer()
    }
    listen(){
        // Add keymap
        const map = {
            "ArrowUp": 0,    // Up
            "ArrowRight": 1, // Right
            "ArrowDown": 2,  // Down
            "ArrowLeft": 3,  // Left
            "k": 0,          // Vim up
            "l": 1,          // Vim right
            "j": 2,          // Vim down
            "h": 3,          // Vim left
            "w": 0,          // W
            "d": 1,          // D
            "s": 2,          // S
            "a": 3           // A
        };
        // Add key listener
        document.addEventListener("keyup", (event)=>{
            let mappedKey = map[event.key]
            if (mappedKey !== undefined) {
                event.preventDefault()
                this.makeMove(mappedKey)
            }
        })
    }
    makeMove(direction){
        // Make a change to the gamestate

        switch (direction) {
            case 0: // Up
                console.log("up")
                break
            case 1: // Right
                console.log("right")
                break
            case 2: // Down
                console.log("down")
                break
            case 3: // Left
                console.log("left")
                break
            default:
                break;
        }

        this.updateGridContainer()
    }
    updateGridContainer(){
        this.gridContainer.innerHTML = ""

        for (let row = 0; row < this.gridSize; row++) {
        for (let column = 0; column < this.gridSize; column++) {
                let tile = document.createElement("div")
                tile.id = row.toString() + "-" + column.toString() 
                tile.classList.add("tile")
                let tileNumber = this.gameState[row][column]
                if (tileNumber !== 0) {
                    tile.classList.add(tileNumber)
                    tile.innerHTML = tileNumber
                }
                this.gridContainer.appendChild(tile)
        }}
    }
    restart(){
        // Reset points, localstorage, grid, 
    }
    saveGamestate(){
        // Save gamState to localstorage
    }
}