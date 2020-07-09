function init() {
    canvas = document.querySelector("canvas");
    W = canvas.width = "500";
    H = canvas.height = "500";
    c = canvas.getContext("2d");
    cs = 36;
    score = 0;
    food = getFood();
    game_over = false;

    food_img = new Image();
    food_img.src = "apple.png";

    trophy = new Image();
    trophy.src = "cup.png";


    snake = {
        init_length: 5,
        color: "#95E67E",
        cells: [],
        direction: "right",

        createSnake: function() {
            for (var i = this.init_length - 1; i >= 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                });
            }
        },

        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                c.fillStyle = "#95E67E";
                c.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },

        updateSnake: function() {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                food = getFood();
                score = score + 5;
            } else {

                this.cells.pop();
            }

            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            } else if (this.direction == "left") {

                nextX = headX - 1;
                nextY = headY;

            } else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            } else {
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({
                x: nextX,
                y: nextY
            });

            //gameover condition
            var last_x = Math.round(W / cs);
            var last_y = Math.round(H / cs);

            if (headX < 0 || headY < 0 || headX > last_x || headY > last_y) {
                game_over = true;
            }
        }

    };
    snake.createSnake();

    //Add event listener
    function keyPressed(e) {
        if (e.key == "ArrowUp") {
            snake.direction = "up";
        } else if (e.key == "ArrowDown") {
            snake.direction = "down";
        } else if (e.key == "ArrowRight") {
            snake.direction = "right";
        } else {
            snake.direction = "left";
        }
    }
    document.addEventListener("keydown", keyPressed);
}

function draw() {
    c.clearRect(0, 0, W, H);
    snake.drawSnake();
    c.fillStyle = "#FD2A5E";
    c.drawImage(trophy, 1, 0, cs, cs);
    c.fillText(score, 16, 16);
    c.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);


}

function update() {
    snake.updateSnake();
}

function getFood() {
    var foodX = Math.round(Math.random() * (W - cs) / cs);
    var foodY = Math.round(Math.random() * (H - cs) / cs);

    var food = {
        x: foodX,
        y: foodY
    };
    return food;
}

function gameLoop() {
    if (game_over == true) {
        clearInterval(f);
        alert("Game Over" + "\n" + "Your Score is " + score);
    }
    draw();
    update();
}

init();
var f = setInterval(gameLoop, 100);