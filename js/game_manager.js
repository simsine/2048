class GameManager {
	constructor(gridSize, startingtiles) {
		// Initialize variables
		this.gridSize = gridSize
		this.startingTiles = startingtiles

		this.emptyGameState = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]

		// Initialize document refrences
		this.highScoreDisplay = document.querySelector(".highscore-display")
		this.scoreDisplay = document.querySelector(".score-display")
		this.gridContainer = document.querySelector(".grid-container")

		//Initialize methods
		this.setupNewGame()
		this.listen()
	}
	setupNewGame() {
		// Check if gameState localstorage key exists,
		if ("gameState" in localStorage) {
			this.gameState = JSON.parse(localStorage.getItem("gameState"))
		} else {
			// If not set to initial gameState
			this.gameState = this.emptyGameState
			localStorage.setItem("gameState", JSON.stringify(this.gameState))
		}
		this.updateGridContainer()

		for (let i = 0; i < this.startingTiles; i++) {
			this.addRandomTile()
		}
		this.updateGridContainer()
		// this.updateScoreDisplay()
	}
	listen() {
		// Add keymap
		const map = {
			ArrowUp: "up", // Up
			ArrowRight: "right", // Right
			ArrowDown: "down", // Down
			ArrowLeft: "left", // Left
			k: "up", // Vim up
			l: "right", // Vim right
			j: "down", // Vim down
			h: "left", // Vim left
			w: "up", // W
			d: "right", // D
			s: "down", // S
			a: "left", // A

			r: "reset", // R
		}
		// Add key listener
		document.addEventListener("keyup", (event) => {
			let mappedKey = map[event.key]
			if (mappedKey !== undefined) {
				event.preventDefault()
				if (["up", "right", "down", "left"].includes(mappedKey)) {
					this.makeMove(mappedKey)
				} else if (mappedKey == "reset") {
					this.restart()
				}
			}
		})
	}
	makeMove(direction) {
		switch (
			direction //TODO: Optimize
		) {
			case "up":
				for (let columnNumber = 0; columnNumber < this.gridSize; columnNumber++) {
					let array = this.gameState.map((value) => value[columnNumber])
					array = slideArray(array, this.gridSize)
					for (let i = 0; i < array.length; i++) {
						this.gameState[i][columnNumber] = array[i]
					}
				}
				break
			case "right":
				for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
					let array = this.gameState[rowNumber]
					array.reverse()
					array = slideArray(array, this.gridSize)
					array.reverse()
					this.gameState[rowNumber] = array
				}
				break
			case "down":
				for (let columnNumber = 0; columnNumber < this.gridSize; columnNumber++) {
					let array = this.gameState.map((value) => value[columnNumber])
					array.reverse()
					array = slideArray(array, this.gridSize)
					array.reverse()
					for (let i = 0; i < array.length; i++) {
						this.gameState[i][columnNumber] = array[i]
					}
				}
				break
			case "left":
				for (let rowNumber = 0; rowNumber < this.gridSize; rowNumber++) {
					let array = this.gameState[rowNumber]
					array = slideArray(array, this.gridSize)
					this.gameState[rowNumber] = array
				}
				break
			default:
				break
		}
		//TODO Don't add tile if move is not valid
		//TODO invalid move example: [0][3] = 4 and [1][3] = 2 and direction = 0
		this.addRandomTile()

		this.updateGridContainer()
		//this.updateScoreDisplay()
		this.saveGame()

		// makeMove functions
		function slideArray(array, gridSize) {
			array = removeZeroes(array)
			for (let i = 0; i < array.length - 1; i++) {
				if (array[i] == array[i + 1]) {
					array[i] *= 2
					array[i + 1] = 0
				}
			}
			array = removeZeroes(array)
			while (array.length < gridSize) {
				array.push(0)
			}
			return array
		}
		function removeZeroes(array) {
			return array.filter((num) => num != 0)
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
	addRandomTile() {
		let emptyTiles = getAllEmptytiles(this.gameState, this.gridSize)
		let tileCoords = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]

		let randomTileNumber = Math.random() < 0.9 ? 2 : 4

		this.gameState[tileCoords[0]][tileCoords[1]] = randomTileNumber

		function getAllEmptytiles(gameState, gridSize) {
			let tiles = []
			for (let row = 0; row < gridSize; row++) {
				for (let column = 0; column < gridSize; column++) {
					if (gameState[row][column] == 0) {
						tiles.push([row, column])
					}
				}
			}
			return tiles
		}
	}
	updateGridContainer() {
		this.gridContainer.innerHTML = ""
		for (let row = 0; row < this.gridSize; row++) {
			for (let column = 0; column < this.gridSize; column++) {
				let tile = document.createElement("div")
				tile.id = row.toString() + "-" + column.toString()
				tile.classList.add("tile")
				let tileNumber = this.gameState[row][column]
				if (tileNumber !== 0) {
					tile.classList.add("tile-" + tileNumber.toString())
					tile.innerHTML = tileNumber
				}
				this.gridContainer.appendChild(tile)
			}
		}
	}
	updateScoreDisplay() {
		//TODO: Add scores in general
	}
	restart() {
		//TODO: Reset points, localstorage, grid,
		this.gameState = this.emptyGameState
		localStorage.setItem("gameState", JSON.stringify(this.gameState))

		this.setupNewGame()
	}
	saveGame() {
		//TODO: Save gameState to localstorage
		localStorage.setItem("gameState", JSON.stringify(this.gameState))
	}
}
