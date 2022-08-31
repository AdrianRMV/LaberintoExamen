// Opciones modal
let btn_iniciar = document.getElementById('iniciar-btn');
let boton_menu_principal = document.getElementById('btn-menu');
let modal_parent = document.getElementById('staticBackdrop');

let loader = document.getElementById('load');

let canvas = null;
let context = null;

let player = null;
let wall = null;

let arregloParedes = [];
let move = [];

let speed = 3.5;
let dead = false;
let pause = false;

// ! Imagenes !

// * Protagonista Angulos
let p_front = new Image();
let p_right = new Image();
let p_right_down = new Image();
let p_right_up = new Image();
let p_back = new Image();
let p_left = new Image();
let p_left_down = new Image();
let p_left_up = new Image();

// * Transparente
let hide = new Image();

// * Novia
let witch = new Image();

// * Skin de la pared
let wall_image = new Image();

// * Skin del suelo
let floor_image = new Image();

// * Background Canvas
let bg_canvas = new Image();

// ! Audio !
// TODO: agregar todos los audios
let sonidoAmbiente_audio = new Audio();
let completado_audio = new Audio();
let botonStart_audio = new Audio();
let instrucciones_audio = new Audio();
let pasos_audio = new Audio();

let x = 240;
let y = 240;

let ptrn = null;

let tempo;

function loading() {
    loader.style.display = 'block';
    loader.style.opacity = '1';
    tempo = setTimeout(start, 3000);
}

function start() {
    loader.style.opacity = '0';
    document.getElementById('myDiv').style.display = 'block';


    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvas.width = 1500;
    canvas.height = 1000;

    bg_canvas.src = './imgs/floorSkin.png';

    player = new Jugador(x, y, 20, 37, 3);

    // Cargando imagenes del protagonista

    // * Enfrente *
    p_front.src = './imgs/front.png';

    // * Angulos derecha *
    p_right.src = './imgs/right.png';
    p_right_down.src = './imgs/rightDown.png';
    p_right_up.src = './imgs/rightUp.png';

    // * Abajo *
    p_back.src = './imgs/back.png';

    // * Angulos izquierda *
    p_left.src = './imgs/left.png';
    p_left_down.src = './imgs/leftDown.png';
    p_left_up.src = './imgs/leftUp.png';

    // * Pareded *
    wall_image.src = './imgs/wallSkin.png';

    pasos_audio.src = './sounds/pasos.mp3';
    pasos_audio.preload = 'auto';
    pasos_audio.volume = 0.1;

    sonidoAmbiente_audio.src = './sounds/ambiental_sound.mp3';
    sonidoAmbiente_audio.preload = 'auto';
    sonidoAmbiente_audio.loop = true;
    sonidoAmbiente_audio.volume = 0.3;
    sonidoAmbiente_audio.play();

    // * Pared top border
    for (let x = 100; x < canvas.width; x += 100) {
        let pared = new Cuadrado(x, 0, wall_image.width, 20);
        pared.dibujarImage(x, 0, context, wall_image);
        arregloParedes.push(pared);
    }

    // * Pared bottom border
    for (let x = 0; x < canvas.width; x += 100) {
        let pared = new Cuadrado(x, 980, wall_image.width, 20);
        pared.dibujarImage(x, 980, context, wall_image);
        arregloParedes.push(pared);
    }

    for (let y = 20; y < canvas.height; y += 20) {
        let pared = new Cuadrado(canvas.width - 30, y, 20, 20);
        pared.dibujarImage(canvas.width - 30, y, context, wall_image);
        arregloParedes.push(pared);
    }

    paint();
}

//  Funcion de pintar
const paint = () => {
    window.requestAnimationFrame(paint);

    // Rellenar el canvas y hacer como que borra el trayecto
    ptrn = context.createPattern(bg_canvas, 'repeat');
    context.fillStyle = ptrn;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // * Re pintando las parades
    arregloParedes.map((pared) => {
        pared.dibujarImage(pared.x, pared.y, context, wall_image);
    });

    //  * Se dibuja la imagen principal del jugador en el jugador *
    context.drawImage(p_front, player.x, player.y);

    //  * Se dibuja la imagen del carne al bono*
    // context.drawImage(carne, player2.x, player2.y);

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
    // right side
    if (move[68] == true) {
        player.x += speed;

        context.drawImage(p_right, player.x, player.y);
        pasos_audio.play();
    }

    // down side
    if (move[83] == true) {
        player.y += speed;

        context.drawImage(p_front, player.x, player.y);
        pasos_audio.play();
    }

    // left side
    if (move[65] == true) {
        player.x -= speed;

        pasos_audio.play();
        context.drawImage(p_left, player.x, player.y);
    }

    // up side
    if (move[87] == true) {
        player.y -= speed;
        if (player.y < 0) {
            player.y = 700;
        }
        context.drawImage(p_back, player.x, player.y);
        pasos_audio.play();
    }

    /*
     *   Condicional para saber si nuestro player a tocado la recompensa para subir velocidad y dar mas score
     */
    // if (player.se_tocan(player2)) {
    //     player2.x = getRandomInt(900);
    //     player2.y = getRandomInt(500);
    //     score += 10;
    //     speed += 5;
    //     sonido1.play();
    // }

    /*
     *   Buscar que nuestro player no toque ninguno de los obstaculos o se detendra el juego
     */
    arregloParedes.map((pared) => {
        if (player.se_tocan(pared)) {
            if (move[87] == true) {
                player.y += speed;
            }
            if (move[83] == true) {
                player.y -= speed;
            }
            if (move[68] == true) {
                player.x -= speed;
            }
        }
    });
};

// * Clase Cuadrado  que es nuestra clase molde para todo los objetos
class Cuadrado {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    dibujar = function (context) {
        context.fillRect(this.x, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.w, this.h);
    };

    dibujarImage = function (x, y, context, image) {
        ptrn = context.createPattern(image, 'repeat');
        context.beginPath();
        context.fillStyle = ptrn;
        context.fillRect(x, y, image.width, 20);
        context.closePath();
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

// * Clase jugador para poder diferenciarlo de las clase de obstaculos, el cual cuenta con vidas
class Jugador extends Cuadrado {
    constructor(x, y, w, h, lifes) {
        super(x, y, w, h);
        this.lifes = lifes;
    }
}

// * Detectar pause
document.addEventListener('keydown', ({ keyCode }) => {
    // Pause
    if (keyCode == 32) {
        pause = pause ? false : true;
    }
});

// * Movilidad fluida
document.addEventListener('keydown', function ({ keyCode }) {
    move[keyCode] = true;
});
document.addEventListener('keyup', function ({ keyCode }) {
    move[keyCode] = false;
});

btn_iniciar.addEventListener('click', () => {
    modal_parent.style.display = 'none';
    boton_menu_principal.style.display = 'none';
    loading();
});

// window.addEventListener('load', start);
