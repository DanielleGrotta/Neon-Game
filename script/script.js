
//---- OCORRE DEPOIS QUE O HTML ESTIVER PRONTO ----//
$(document).ready( function() {

//---- EVENTO DE CLICK COM PREVENT_DEFAULT QUE IMPEDE A PAGINA DE RESETAR ----//
    $('#SecretBtn').on("click", function(e){
        e.preventDefault();
    var sites = [
        'https://quickdraw.withgoogle.com',
        'https://checkboxrace.com',
        'http://www.koalastothemax.com',
        'https://jacksonpollock.org',
        'https://pointerpointer.com',
        'https://matias.ma/nsfw/'
    ];
    randomSite();
    
    //---- CRIO A FUNCAO PARA RANDOMIZAR OS SITES ----//
    function randomSite() {
        var i = parseInt(Math.random() * sites.length);
        location.href = sites[i];
    }

    });
    $('#periquitop').on("click", function(e){
        e.preventDefault();
        var coment1 = document.getElementById("coment1");
        var coment2 = document.getElementById("coment2");

        if (coment1.style.display =="none"){
            coment1.style.display = "block";
            coment2.style.display = "none";
        }else {
            coment1.style.display = "none";
            coment2.style.display = "block";
        }
        
    });

//---- EVENTO DE CLICK QUE MOSTRA OS CREDITOS ----//
    $('#CreditsBtn').on("click", function(){
        $('#box').hide();
        $('.credits').show();
    });

    $('#saidaPong').on("click", function(){
        document.getElementById("instructionsPong").style.display = "none";
        document.getElementById("StartPong").style.display = "none";
        document.getElementById("saidaPong").style.display = "none";
        document.getElementById("box").style.display = "block";
    })

    $('#saidaSnake').on("click", function(){
        document.getElementById("instructionsSnake").style.display = "none";
        document.getElementById("StartSnake").style.display = "none";
        document.getElementById("saidaSnake").style.display = "none";
        document.getElementById("box").style.display = "block";
    })

 //---- EVENTO DE CLICK FAZ MEU MENU SUMIR E APARECER SÓ O JOGO-----------//
    $('#startBtn').on("click", function(){

//---- USO UM HIDE/SHOW E UM DISPLAY_NONE/BLOCK PARA SUMIR E APARECER -----------//
        document.getElementById("box").style.display = "none";
        document.getElementById("instructionsSnake").style.display = "block";
        document.getElementById("StartSnake").style.display = "block";
        document.getElementById("saidaSnake").style.display = "block";
    });
        $('#StartSnake').on("click", function(){
            document.getElementById("instructionsSnake").style.display = "none";
            document.getElementById("StartSnake").style.display = "none";
            document.getElementById("saidaSnake").style.display = "none";
            document.getElementById("snakeCanvas").style.display = "block";

    //---- CRIO MINHAS VARIAVEIS COM DIMENSOES QUE QUERO -----------//
            var
            COLS = 26,
            ROWS = 16,
            EMPTY = 0,
            SNAKE = 1,
            FRUIT = 2,
            LEFT  = 0,
            UP    = 1,
            RIGHT = 2,
            DOWN  = 3,
            KEY_LEFT  = 37,
            KEY_UP    = 38,
            KEY_RIGHT = 39,
            KEY_DOWN  = 40,
            canvas,   
            ctx,   
            keystate, 
            frames,   
            score;   


    //---- CRIO MINHA AREA -----------//
            grid = {
                
                width: null,  
                height: null, 
                _grid: null,  
                
                init: function(d, c, r) {
                this.width = c;
                this.height = r;
                
                this._grid = [];
                for (var x=0; x < c; x++) {
                this._grid.push([]);
                for (var y=0; y < r; y++) {
                this._grid[x].push(d);
                }
                }
                },
                
                set: function(val, x, y) {
                this._grid[x][y] = val;
                },
                
                get: function(x, y) {
                return this._grid[x][y];
                }
            }

    //---- CRIO A COBRA -----------//
            snake = {
                
                direction: null, 
                last: null, 
                _queue: null, 
                
                init: function(d, x, y) {
                this.direction = d;
                
                this._queue = [];
                this.insert(x, y);
                },
                
                insert: function(x, y) {
                
                this._queue.unshift({x:x, y:y});
                this.last = this._queue[0];
                },
                
                remove: function() {
                
                return this._queue.pop();
                }
            };

    //---- CRIO A COMIDINHA USANDO MESMO METODO DE RANDOM DOS SITES -----------//
            function setFood() {
                var empty = [];
                
                for (var x=0; x < grid.width; x++) {
                for (var y=0; y < grid.height; y++) {
                if (grid.get(x, y) === EMPTY) {
                empty.push({x:x, y:y});
                }
                }
                }
                
                var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
                grid.set(FRUIT, randpos.x, randpos.y);
            }

    //---- AGORA CRIANDO O JOGO DENTRO DA TAG CANVAS JA COM OS BOTOES DE MOVIMENTO -----------//
            function main() {
                
                canvas = document.getElementById("snakeCanvas");
                canvas.width = COLS*10;
                canvas.height = ROWS*10;
                ctx = canvas.getContext("2d");
                
                document.body.appendChild(canvas);
                
                ctx.font = "12px Megrim";
                
                frames = 0;
                keystate = {};
                
                document.addEventListener("keydown", function(evt) {
                keystate[evt.keyCode] = true;
                });
                document.addEventListener("keyup", function(evt) {
                delete keystate[evt.keyCode];
                });
                
                init();
                loop();
            }

    //---- AUMENTO SCORE E ATIVO FUNCAO DE COLOCAR COMIDA -----------//
            function init() {
                score = 0;
                
                grid.init(EMPTY, COLS, ROWS);
                
                var sp = {x:Math.floor(COLS/2), y:ROWS-1};
                snake.init(UP, sp.x, sp.y);
                grid.set(SNAKE, sp.x, sp.y);
                
                setFood();
            }

    //---- DESENHANDO O MOVIMENTO CONTINUO -----------//
            function loop() {
                update();
                draw();
                
                window.requestAnimationFrame(loop, canvas);
            }

    //---- DANDO CONDIÇÕES PARA OS MOVIMENTOS DE ACORDO QUE ELA NUNCA ANDE ATRAS, MORRA QUANDO SE ATROPELA, AUMENTE A CAUDA E COLOCA COMIDA -----------//
            function update() {
                frames++;
                
                if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
                snake.direction = LEFT;
                }
                if (keystate[KEY_UP] && snake.direction !== DOWN) {
                snake.direction = UP;
                }
                if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
                snake.direction = RIGHT;
                }
                if (keystate[KEY_DOWN] && snake.direction !== UP) {
                snake.direction = DOWN;
                }
                
                if (frames%7 === 0) {
                
                var nx = snake.last.x;
                var ny = snake.last.y;
                
                switch (snake.direction) {
                case LEFT:
                nx--;
                break;
                case UP:
                ny--;
                break;
                case RIGHT:
                nx++;
                break;
                case DOWN:
                ny++;
                break;
                }
                
                if (0 > nx || nx > grid.width-1  ||
                0 > ny || ny > grid.height-1 ||
                grid.get(nx, ny) === SNAKE
                ) {
                    alert("Game Over!");
                        location.reload();
                }
                
                if (grid.get(nx, ny) === FRUIT) {
                
                score++;
                setFood();
                } else {
                
                var tail = snake.remove();
                grid.set(EMPTY, tail.x, tail.y);
                }
                
                grid.set(SNAKE, nx, ny);
                snake.insert(nx, ny);
                }
            }

    //---- DOU FORMATO E COR PARA OS OBJETOS DEPOIS CHAMO A MAIN QUE FAZ O JOGO -----------//
            function draw() {
                
                var tw = canvas.width/grid.width;
                var th = canvas.height/grid.height;
                
                for (var x=0; x < grid.width; x++) {
                for (var y=0; y < grid.height; y++) {
                
                switch (grid.get(x, y)) {
                case EMPTY:
                ctx.fillStyle = "#00cfc5d4";
                break;
                case SNAKE:
                ctx.fillStyle = "#333";
                break;
                case FRUIT:
                ctx.fillStyle = "#ad0068";
                break;
                }
                ctx.fillRect(x*tw, y*th, tw, th);
                }
                }
                
                ctx.fillStyle = "#ad0068";
                ctx.fillText("SCORE: " + score, 10, canvas.height-10);
            }

            main();
        });
 
