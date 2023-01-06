class GameManager{
    constructor(gridSize, startingtiles){
        // Initialize variables
        this.gridSize       = gridSize
        this.startingTiles  = startingtiles

        // Initialize document refrences
        this.highScoreDisplay = document.querySelector(".highscore-display")
        this.scoreDisplay     = document.querySelector(".score-display")
        this.gridContainer    = document.querySelector(".grid-container")

        //Initialize methods
        this.setupGame()
        this.listen()
    }
    setupGame(){
        // Check if gameState localstorage key exists,
        if ("gameState" in localStorage){
            this.gameState = JSON.parse(localStorage.getItem("gameState"))
        }else{ // If not set to initial gameState
            this.gameState = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]
            localStorage.setItem("gameState", JSON.stringify(this.gameState))
        }
        
        for (let i = 0; i < this.startingTiles; i++) {
            this.addRandomTile()
        }
        this.updateGridContainer()
        this.updateScoreDisplay() //TODO
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
            "a": 3,          // A

            "r": "reset"
        };
        // Add key listener
        document.addEventListener("keyup", (event)=>{
            let mappedKey = map[event.key]
            if (mappedKey !== undefined) {
                event.preventDefault()
                if (mappedKey in [0,1,2,3]) { //? ew
                    this.makeMove(mappedKey)
                }else if (mappedKey == "reset"){
                    this.restart()
                }
            }
        })
    }
    makeMove(direction){
        // Make a change to the gamestate
        //TODO: Make equal
        switch (direction) {
            case 0: // Up
                for (let columnNumber = 0; columnNumber < this.gridSize; columnNumber++) {
                    let array = this.gameState.map(value => value[columnNumber])
                    array = slideArray(array, this.gridSize)
                    for (let i = 0; i < array.length; i++) {
                        this.gameState[i][columnNumber] = array[i]
                    }
                }
                break
                case 1: // Right
                    for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
                        let array = this.gameState[rowNumber]
                        array.reverse()
                        array = slideArray(array, this.gridSize)
                        array.reverse()
                        this.gameState[rowNumber] = array
                    }
                break
                case 2: // Down
                    for (let columnNumber = 0; columnNumber < this.gridSize; columnNumber++) {
                        let array = this.gameState.map(value => value[columnNumber])
                        array.reverse()
                        array = slideArray(array, this.gridSize)
                        array.reverse()
                        for (let i = 0; i < array.length; i++) {
                            this.gameState[i][columnNumber] = array[i]
                        }
                    }
                break
                case 3: // Left
                    for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
                        let array = this.gameState[rowNumber]
                        array = slideArray(array, this.gridSize)
                        this.gameState[rowNumber] = array
                    }
                break
                
                default:
                    break;
        }
    
        this.addRandomTile()

        this.updateGridContainer()
        this.updateScoreDisplay() //TODO
        this.saveGame()
        
        // makeMove functions
        function slideArray(array, gridSize) {
            array = removeZeroes(array)
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i]    == array[i+1]){
                    array[i]    *= 2
                    array[i+1]  = 0
                    // this.score += array[i]
                }
            }
            array = removeZeroes(array)
            while (array.length < gridSize){
                array.push(0)
            }
            return array
        }
        function removeZeroes(row) {
            return row.filter(num => num != 0)
            
            
        }
        //? Unnecessary
        // function getRow(rowNumber){
        //     let row = []
        //     for (let columnNumber = 0; columnNumber < this.gridSize; columnNumber++) {
        //         row.push(this.gameState[rowNumber][columnNumber])
        //     }
        //     return row
        // }
    }
    addRandomTile(){
        let emptyTiles = getAllEmptytiles(this.gameState, this.gridSize)
        let tileCoords = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
        if (Math.random() < 0.5){
            let tileNum = 2
        }else{
            let tileNum = 4
        }
        this.gameState[tileCoords[0]][tileCoords[1]] = tileNum

        function getAllEmptytiles(gameState, gridSize) {
            let tiles = []
            for (let row = 0; row < gridSize; row++) {
            for (let column = 0; column < gridSize; column++) {
                if (gameState[row][column] == 0){
                    tiles.push([row,column])
                }
            }}
            return tiles
        }
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
                    tile.classList.add("tile-"+ tileNumber.toString())
                    tile.innerHTML = tileNumber
                }
            this.gridContainer.appendChild(tile)
        }}
    }
    updateScoreDisplay(){
        //TODO: Add scores in general
    }
    restart(){
        //TODO: Reset points, localstorage, grid, 
        this.gameState = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
        localStorage.setItem("gameState", JSON.stringify(this.gameState))
        this.updateGridContainer()
        this.updateScoreDisplay()
    }
    saveGame(){
        //TODO: Save gameState to localstorage
        localStorage.setItem("gameState", JSON.stringify(this.gameState))
    }
}