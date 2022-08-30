import './style.css';

let canvas = null;
let context = null;

let player = null;
let wall = null;

let arregloParedes = [];
let move = [];

let speed = 5;
let pause = false;

// ! Imagenes !

// * Protagonista Angulos
let p_front = new Image();
let p_right = new Image();
let p_back = new Image();
let p_left = new Image();

let witch = new Image();

let wall_image = new Image();

// ! Audio !
// TODO: agregar todos los audios
let sonido_ambiente = new Audio();

let x = 240;
let y = 240;

function start() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    // Todo: Poner bg de una imagen de fondo stardew valley
    canvas.style.background = '#ff8';

    player1 = new Jugador(x, y, 40, 40, 'red', 3);
    player2 = new Cuadrado(getRandomInt(900), getRandomInt(540), 40, 40, 'red');

    // * Generador de obstaculos
    for (let i = 0; i <= 4; i++) {
        let obstaculo = new Cuadrado(
            getRandomInt(900),
            getRandomInt(540),
            40,
            100,
            '#808080'
        );
        arregloParedes.push(obstaculo);
    }
    zombie.src = 'zombie.png';
    carne.src = 'carne.png';
    wall.src = 'wall.jpg';

    sonido1.src = 'sonido_zombie.mp3';
    paint();
}

//  Funcion de pintar
const paint = () => {
    window.requestAnimationFrame(paint);

    // Rellenar el canvas y hacer como que borra el trayecto
    context.fillStyle = '#ff8';
    context.fillRect(0, 0, 1000, 600);

    context.fillStyle = '#000';
    context.font = '25px Arial';
    context.fillText(
        'Score: ' +
            score +
            '                                   ' +
            'Speed: ' +
            speed +
            '                                                ' +
            'Lifes: ' +
            player1.lifes +
            ' ',
        20,
        40
    );

    // * Creando los obstaculos
    arregloParedes.map((obstaculo) => {
        obstaculo.dibujar(context);
    });

    //  * Se dibuja la imagen del zombie en el jugador *
    context.drawImage(zombie, player1.x, player1.y);

    //  * Se dibuja la imagen del carne al bono*
    context.drawImage(carne, player2.x, player2.y);

    //  * Se dibuja la imagen del carne al bono*
    arregloParedes.map((obstaculo) => {
        context.drawImage(wall, obstaculo.x, obstaculo.y, 40, 100);
    });

    if (!pause && !dead) {
        update();
    } else if (dead) {
        context.fillStyle = 'rgba(0,0,0,0.5)';
        context.fillRect(0, 0, 1000, 600);
        context.fillStyle = '#fff';
        context.font = '35px Arial';
        context.fillText('DEAD', 425, 300);
    } else {
        context.fillStyle = 'rgba(0,0,0,0.5)';
        context.fillRect(0, 0, 1000, 600);
        context.fillStyle = '#fff';
        context.font = '35px Arial';
        context.fillText('Pause', 425, 300);
    }
};

const update = () => {
    if (move[68] == true) {
        player1.x += speed;
        if (player1.x > 1200) {
            player1.x = 0;
        }
    }
    if (move[83] == true) {
        player1.y += speed;
        if (player1.y > 700) {
            player1.y = 0;
        }
    }

    if (move[65] == true) {
        player1.x -= speed;
        if (player1.x < 0) {
            player1.x = 1200;
        }
    }
    if (move[87] == true) {
        player1.y -= speed;
        if (player1.y < 0) {
            player1.y = 700;
        }
    }

    /*
     *   Condicional para saber si nuestro player a tocado la recompensa para subir velocidad y dar mas score
     */
    if (player1.se_tocan(player2)) {
        player2.x = getRandomInt(900);
        player2.y = getRandomInt(500);
        score += 10;
        speed += 5;
        sonido1.play();
    }

    /*
     *   Buscar que nuestro player no toque ninguno de los obstaculos o se detendra el juego
     */
    arregloParedes.map((obstaculo) => {
        if (player1.se_tocan(obstaculo)) {
            if (player1.lifes <= 1) {
                dead = true;
                speed = 0;
            } else {
                player1.lifes = player1.lifes - 1;
                player1.x = getRandomInt(900);
                player1.y = getRandomInt(500);
            }
        }
    });
};

// * Clase Cuadrado que es nuestra clase molde para todo los objetos
class Cuadrado {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    dibujar = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
    };

    se_tocan = function (target) {
        if (
            this.x < target.x + target.w &&
            this.x + this.w > target.x &&
            this.y < target.y + target.h &&
            this.y + this.h > target.y
        ) {
            return true;
        }
    };
}

// * Clase jugador para poder diferenciarlo de las clase de obstaculos
class Jugador {
    constructor(x, y, w, h, color, lifes) {
        this.x = x;
        this.y = y;
        this.w = h;
        this.h = h;
        this.color = color;
        this.lifes = lifes;
    }

    dibujar = function (context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
    };

    se_tocan = function (target) {
        if (
            this.x < target.x + target.w &&
            this.x + this.w > target.x &&
            this.y < target.y + target.h &&
            this.y + this.h > target.y
        ) {
            return true;
        }
    };
}

// * Movimiento con tecla y flechas
document.addEventListener('keydown', ({ keyCode }) => {
    // arriba
    if (keyCode == 87 || keyCode == 38) {
        direction = 'up';
    }
    // derecha
    if (keyCode == 68 || keyCode == 39) {
        direction = 'right';
    }

    // abajo
    if (keyCode == 83 || keyCode == 40) {
        direction = 'down';
    }

    // izquierda
    if (keyCode == 65 || keyCode == 37) {
        direction = 'left';
    }

    // Pause
    if (keyCode == 32) {
        pause = pause ? false : true;
    }
});

document.addEventListener('keydown', function ({ keyCode }) {
    move[keyCode] = true;
});
document.addEventListener('keyup', function ({ keyCode }) {
    move[keyCode] = false;
});

window.addEventListener('load', start);

window.requestAnimationFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        }
    );
})();
