class GameManager{
    constructor(gridSize, startingtiles){
        // Initialize variables
        this.gridSize       = gridSize
        this.startingtiles  = startingtiles

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

        //! temp
        this.gameState = [
            [2,2,2,2],
            [2,2,2,2],
            [2,2,2,2],
            [2,2,2,2]
        ]

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
                for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
                    let row = this.gameState[rowNumber]
                    row.reverse()
                    row = this.slideRow(row)
                    row.reverse()
                    this.gameState[rowNumber] = row
                }
                break
            case 2: // Down
                console.log("down")
                break
            case 3: // Left
                console.log("left")
                for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
                    let row = this.gameState[rowNumber]
                    row = this.slideRow(row)
                    this.gameState[rowNumber] = row
                }
                break
            default:
                break;
        }

        this.updateGridContainer()
        this.updateScoreDisplay() //TODO
    }
    slideRow(row) {
        row = this.removeZeroes(row)
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] == row[i+1]){
                row[i]  *= 2
                row[i+1] = 0
                // score += row
            }
        }
        row = this.removeZeroes(row)
        while (row.length < this.gridSize){
            row.push(0)
        }
        return row
    }
    removeZeroes(row) {
        return row.filter(num => num != 0)
    }
    //? Unnecessary
    // getRow(rowNumber){
    //     let row = []
    //     for (let columnNumber = 0; columnNumber < this.gridSize; columnNumber++) {
    //         row.push(this.gameState[rowNumber][columnNumber])
    //     }
    //     return row
    // }

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
    }
    saveGamestate(){
        //TODO: Save gameState to localstorage
    }
}