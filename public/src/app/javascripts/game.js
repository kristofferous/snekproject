function startGame() {
    Game = new GameConstructor(10, 10, 100);
    Game.start();
}
class GameConstructor {
    hasLanded = false;
    constructor(gridY, gridX, _gridAreaSize = 100) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.snek = [];
        this.direction = undefined
        this._gridAreaSize = _gridAreaSize;
    }
    start() {
        this.hasLanded = false;
        document.getElementById("landingView").style.display = "none";
        this.#loadAssets();
    }
    land() {
        this.#unloadAssets();
        document.getElementById("landingView").style.display = "block";
        this.hasLanded = true;
        snakeTimer(true);
        this.snek.splice(0, this.snek.length)
        this.direction = undefined;
    }
    #loadAssets() {
        document.getElementById("gameview").style.backgroundColor = "#222222";
        document.getElementById("gameview").style.display = "block"
        const gg = document.createElement("div");
        gg.id = "gameGrid";
        this.fruit()
        document.getElementById("gameview").appendChild(gg)
        for (let i = 0; i < this.gridY; i++) {
            const iColumn = document.createElement("div");
            iColumn.className = "iColumn"
            for (let o = 0; o < this.gridX; o++) {
                const iGrid = document.createElement("div");
                iGrid.id = `gameViewGrid${o}`;
                iGrid.className =`gameViewGrid x${i}-y${o}`;
                iColumn.appendChild(iGrid);
            }
            gg.appendChild(iColumn)
        }
    }
    #unloadAssets() {
        document.getElementById("gameGrid").remove();
        document.getElementById("gameview").style.display = "none"
    }
    fruit(pos = Math.floor(Math.random() * (this.gridY * this.gridX))) {
        console.log(pos)
    }
}
let Game;
document.onkeydown = (event) => {
    if (!(event.key === "ArrowUp" || event.key === "w" ||
        event.key === "ArrowRight" || event.key === "d" ||
        event.key === "ArrowDown" || event.key === "s" ||
        event.key === "ArrowLeft" || event.key === "a")) return;
    Game.direction = event.key;
    if (!Game.snek.length) {
        snakeTimer();
        if (event.key === "ArrowUp" || event.key === "w") Game.snek.push("x4-y3");
        else if (event.key === "ArrowRight" || event.key === "d") Game.snek.push("x5-y4");
        else if (event.key === "ArrowDown" || event.key === "s") Game.snek.push("x4-y5")
        else if (event.key === "ArrowLeft" || event.key === "a") Game.snek.push("x3-y4")
        console.log(Game.snek)
        for (let s = 0; s < Game.snek.length; s++) {
            console.log("foreachPos")
            for (let i = 0; i < document.querySelectorAll(`.${Game.snek[s]}`).length; i++) {
                document.querySelectorAll(`.${Game.snek[s]}`)[i].style.backgroundColor = '#7bff4e';
                document.querySelectorAll(`.${Game.snek[s]}`)[i].style.backgroundImage = 'url("https://imgur.com/a/CB2ytqe")';
                console.log(i)
            }
        }
    }

}
function snakeTimer(quit = false) {
    if (Game.hasLanded === true || quit === true) {
        clearTimeout()
    }
    function moveSnek(x, y) {
        for (let i = 0; i < Game.snek.length; i++) {
            // if (snek[i] === pos) {
            let newY = "y" + (parseInt(Game.snek[i].split('-')[1][1]) + parseInt(y));
            let newX = "x" + (parseInt(Game.snek[i].split('-')[0][1]) + parseInt(x));
            if (parseInt(Game.snek[i].split('-')[1][1]) > 8 || parseInt(Game.snek[i].split('-')[1][1]) < 1 || parseInt(Game.snek[i].split('-')[0][1]) + parseInt(x) > 9 || parseInt(Game.snek[i].split('-')[0][1]) + parseInt(x) < 0) {
                Game.land();
            }
                // window.close();
            console.log(newX + "-" + newY)
            for (let s = 0; s < Game.snek.length; s++) {
                console.log("foreachPos")
                for (let i = 0; i < document.querySelectorAll(`.${Game.snek[s]}`).length; i++) {
                    document.querySelectorAll(`.${Game.snek[s]}`)[i].style.backgroundColor = "transparent";
                    console.log(i)
                }
            }
            Game.snek[i] = newX + "-" + newY;
            for (let s = 0; s < Game.snek.length; s++) {
                console.log("foreachPos")
                for (let i = 0; i < document.querySelectorAll(`.${Game.snek[s]}`).length; i++) {
                    document.querySelectorAll(`.${Game.snek[s]}`)[i].style.backgroundColor = "transparent";
                    console.log(i)
                }
            }
            // }
        }
    }

    if (Game.direction === "ArrowUp" || Game.direction === "w") moveSnek(0, -1);
    else if (Game.direction === "ArrowRight" || Game.direction === "d") moveSnek(1, 0);
    else if (Game.direction === "ArrowDown" || Game.direction === "s") moveSnek(0, 1);
    else if (Game.direction === "ArrowLeft" || Game.direction === "a") moveSnek(-1, 0);
    console.log(Game.snek)
    for (let s = 0; s < Game.snek.length; s++) {
        console.log("foreachPos");
        for (let i = 0; i < document.querySelectorAll(`.${Game.snek[s]}`).length; i++) {
            document.querySelectorAll(`.${Game.snek[s]}`)[i].style.backgroundColor = '#7bff4e';
            document.querySelectorAll(`.${Game.snek[s]}`)[i].style.backgroundImage = 'url("https://imgur.com/a/CB2ytqe.png")';
            console.log(i)
        }
    }

    setTimeout(snakeTimer, 1000);
}
