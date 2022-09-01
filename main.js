// Opciones modal
let btn_iniciar = document.getElementById('iniciar-btn');
let boton_menu_principal = document.getElementById('btn-menu');
let modal_parent = document.getElementById('staticBackdrop');

let loader = document.getElementById('load');

let canvas = null;
let context = null;

let player = null;
let pared = null;
// let wall = null;


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

// * Laberinto path
let laberinto_image = new Image();


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

let x = 50;
let y = 50;

let ptrn = null;

let tempo;

function loading() {
    loader.style.display = 'block';
    loader.style.opacity = '1';
    tempo = setTimeout(start, 2000);
}

function start() {
    loader.style.opacity = '0';
    loader.style.animation = 'fade';

    document.getElementById('myDiv').style.display = 'block';

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 1200;

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

    // * Pared *
    wall_image.src = './imgs/wallSkin.png';

    // * Laberinto *
    laberinto_image.src='./imgs/laberinto_vacio.png';

    pasos_audio.src = './sounds/pasos.mp3';
    pasos_audio.preload = 'auto';
    pasos_audio.volume = 0.1;

    sonidoAmbiente_audio.src = './sounds/ambiental_sound.mp3';
    sonidoAmbiente_audio.preload = 'auto';
    sonidoAmbiente_audio.loop = true;
    sonidoAmbiente_audio.volume = 0.3;
    sonidoAmbiente_audio.play();

    wall_image.width = 20;

    colocarParedes();

    paint();
}


// ! FUNCIONES
// =============================================================================
//  * Funcion de pintar
const paint = () => {
    window.requestAnimationFrame(paint);

    // Rellenar el canvas y hacer como que borra el trayecto
    ptrn = context.createPattern(bg_canvas, 'repeat');
    context.fillStyle = ptrn;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // * Re pintando las parades
    arregloParedes.map((pared) => {
        pared.dibujarImage(
            pared.x,
            pared.y,
            context,
            wall_image,
            pared.w,
            pared.h
        );
    });

    //  * Se dibuja la imagen principal del jugador en el jugador *
    context.drawImage(p_front, player.x, player.y);

    context.drawImage(laberinto_image, 20, 40);

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
//  * Funcion de actualizar por cada fotograma
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
            // Choca pared arriba
            if (move[87] == true) {
                player.y += speed;
            }
            // Choca pared abajo
            if (move[83] == true) {
                player.y -= speed;
            }
            // Choca derecha
            if (move[68] == true) {
                player.x -= speed;
            }
            // Choca izquierda
            if (move[65] == true) {
                player.x += speed;
            }
        }
    });
};

// * Funcion de colocar Paredes por el mapa
const colocarParedes = () => {
    // * Pared top border
    // ! Paredes Horizontales
    pared = new Cuadrado(0, 0, canvas.width, 20);
    pared.dibujarImage(0, 20, context, wall_image, canvas.width, 20);
    arregloParedes.push(pared);

    // * Pared bottom border
    pared = new Cuadrado(0, canvas.height - 20, canvas.width, 20);
    pared.dibujarImage(0, 20, context, wall_image, canvas.width, 20);
    arregloParedes.push(pared);

    // * Pared right border
    // ! Paredes Verticales
    pared = new Cuadrado(canvas.width - 20, 0, 20, canvas.height);
    pared.dibujarImage(canvas.width - 20, 0, context, wall_image);
    arregloParedes.push(pared);

    // * Pared left border
    pared = new Cuadrado(0, 0, 20, canvas.height);
    pared.dibujarImage(0, 0, context, wall_image);
    arregloParedes.push(pared);

    // ==========================================
    // * Paredes Laberinto
    pared = new Cuadrado(20, 99, 148, 10);
    pared.dibujarImage(20, 99, context, wall_image, 148, 10);
    arregloParedes.push(pared);

    pared = new Cuadrado(220, 20, 10, 136);
    pared.dibujarImage(220, 20, context, wall_image,20,136);
    arregloParedes.push(pared);

};
// =============================================================================


// ! CLASES
// =============================================================================
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

    dibujarImage = function (x, y, context, image, img_width, img_height) {
        ptrn = context.createPattern(image, 'repeat');
        context.beginPath();
        context.fillStyle = ptrn;
        context.fillRect(x, y, img_width, img_height);
        // console.log(image.height);
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
// =============================================================================


// ! EVENTOS !
// =============================================================================

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
