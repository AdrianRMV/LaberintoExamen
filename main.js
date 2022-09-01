// Opciones modal
let btn_iniciar = document.getElementById('iniciar-btn');
let boton_menu_principal = document.getElementById('btn-menu');
let boton_modal_win = document.getElementById('btn-modal-win');
let modal_parent = document.getElementById('staticBackdrop');

let loader = document.getElementById('load');

let canvas = null;
let context = null;

let player = null;
let novia = null;
let pared = null;
// let wall = null;

let arregloParedes = [];
let move = [];

let speed = 3.5;
let dead = false;
let pause = false;

let contador_s = 0;
let contador_m = 0;
let s = document.getElementById('segundos');
let m = document.getElementById('minutos');

let total_s = document.getElementById('segundos-end');
let total_m = document.getElementById('minutos-end');

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
let sonidoAmbiente_audio = new Audio();
let completado_audio = new Audio();
let botonStart_audio = new Audio();
let instrucciones_audio = new Audio();
let pasos_audio = new Audio();

// Posicion inicial jugador
let x = 40;
let y = 30;

let ptrn = null;

let tempo;



// ! FUNCIONES
// =============================================================================

function loading() {
    botonStart_audio.src = './sounds/start.mp3';
    botonStart_audio.volume = 0.1;
    botonStart_audio.play();
    loader.style.display = 'block';
    loader.style.opacity = '1';
    tempo = setTimeout(start, 2000);
}

function start() {
    loader.style.opacity = '0';
    loader.style.display = 'none';

    speed = 3.5;
    console.log(speed)

    document.getElementById('myDiv').style.display = 'flex';
    document.getElementById('board').style.display = 'flex';
    tiempoGoal();

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 1200;

    bg_canvas.src = './imgs/floorSkin.png';

    player = new Jugador(x, y, 20, 37, 3);

    // novia = new Cuadrado(950,1146,20,37);
    novia = new Cuadrado(194,163,20,37);

    // ==============================================================

    // ! IMAGENES !

    // * Novia
    witch.src = "./imgs/witch.png"

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
    laberinto_image.src = './imgs/laberinto_vacio.png';

    // ===========================================================
    // ! SONIDOS/EFECTOS !

    pasos_audio.src = './sounds/pasos.mp3';
    pasos_audio.preload = 'auto';
    pasos_audio.volume = 0.1;

    sonidoAmbiente_audio.src = './sounds/ambiental_sound.mp3';
    sonidoAmbiente_audio.preload = 'auto';
    sonidoAmbiente_audio.loop = true;
    sonidoAmbiente_audio.volume = 0.3;
    sonidoAmbiente_audio.play();
    
    // ================================================================

    wall_image.width = 20;

    colocarParedes();

    paint();
}

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

    context.drawImage(witch,novia.x,novia.y);

    

    // context.drawImage(laberinto_image, 20, 20);

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
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#fff';
        context.font = '35px Arial';
        context.fillText('Pause', 425, 500);
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

    // * Player se toca con la novia activa modal de win
    if (player.se_tocan(novia)) {
        novia.width = 0;
        novia.height = 0;
        novia.x = 2000;
        novia.y = 2000;
        speed = 0;
        total_s.innerHTML = contador_s;
        total_m.innerHTML = contador_m;
        boton_modal_win.click();
        // btn_iniciar.removeEventListener("click");
    }

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

// * Funcion que crea las paredes
const crearParedes = (x, y, w, h) => {
    pared = new Cuadrado(x, y, w, h);
    pared.dibujarImage(x, y, context, wall_image, w, h);
    arregloParedes.push(pared);
};

// * Funcion que retorna la separacion entre los puntos en el plano cartesiano
const separacionParedes = (puntoMenor, puntoMayor) => {
    return puntoMayor - puntoMenor;
};