//---- EVENTO DE CLICK NOVAMENTE QUE TIRA O MENU E MOSTRA O JOGO, CRIA VARIAVEIS,COMANDOS ----//
    $('#PongBtn').on("click", function(){
        document.getElementById("box").style.display = "none";
        document.getElementById("instructionsPong").style.display = "block";
        document.getElementById("StartPong").style.display = "block";
        document.getElementById("saidaPong").style.display = "block";
    });
        $('#StartPong').on("click", function(){
            document.getElementById("instructionsPong").style.display = "none";
            document.getElementById("StartPong").style.display = "none";
            document.getElementById("saidaPong").style.display = "none";
            document.getElementById("myCanvas").style.display = "block";

            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            var ballRadius = 10;
            var x = canvas.width/2;
            var y = canvas.height-30;
            var dx = 2;
            var dy = -2;
            var paddleHeight = 10;
            var paddleWidth = 75;
            var paddleX = (canvas.width-paddleWidth)/2;
            var rightPressed = false;
            var leftPressed = false;
            var brickRowCount = 10;
            var brickColumnCount = 2;
            var brickWidth = 35;
            var brickHeight = 20;
            var brickPadding = 10;
            var brickOffsetTop = 30;
            var brickOffsetLeft = 30;
            var score = 0;
            var lives = 3;

            var bricks = [];
            for(var c=0; c<brickColumnCount; c++) {
                bricks[c] = [];
                for(var r=0; r<brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
            
            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            document.addEventListener("mousemove", mouseMoveHandler, false);

        //---- ESSE JOGO SÓ PODE FUNCIONAR PARA OS LADOS ENTAO PASSO TRUE/FALSE DE VALIDAÇÃO ----//
            function keyDownHandler(e) {
                if(e.code  == "ArrowRight") {
                    rightPressed = true;
                }
                else if(e.code == 'ArrowLeft') {
                    leftPressed = true;
                }
            }
            function keyUpHandler(e) {
                if(e.code == 'ArrowRight') {
                    rightPressed = false;
                }
                else if(e.code == 'ArrowLeft') {
                    leftPressed = false;
                }
            }

        //---- CONTROLE DE MOUSE QUE FAZ O PADDLE COM BASE ONDE EU PASSO O MOUSE E SÓ DENTRO DA AREA DO JOGO----//
            function mouseMoveHandler(e) {
                var relativeX = e.clientX - canvas.offsetLeft;
                if(relativeX > 0 && relativeX < canvas.width) {
                    paddleX = relativeX - paddleWidth/2;
                }
            }

        //---- FUNÇÃO QUE DETECTA QUANDO A BOLA BATE NO TIJOLINHO ----//
            function collisionDetection() {
                for(var c=0; c<brickColumnCount; c++) {
                    for(var r=0; r<brickRowCount; r++) {
                        var b = bricks[c][r];
                        if(b.status == 1) {
                            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                                dy = -dy;
                                b.status = 0;
                                score++;
                                if(score == brickRowCount*brickColumnCount) {
                                    alert("GANHOU, XD!");
                                    document.location.reload();
                                }
                            }
                        }
                    }
                }
            }

        //---- FUNÇÃO QUE DESENHA A BOLA,COM COR E DIMENSOES----//
            function drawBall() {
                ctx.beginPath();
                ctx.arc(x, y, ballRadius, 0, Math.PI*2);
                ctx.fillStyle = "#c63b7a";
                ctx.fill();
                ctx.closePath();
            }

        //---- DESENHA O PADDLE ----//
            function drawPaddle() {
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
                ctx.fillStyle = "#c63b7a";
                ctx.fill();
                ctx.closePath();
            }

        //---- DESENHA OS TIJOLOS ----//
            function drawBricks() {
                for(var c=0; c<brickColumnCount; c++) {
                    for(var r=0; r<brickRowCount; r++) {
                        if(bricks[c][r].status == 1) {
                            var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                            var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                            bricks[c][r].x = brickX;
                            bricks[c][r].y = brickY;
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = "#3200219c";
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }

        //---- ESCREVO O SCORE LATERAL COM MINHA FONTE PERSONALIZADA ----//
            function drawScore() {
                ctx.font = "16px bold Megrim";
                ctx.fillStyle = "#c63b7a";
                ctx.fillText("Score: "+score, 8, 20);
            }

        //---- ESCREVO AS VIDAS ----//
            function drawLives() {
                ctx.font = "16px bold Megrim";
                ctx.fillStyle = "#c63b7a";
                ctx.fillText("Lives: "+lives, canvas.width-65, 20);
            }

        //---- FUNCAO MAIN QUE FAZ O JOGO TODO ----//
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawBricks();
                drawBall();
                drawPaddle();
                drawScore();
                drawLives();
                collisionDetection();

                if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if(y + dy < ballRadius) {
                    dy = -dy;
                }
                else if(y + dy > canvas.height-ballRadius) {
                    if(x > paddleX && x < paddleX + paddleWidth) {
                        dy = -dy;
                    }
                    else {
                        lives--;
                        if(!lives) {
                            alert("GAME OVER");
                            document.location.reload();
                        }
                        else {
                            x = canvas.width/2;
                            y = canvas.height-30;
                            dx = 2;
                            dy = -2;
                            paddleX = (canvas.width-paddleWidth)/2;
                        }
                    }
                }

                if(rightPressed && paddleX < canvas.width-paddleWidth) {
                    paddleX += 7;
                }
                else if(leftPressed && paddleX > 0) {
                    paddleX -= 7;
                }

                x += dx;
                y += dy;
                requestAnimationFrame(draw);
            }
            draw();
        });
});