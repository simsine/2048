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