// * Funcion de colocar Paredes por el mapa
const colocarParedes = () => {
    // * Paredes Laberinto
    // ! Num par = VERTICAL
    // ! Num impar = HORIZONTAL

    crearParedes(0, 0, canvas.width, 20);
    crearParedes(0, canvas.height - 20, canvas.width, 20);
    crearParedes(canvas.width - 20, 0, 20, canvas.height);
    crearParedes(0, 0, 20, canvas.height);
    crearParedes(20, 77, separacionParedes(20, 165), 10);
    crearParedes(164, 78, 10, separacionParedes(78, 195));
    crearParedes(68, 134, separacionParedes(68, 172), 10);
    crearParedes(68, 139, 10, separacionParedes(139, 312));
    crearParedes(68, 311, separacionParedes(68, 165), 10);
    crearParedes(163, 316, 10, separacionParedes(316, 369));
    crearParedes(70, 370, separacionParedes(70, 360), 10);
    crearParedes(117, 193, 10, separacionParedes(193, 252));
    crearParedes(118, 253, separacionParedes(118, 410), 10);
    crearParedes(407, 76, 10, separacionParedes(76, 487));
    crearParedes(165, 188, separacionParedes(165, 263), 10);
    crearParedes(209, 20, 10, separacionParedes(20, 136));
    crearParedes(212, 77, separacionParedes(212, 262), 10);
    crearParedes(260, 135, 10, separacionParedes(135, 193));
    crearParedes(260, 135, separacionParedes(260, 311), 10);
    crearParedes(310, 79, 10, separacionParedes(79, 139));
    crearParedes(310, 196, separacionParedes(310, 360), 10);
    crearParedes(357, 20, 10, separacionParedes(20, 206));
    crearParedes(408, 309, separacionParedes(408, 650), 10);
    crearParedes(647, 312, 10, separacionParedes(312, 489));
    crearParedes(455, 192, separacionParedes(455, 505), 10);
    crearParedes(455, 77, 10, separacionParedes(77, 192));
    crearParedes(505, 251, separacionParedes(505, 555), 10);
    crearParedes(550, 136, 10, separacionParedes(136, 255));
    crearParedes(552, 190, separacionParedes(552, 604), 10);
    crearParedes(307, 197, 10, separacionParedes(197, 257));
    crearParedes(502, 75, separacionParedes(502, 553), 10);
    crearParedes(501, 20, 10, separacionParedes(20, 136));
    crearParedes(598, 75, separacionParedes(598, 652), 10);
    crearParedes(598, 76, 10, separacionParedes(76, 195));
    crearParedes(601, 251, separacionParedes(601, 843), 10);
    crearParedes(454, 255, 10, separacionParedes(255, 314));
    crearParedes(648, 134, separacionParedes(648, 698), 10);
    crearParedes(647, 134, 10, separacionParedes(134, 254));
    crearParedes(696, 191, separacionParedes(696, 845), 10);
    crearParedes(696, 75, 10, separacionParedes(75, 197));
    crearParedes(696, 74, separacionParedes(695, 747), 10);
    crearParedes(647, 20, 10, separacionParedes(20, 80));
    crearParedes(747, 133, separacionParedes(747, 798), 10);
    crearParedes(792, 20, 10, separacionParedes(20, 138));
    crearParedes(842, 133, separacionParedes(842, 943), 10);
    crearParedes(841, 77, 10, separacionParedes(77, 198));
    crearParedes(939, 249, separacionParedes(939, 981), 10);
    crearParedes(889, 20, 10, separacionParedes(20, 78));
    crearParedes(938, 78, 10, separacionParedes(78, 138));
    crearParedes(938, 193, 10, separacionParedes(193, 256));
    crearParedes(889, 136, 10, separacionParedes(136, 313));
    crearParedes(501, 196, 10, separacionParedes(196, 257));
    crearParedes(210, 256, 10, separacionParedes(256, 311));
    crearParedes(307, 256, 10, separacionParedes(256, 311));
    crearParedes(356, 313, 10, separacionParedes(313, 374));
    crearParedes(259, 311, 10, separacionParedes(311, 490));
    crearParedes(550, 368, 10, separacionParedes(368, 666));
    crearParedes(500, 428, 10, separacionParedes(428, 548));
    crearParedes(453, 368, 10, separacionParedes(368, 429));
    crearParedes(598, 368, 10, separacionParedes(368, 429));
    crearParedes(64, 426, 10, separacionParedes(426, 841));
    crearParedes(162, 484, 10, separacionParedes(484, 898));
    crearParedes(210, 429, 10, separacionParedes(429, 490));
    crearParedes(210, 542, 10, separacionParedes(542, 608));
    crearParedes(307, 542, 10, separacionParedes(542, 608));
    crearParedes(355, 483, 10, separacionParedes(483, 608));
    crearParedes(452, 542, 10, separacionParedes(542, 608));
    crearParedes(113, 720, 10, separacionParedes(720, 782));
    crearParedes(257, 604, 10, separacionParedes(604, 667));
    crearParedes(403, 603, 10, separacionParedes(603, 725));
    crearParedes(598, 484, 10, separacionParedes(484, 725));
    crearParedes(502, 660, 10, separacionParedes(660, 839));
    crearParedes(307, 660, 10, separacionParedes(660, 900));
    crearParedes(211, 660, 10, separacionParedes(660, 842));
    crearParedes(259, 721, 10, separacionParedes(721, 842));
    crearParedes(695, 252, 10, separacionParedes(252, 312));
    crearParedes(744, 309, 10, separacionParedes(309, 373));
    crearParedes(840, 308, 10, separacionParedes(308, 608));
    crearParedes(743, 425, 10, separacionParedes(425, 608));
    crearParedes(743, 425, 10, separacionParedes(425, 608));
    crearParedes(792, 600, 10, separacionParedes(600, 725));
    crearParedes(938, 659, 10, separacionParedes(659, 724));
    crearParedes(889, 366, 10, separacionParedes(366, 547));
    crearParedes(937, 486, 10, separacionParedes(486, 609));
    crearParedes(695, 659, 10, separacionParedes(659, 784));
    crearParedes(888, 721, 10, separacionParedes(721, 784));
    crearParedes(791, 776, 10, separacionParedes(776, 842));
    crearParedes(743, 776, 10, separacionParedes(776, 900));
    crearParedes(598, 776, 10, separacionParedes(776, 1019));
    crearParedes(694, 366, 10, separacionParedes(366, 432));
    crearParedes(647, 601, 10, separacionParedes(601, 664));
    crearParedes(452, 718, 10, separacionParedes(718, 781));
    crearParedes(356, 720, 10, separacionParedes(720, 783));
    crearParedes(112, 835, 10, separacionParedes(835, 959));
    crearParedes(210, 893, 10, separacionParedes(893, 959));
    crearParedes(356, 894, 10, separacionParedes(894, 1016));
    crearParedes(549, 838, 10, separacionParedes(838, 960));
    crearParedes(646, 717, 10, separacionParedes(717, 958));
    crearParedes(889, 835, 10, separacionParedes(835, 959));
    crearParedes(937, 951, 10, separacionParedes(951, 1015));
    crearParedes(403, 776, 10, separacionParedes(776, 901));
    crearParedes(452, 835, 10, separacionParedes(835, 901));
    crearParedes(452, 954, 10, separacionParedes(954, 1018));
    crearParedes(501, 954, 10, separacionParedes(954, 1018));
    crearParedes(307, 1013, 10, separacionParedes(1013, 1076));
    crearParedes(211, 1011, 10, separacionParedes(1011, 1076));
    crearParedes(64, 954, 10, separacionParedes(954, 1018));
    crearParedes(162, 955, 10, separacionParedes(955, 1015));
    crearParedes(113, 1011, 10, separacionParedes(1011, 1131));
    crearParedes(64, 1071, 10, separacionParedes(1071, 1181));
    crearParedes(355, 1069, 10, separacionParedes(1069, 1133));
    crearParedes(307, 1128, 10, separacionParedes(1128, 1188));
    crearParedes(500, 1128, 10, separacionParedes(1128, 1188));
    crearParedes(646, 1128, 10, separacionParedes(1128, 1188));
    crearParedes(549, 1070, 10, separacionParedes(1070, 1132));
    crearParedes(404, 954, 10, separacionParedes(954, 1076));
    crearParedes(791, 425, 10, separacionParedes(425, 548));
    crearParedes(840, 717, 10, separacionParedes(717, 783));
    crearParedes(695, 953, 10, separacionParedes(953, 1014));
    crearParedes(646, 1012, 10, separacionParedes(1012, 1075));
    crearParedes(743, 1011, 10, separacionParedes(1011, 1075));
    crearParedes(889, 1010, 10, separacionParedes(1010, 1075));
    crearParedes(936, 1068, 10, separacionParedes(1068, 1135));
    crearParedes(792, 1069, 10, separacionParedes(1069, 1135));
    crearParedes(259, 951, 10, separacionParedes(951, 1017));

    crearParedes(841, 307, separacionParedes(841, 941), 10);
    crearParedes(743, 307, separacionParedes(743, 795), 10);
    crearParedes(694, 366, separacionParedes(694, 844), 10);
    crearParedes(890, 366, separacionParedes(890, 942), 10);
    crearParedes(890, 424, separacionParedes(890, 981), 10);
    crearParedes(842, 599, separacionParedes(842, 941), 10);
    crearParedes(745, 424, separacionParedes(745, 796), 10);
    crearParedes(602, 541, separacionParedes(602, 699), 10);
    crearParedes(699, 484, separacionParedes(699, 747), 10);
    crearParedes(456, 366, separacionParedes(456, 605), 10);
    crearParedes(117, 1067, separacionParedes(117, 747), 10);
    crearParedes(600, 483, separacionParedes(600, 651), 10);
    crearParedes(649, 600, separacionParedes(649, 796), 10);
    crearParedes(794, 659, separacionParedes(794, 942), 10);
    crearParedes(746, 718, separacionParedes(746, 845), 10);
    crearParedes(843, 775, separacionParedes(843, 983), 10);
    crearParedes(795, 834, separacionParedes(795, 943), 10);
    crearParedes(940, 894, separacionParedes(940, 986), 10);
    crearParedes(649, 951, separacionParedes(649, 941), 10);
    crearParedes(699, 775, separacionParedes(699, 799), 10);
    crearParedes(650, 834, separacionParedes(650, 700), 10);
    crearParedes(698, 659, separacionParedes(698, 748), 10);
    crearParedes(552, 717, separacionParedes(552, 651), 10);
    crearParedes(504, 775, separacionParedes(504, 603), 10);
    crearParedes(310, 425, separacionParedes(310, 410), 10);
    crearParedes(263, 483, separacionParedes(263, 362), 10);
    crearParedes(359, 542, separacionParedes(359, 458), 10);
    crearParedes(409, 483, separacionParedes(409, 503), 10);
    crearParedes(67, 425, separacionParedes(67, 167), 10);
    crearParedes(212, 542, separacionParedes(212, 312), 10);
    crearParedes(115, 484, separacionParedes(115, 215), 10);
    crearParedes(115, 600, separacionParedes(115, 215), 10);
    crearParedes(67, 542, separacionParedes(67, 117), 10);
    crearParedes(67, 658, separacionParedes(67, 117), 10);
    crearParedes(67, 834, separacionParedes(67, 117), 10);
    crearParedes(117, 775, separacionParedes(117, 167), 10);
    crearParedes(212, 659, separacionParedes(212, 407), 10);
    crearParedes(457, 600, separacionParedes(457, 552), 10);
    crearParedes(457, 659, separacionParedes(457, 552), 10);
    crearParedes(17, 893, separacionParedes(17, 116), 10);
    crearParedes(17, 893, separacionParedes(17, 116), 10);
    crearParedes(115, 951, separacionParedes(115, 214), 10);
    crearParedes(213, 892, separacionParedes(213, 310), 10);
    crearParedes(213, 834, separacionParedes(213, 264), 10);
    crearParedes(310, 834, separacionParedes(310, 360), 10);
    crearParedes(360, 776, separacionParedes(360, 409), 10);
    crearParedes(408, 716, separacionParedes(408, 457), 10);
    crearParedes(456, 892, separacionParedes(456, 552), 10);
    crearParedes(261, 951, separacionParedes(261, 360), 10);
    crearParedes(67, 1010, separacionParedes(67, 118), 10);
    crearParedes(214, 1010, separacionParedes(214, 264), 10);
    crearParedes(455, 1010, separacionParedes(455, 505), 10);
    crearParedes(553, 1010, separacionParedes(553, 650), 10);
    crearParedes(407, 833, separacionParedes(407, 457), 10);
    crearParedes(504, 951, separacionParedes(504, 553), 10);
    crearParedes(697, 893, separacionParedes(697, 844), 10);
    crearParedes(746, 1010, separacionParedes(746, 893), 10);
    crearParedes(696, 1127, separacionParedes(696, 941), 10);
    crearParedes(892, 1068, separacionParedes(892, 939), 10);
    crearParedes(795, 1068, separacionParedes(795, 845), 10);
    crearParedes(599, 1127, separacionParedes(599, 650), 10);
    crearParedes(405, 1127, separacionParedes(405, 505), 10);
    crearParedes(164, 1127, separacionParedes(164, 311), 10);
};

// * Funcion que crea el cronometro del tiempo que le toma al usuario llegar a la meta
const tiempoGoal = (x = 1000) => {
    window.setInterval(function () {
        if(contador_s == 60){
            contador_s = 0;
            contador_m++;
            m.innerHTML = contador_m;
            if(contador_m === 0 ){
                contador_m = 0;
            }
        }
        s.innerHTML = contador_s;
        contador_s+=1;
    },x);
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




