const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 2.5;

class Player {
    constructor() {
        
        this.speed = 8;
        this.position = {
            x: 100,
            y: 100
        }

        this.velocity = {
            x: 0,
            y: 0 //pushes player down
        }

        this.width = 120;
        this.height = 120;

        this.image = createImage('./assets/spriteStandRight.png');
        this.frames = 0;
        this.sprites = {
            stand: {
                right: createImage('./assets/spriteStandRight.png'),
                left: createImage('./assets/spriteStandLeft.png'),
                cropWidth: 416,
                width: 120
            },

            run: {
                right: createImage('./assets/spriteRunRight.png'),
                left: createImage('./assets/spriteRunLeft.png'),
                cropWidth: 416,
                width: 120,
            },

            hurt: {
                right: createImage('./assets/hurtSpriteStandRight.png'),
                left: createImage('./assets/hurtSpriteStandLeft.png'),
                cropWidth: 416,
                width: 120,
            }
        }


        this.currentSprite = this.sprites.stand.right;
        this.currentCropWidth = 416;

        this.score = 0;
        this.faded = true;

        this.maxJumps = 2;
        this.jumpCount = 0;

        this.won = false;


    }
        
    jump() {
        if (this.jumpCount >= this.maxJumps) {
            return;
        } 

        keys.up.pressed = true;
            
        this.velocity.y -= 30;

        this.jumpCount++;
    } 

    draw() {
        c.drawImage(this.currentSprite,
                    this.currentCropWidth * this.frames,
                    0,
                    this.currentCropWidth,
                    400,
                    this.position.x, 
                    this.position.y, 
                    this.width, 
                    this.height);
    }

    update() {
            function sleep(milliseconds) {
                const date = Date.now();
                let currentDate = null;
                do {
                currentDate = Date.now();
                } while (currentDate - date < milliseconds);
            }
      
        
            this.frames++;
      
            
            
            if(this.currentSprite == this.sprites.stand.right || this.currentSprite == this.sprites.stand.left){
                sleep(30);
            }else{
                sleep(25);
            }     

        if(this.frames > 15 && this.currentSprite == this.sprites.stand.right){
            this.frames = 1;

        }else if(this.frames > 15 && this.currentSprite == this.sprites.run.right){
            this.frames = 1;
        }else if(this.frames > 15 && this.currentSprite == this.sprites.run.left){
            this.frames = 1;
        }else if(this.frames > 14 && this.currentSprite == this.sprites.stand.left){
            this.frames = 1;
        }else if(this.frames > 14 && this.currentSprite == this.sprites.hurt.left){
            this.frames = 1;
        }else if(this.frames > 14 && this.currentSprite == this.sprites.hurt.right){
            this.frames = 1;
        }

        this.draw();

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity; //accelerating over time
       
        
    }
}


class movingPlatform {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = 20;
        this.diff = 0;
        this.up = 1;
        this.under = false;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update(){
        this.draw();
                    
            this.position.x += this.diff;
            
            if(this.diff == 30){
                this.up = -1;
            }else if(this.diff == -30) {
                this.up = 1;
            }

            if(this.up == 1){
                this.diff++;
             
            }
            
            if(this.up == -1){
               this.diff--;
            }
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = 20;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }
}

class GenericObject{
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }
}


class Marshmallow {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }
}

class Chocolate {
    constructor({ x, y, image, question}) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
        this.question = question;
        this.eaten = false;
        this.changed = false;

    }


    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }
}

class Trap {
    constructor({ x, y, image, trapped}) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
        this.trapped = trapped;
        this.i = 0;
    }

    update(){

        if(!this.trapped){
           this.position.y += this.i;
           this.i--; 
        }
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }
}

class Coin {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
        this.inity = y;
        this.diff = 0;
        this.up = 1;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }

      float(){
        this.draw();
                
        this.position.y = this.inity + this.diff;
        
        if(this.diff == 2){
            this.up = -1;
        }else if(this.diff == -2) {
            this.up = 1;
        }

        if(this.up == 1){
            this.diff+= 0.5;
        }
        
        if(this.up == -1){
           this.diff-= 0.5;
        }
    }
}

class Friend {
    constructor({ x, y, image, mood}) {
        this.position = {
            x: x,
            y: y
        }
        
        this.velocity = {
            x: 0,
            y: 0 
        }

        this.diff = 0;
        this.up = 1;
        this.image =  image;
        this.width = image.width;
        this.height = image.height;
        this.happy = mood;
   

        this.initx =  this.position.x;

    }   
    

    update(){
            this.draw();
                    
            this.position.y = player.position.y  + this.diff  - this.height + 30;
            
            if(this.diff == 10){
                this.up = -1;
            }else if(this.diff == -15) {
                this.up = 1;
            }

            if(this.up == 1){
                this.diff++;
            }
            
            if(this.up == -1){
               this.diff--;
            }
            
            if(keys.left.pressed && !player.won){
                this.position.x = player.position.x + 2 * this.width + 10;
            }
            if(keys.right.pressed && !player.won){
                this.position.x = player.position.x - 50;
            }
        }

        float(){
            this.draw();
                    
            this.position.y = 340 + this.diff;
            
            if(this.diff == 10){
                this.up = -1;
            }else if(this.diff == -15) {
                this.up = 1;
            }

            if(this.up == 1){
                this.diff++;
            }
            
            if(this.up == -1){
               this.diff--;
            }
        }

        draw(){
            c.drawImage(this.image, this.position.x, this.position.y);
          }
}

class Enemy {
    constructor({ x, y, image}) {
        this.position = {
            x: x,
            y: y
        }
        
        this.velocity = {
            x: 0,
            y: 0 
        }

        this.val = x; 

        this.diff = 0;

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
        this.up = 1;

        this.jumped = 0;

        this.i = 0;

        this.leftcollided = false;
        this.rightcollided = false;

    }   
    

    update(){
            this.draw();
                    
            this.position.x += this.diff;
            
            if(this.diff == 6){
                this.up = -1;
            }else if(this.diff == -6) {
                this.up = 1;
            }

            if(this.up == 1){
                this.diff++;
                this.i++;
            }
            
            if(this.up == -1){
               this.diff--;
            }


            if(this.leftcollided || this.rightcollided){
                player.velocity.x = 0;
                player.speed = 0;
                

                if(this.rightcollided){
                
                    player.velocity.y -= 15;
                    player.position.x -= 80;
                    player.currentSprite = player.sprites.hurt.right;
                    
                }else if (this.leftcollided){
                    
                    player.velocity.y -= 15;
                    player.position.x += 80;
                    player.currentSprite = player.sprites.hurt.left;
                    
                }
                

                if(this.leftcollided || this.rightcollided){

                        if(player.score > 0){
                             player.score --;
                                      
                         }    
                }  

                this.leftcollided = false;
                this.rightcollided = false;   

            } else {
                this.i = 0;
            }
    }
            
            

        draw(){
            c.drawImage(this.image, this.position.x, this.position.y);
          }

}

class Score {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y
        }

        this.image =  image;
        this.width = image.width;
        this.height = image.height;
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y);
      }
}

class ScoreTxt {
    constructor({width, height, x, y, text}) {
        
        this.position = {
            x: x,
            y: y
        }

        this.width = width;
        this.height = height;
        this.text = text;
    }
    
    update() {
        c.font = '18px Arial';
        c.fillStyle = "white";
        c.fillText(this.text, this.position.x, this.position.y);
    }
    
}

function createImage(imageSrc) {
    const image = new Image();
    image.src= imageSrc;
    return image
}

let platformImage = createImage('./assets/platform.png');
let platformImage2 = createImage('./assets/platform24.png');
let platformImage3 = createImage('./assets/platform3.png');
let chocolate = createImage('./assets/choco.png');
let chocolateq = createImage('./assets/choco_question.png');
let friendHappy = createImage('./assets/friend-happy.png');
let friendSad = createImage('./assets/friend-sad.png');
let goomba = createImage('./assets/goomba1.png');
let coinImg = createImage('./assets/coin.png');
let empty = createImage('./assets/empty.png');
let endBg = createImage('../img/bg.jpg');

let player = new Player();

let platforms = [];
let marshmallows = [];
let goombas =[];
let GenericObjects = [];
let chocolates = [];
let enemies = [];
let coins = [];
let secretCoins = [];
let movingPlatforms = [];

let scoreText;
let score;

let friend;
let trap;

const keys = {
    right: {
        pressed: false
    },

    left: {
        pressed: false
    },

    up: {
        pressed: false
    }

}

let scrollOffset = 0;
let choco = createImage('./assets/choco.png');
let bigchoco = createImage('/assets/bigchoco.png');

function init() {
    
    document.getElementById("first").style.display="none";
    document.getElementById("second").style.display="none";
    document.getElementById("third").style.display="none";
    document.getElementById("sub").style.display="none";

    let platformImage2 = createImage('./assets/platform24.png');
    let platformImage3 = createImage('./assets/platform3.png');

    let marshmallow1 = createImage('./assets/marshmallow1.png');
    let goomba = createImage('./assets/goomba1.png');

    let choco = createImage('./assets/choco.png');
    let chocolateq = createImage('./assets/choco_question.png');
    let bigchoco = createImage('./assets/bigchoco.png');
    let trapimg = createImage('./assets/trap.png');
    let coinImg = createImage('./assets/coin.png');
    let empty = createImage('./assets/empty.png');


    
player = new Player();

player.score = 0;

platforms = [

    //new Platform({x:platformImage2.width * 35 , y:390, image: platformImage2 }),
    //new Platform({x:platformImage2.width * 36 , y:390, image: platformImage2 })
  new Platform({x: -2, y: 490, image: platformImage2}), 
  new Platform({x: 1 * platformImage2.width - 2, y: 490, image: platformImage2}),
  new Platform({x: 2 * platformImage2.width - 2, y: 490, image: platformImage2}), 
  new Platform({x: 3 * platformImage2.width -2, y: 490, image: platformImage2}), 
  new Platform({x: 4 * platformImage2.width - 2, y: 490, image: platformImage2}),   
  new Platform({x:platformImage2.width * 5 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 6 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 7 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 8 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 9 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 10 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 11 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 12 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 13 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 14 - 2, y: 490, image: platformImage2}),
  

  new Platform({x:platformImage2.width * 16 - 40 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 17 - 40 - 2, y: 490, image: platformImage2}),


  new Platform({x:platformImage2.width * 20 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 21 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 22 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 23 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 24 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 25 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 26 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 27 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 28 + 100 - 2, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 29 + 100 - 2, y: 490, image: platformImage2}),

  new Platform({x: 10 * platformImage2.width + 1 * chocolateq.width, y: 280, image:platformImage3}),

  new Platform({x: 10 * platformImage2.width + 9 * chocolateq.width, y: 200, image:platformImage3}),
  new Platform({x: 10 * platformImage2.width + 9 * chocolateq.width + platformImage3.width, y: 200, image:platformImage3}),

  new Platform({x:platformImage2.width * 32, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 33, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 34, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 35, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 36, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 37, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 38, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 39, y: 490, image: platformImage2}),
  new Platform({x:platformImage2.width * 40, y: 490, image: platformImage2}),

  new Platform({x: 24 * platformImage2.width + 4 * chocolateq.width + 450, y: 300, image: platformImage3}),

 
];

marshmallows = [
    new Marshmallow({x: 6 * platformImage2.width - 2, y: 400, image: marshmallow1}),
    new Marshmallow({x: 8 * platformImage2.width - 2, y: 360, image: marshmallow1}),
    new Marshmallow({x: 9 * platformImage2.width - 2, y: 320, image: marshmallow1}),

    new Marshmallow({x: 14 * platformImage2.width - 2, y: 360, image: marshmallow1}),
    new Marshmallow({x: 15 * platformImage2.width - marshmallow1.width- 2, y: 310, image: marshmallow1}),
    new Marshmallow({x: 24 * platformImage2.width + 4 * chocolateq.width + 250, y: 330, image: marshmallow1}),

    new Marshmallow({x: 25 * platformImage2.width + 4 * chocolateq.width + 1254, y: 350, image: marshmallow1}),
    new Marshmallow({x: 25 * platformImage2.width + 5 * chocolateq.width + 1500, y: 500, image: marshmallow1}),
    new Marshmallow({x: 25 * platformImage2.width + 6 * chocolateq.width + 1737, y: 350, image: marshmallow1}),
];

GenericObjects = [
    new GenericObject({
        x: -1,
        y: -1,
        image: createImage('./assets/background2.png') 
    }),

    /*new GenericObject({
        x: 1820,
        y: 10,
        
        image: createImage('./assets/props2.png') 
    })*/
]

    scrollOffset = 0;

chocolates = [
    


    new Chocolate({x: 2 * platformImage2.width - 70, y: 280, image: chocolateq, question: true}),

    new Chocolate({x: 2 * platformImage2.width + 1 * chocolateq.width - 2, y: 280, image: choco, question: false}),
    new Chocolate({x: 2 * platformImage2.width + 2 * chocolateq.width - 2, y: 280, image: chocolateq, question: true}),
    new Chocolate({x: 2 * platformImage2.width + 3 * chocolateq.width - 2, y: 280, image: choco, question: false}),
    new Chocolate({x: 2 * platformImage2.width + 4 * chocolateq.width - 2, y: 280, image: chocolateq, question: true}),
    new Chocolate({x: 2 * platformImage2.width + 5 * chocolateq.width - 2, y: 280, image: choco, question: false}),

    new Chocolate({x: 17 * platformImage2.width + 5 * chocolateq.width, y: 320, image: bigchoco, question: false}),
    new Chocolate({x: 17 * platformImage2.width + 8 * chocolateq.width, y: 280, image: bigchoco, question: false}),
    new Chocolate({x: 17 * platformImage2.width + 12 * chocolateq.width, y: 280, image: bigchoco, question: false}),
    new Chocolate({x: 17 * platformImage2.width + 16 * chocolateq.width, y: 280, image: bigchoco, question: false}),

    new Chocolate({x: 24 * platformImage2.width + 1 * chocolateq.width - 2, y: 280, image: choco, question: false}),
    new Chocolate({x: 24 * platformImage2.width + 2 * chocolateq.width - 2, y: 280, image: chocolateq, question: true}),
    new Chocolate({x: 24 * platformImage2.width + 3 * chocolateq.width - 2, y: 280, image: chocolateq, question: true}),
    new Chocolate({x: 24 * platformImage2.width + 4 * chocolateq.width - 2, y: 280, image: choco, question: false}),

    new Chocolate({x: 24 * platformImage2.width + 4 * chocolateq.width - 2, y: 280, image: choco, question: false}),
    
    new Chocolate({x: 25 * platformImage2.width + 5 * chocolateq.width + 1525, y: 280, image: chocolateq, question: true}),

];

enemies = [
    
    new Enemy({x:9 * platformImage2.width + 9 * chocolateq.width, y: 430, image: goomba}),
    new Enemy({x:10 * platformImage2.width + 9 * chocolateq.width, y: 430, image: goomba}),
    new Enemy({x:11 * platformImage2.width + 9 * chocolateq.width, y: 430, image: goomba}),

    new Enemy({x:15 * platformImage2.width + 8 * chocolateq.width, y: 430, image: goomba}),

    new Enemy({x: 24 * platformImage2.width + 4 * chocolateq.width + 800, y: 430, image: goomba}),
];

coins = [

    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 100, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 180, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 260, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 340, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 420, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 500, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 580, y: 430, image: coinImg}),
    new Coin({x: 3 * platformImage2.width + marshmallow1.width + 660, y: 430, image: coinImg}),



    new Coin({x: 10 * platformImage2.width + 10 * chocolateq.width - 10, y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 11 * chocolateq.width , y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 12 * chocolateq.width + 10, y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 13 * chocolateq.width + 20, y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 14 * chocolateq.width + 30, y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 15 * chocolateq.width + 40, y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 16 * chocolateq.width + 50, y: 150, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 17 * chocolateq.width + 60, y: 150, image: coinImg}),
    

    new Coin({x: 11 * platformImage2.width + 55, y: 430, image: coinImg}),
    new Coin({x: 10 * platformImage2.width + 11 * chocolateq.width + 75, y: 430, image: coinImg}),
    new Coin({x: 13 * platformImage2.width , y: 430, image: coinImg}),

    new Coin({x: 17 * platformImage2.width + 5 * chocolateq.width + 5, y: 270, image: coinImg}),
    new Coin({x: 17 * platformImage2.width + 8 * chocolateq.width + 5, y: 230, image: coinImg}),
    new Coin({x: 17 * platformImage2.width + 12 * chocolateq.width + 5, y: 230, image: coinImg}),
    new Coin({x: 17 * platformImage2.width + 16 * chocolateq.width + 5, y: 230, image: coinImg}),

    new Coin({x: 24 * platformImage2.width + 4 * chocolateq.width + 480, y: 250, image: coinImg}),
    new Coin({x: 24 * platformImage2.width + 4 * chocolateq.width + 530, y: 250, image: coinImg}),
    new Coin({x: 24 * platformImage2.width + 4 * chocolateq.width + 580, y: 250, image: coinImg}),
    new Coin({x: 24 * platformImage2.width + 4 * chocolateq.width + 630, y: 250, image: coinImg}),

    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 800, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 850, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 900, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 950, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 1000, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 1050, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 1100, y: 430, image: coinImg}),
    new Coin({x: 25 * platformImage2.width + 4 * chocolateq.width + 1150, y: 430, image: coinImg}),
];


friend = new Friend({x: 22 * platformImage2.width, y: 400, image: friendSad, happy: false});
trap = new Trap({x: 22 * platformImage2.width - 20, y: 310, image: trapimg, trapped: true});
score = new Score({x: 50, y: 50, image: coinImg});
scoreText = new ScoreTxt({width: 500, height: 500, x: 90, y: 70, text:" x 0 "});


}



init();

function animate() {
    requestAnimationFrame(animate) //recursive loop
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    GenericObjects.forEach(GenericObject => {
        GenericObject.draw();
    })

    marshmallows.forEach(marshmallow => {
        marshmallow.draw();
    })
    
    enemies.forEach(enemy => {
        enemy.draw();
    })

    platforms.forEach(platform => {
        platform.draw();
    })

    chocolates.forEach(choco => {
        choco.draw();
    })

    coins.forEach(coin1 => {
        coin1.draw();
    })

    movingPlatforms.forEach(p => {
        p.draw();
    })

    score.draw();
    friend.draw();


    if(!friend.happy)
        friend.float();

    if(friend.happy && !trap.trapped){
        friend.float();
    }

    coins.forEach(coin => {
        coin.float();
    })

    
    player.update();
    
    

    trap.update();
    trap.draw();

    scoreText.update();
    enemies.forEach(enemy => {
        enemy.update();
    })

    movingPlatforms.forEach(p => {
        p.update();
    })

//DELETE
    /*
        c.clearRect(0, 0, canvas.width, canvas.height); 

        c.drawImage(endBg, 0, 0);
      

        c.drawImage(coinImg, 250, 230);

        c.fillStyle = "black";

        c.fillText(" x " + player.score, 290, 254, 70);

        c.drawImage(friendHappy, 620 ,210);

        c.fillText("Rescued!", 700, 254, 200);
        
        c.fillStyle = "black";

        document.getElementById("first").style.display="block";
        document.getElementById("second").style.display="block";
        document.getElementById("third").style.display="block";
        document.getElementById("sub").style.display="block";
    */

 //DELETE



//MOVEMENT 

if(friend.happy && !trap.trapped && player.position.x >= friend.position.x + 30){
    friend.update();
    trap.trapped = true;
}

if(friend.happy && trap.trapped){
    friend.update();
}



    if((keys.right.pressed && player.position.x < 400) || (keys.right.pressed && scrollOffset == 10600 && player.position.x > 400)){
            player.velocity.x = player.speed;
            
            if(friend.happy){
                friend.velocity.y = player.velocity.y;
            }

        } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset == 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if(keys.right.pressed){
            scrollOffset += player.speed;
            platforms.forEach(platform => {
                platform.position.x -= player.speed;
            })

            marshmallows.forEach(marshmallow => {
                marshmallow.position.x -= player.speed;
            })

            GenericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * .66;
            }) 

            chocolates.forEach(choco => {
                choco.position.x -= player.speed;
            })

            coins.forEach(coin => {
                coin.position.x -= player.speed;
            })

            enemies.forEach(enemy => {
                enemy.position.x -= player.speed;
            })

            movingPlatforms.forEach(p => {
                p.position.x -= player.speed;
            })


            if(!friend.happy && trap.trapped){
                friend.position.x -= player.speed;
                trap.position.x -= player.speed;
            }

            if(friend.happy && !trap.trapped){
                friend.position.x -= player.speed;
                trap.position.x -= player.speed;
            }            

        }else if (keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed;
            platforms.forEach(platform => {
                platform.position.x += player.speed;
            })

            marshmallows.forEach(marshmallow => {
                marshmallow.position.x += player.speed;
            })

            GenericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * .66;
            }) 

            coins.forEach(coin => {
                coin.position.x += player.speed;
            })

            chocolates.forEach(choco => {
                choco.position.x += player.speed;
            })

            enemies.forEach(enemy => {
                enemy.position.x += player.speed;
            })

            movingPlatforms.forEach(p => {
                p.position.x += player.speed;
            })

            if(!friend.happy && trap.trapped){
                friend.position.x += player.speed;
                trap.position.x += player.speed;
            }

            if(friend.happy && !trap.trapped){
                friend.position.x += player.speed;
                trap.position.x += player.speed;
            }  
        }

        scoreText.text = " x " + player.score;
        scoreText.update();
    }

//platform colision
    platforms.forEach(platform => {

        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y 
            && player.position.x + player.width/2 >= platform.position.x 
            && player.position.x + 60 <= platform.position.x + platform.width) {
            player.velocity.y = 0; //stop moving bc colision
            player.jumpCount = 0;
        }
       
    })

//marshmallow colision

    marshmallows.forEach(marshmallow => {

        if (player.position.y + player.height <= marshmallow.position.y
            && player.position.y + player.height + player.velocity.y >= marshmallow.position.y 
            && player.position.x + player.width >= marshmallow.position.x + 30 
            && player.position.x + 30 <= marshmallow.position.x + marshmallow.width) {
            
            player.jumpCount = 0;
            player.velocity.y = 0; //stop moving bc colision
            
        }

        if(keys.left.pressed && player.position.x >= marshmallow.position.x && player.position.x <= marshmallow.position.x + marshmallow.width && player.position.y + player.height >= marshmallow.position.y){
            player.velocity.x = 0;
            
            player.speed = 0;
        }

        if(keys.right.pressed && player.position.x + player.width >= marshmallow.position.x && player.position.x <= marshmallow.position.x + marshmallow.width - 30 && player.position.y + player.height - 40 >= marshmallow.position.y){
            player.velocity.x = 0;
            player.speed = 0;
            
            
        }

        if(!keys.right.pressed && !keys.left.pressed && player.position.y + player.height >= marshmallow.position.y){
            player.speed = 8;
        }
        
        if(keys.up.pressed && (keys.right.pressed || keys.left.pressed) && player.position.y + player.height  <= marshmallow.position.y){
            player.speed = 8;
        }

    })

enemies.forEach(marshmallow =>{
    if (player.position.y + player.height <= marshmallow.position.y
        && player.position.y + player.height + player.velocity.y >= marshmallow.position.y 
        && player.position.x + player.width >= marshmallow.position.x + 30 
        && player.position.x + 30 <= marshmallow.position.x + marshmallow.width) {

        if(player.position.x >= marshmallow.position.x && player.position.x <= marshmallow.position.x + marshmallow.width){
            marshmallow.leftcollided = true;
        }else{
            marshmallow.rightcollided = true;
        }

        player.jumpCount = 0;
        player.velocity.y = 0; //stop moving bc colision
        
    }

    if(player.position.x >= marshmallow.position.x && player.position.x <= marshmallow.position.x + marshmallow.width && player.position.y + player.height >= marshmallow.position.y){
    
        marshmallow.leftcollided = true;

        
    }

    if(player.position.x + player.width >= marshmallow.position.x && player.position.x <= marshmallow.position.x + marshmallow.width - 30 && player.position.y + player.height - 40 >= marshmallow.position.y){
    
        marshmallow.rightcollided = true;
        
    }

   /* if(!keys.right.pressed && !keys.left.pressed && player.position.y + player.height >= marshmallow.position.y){
        player.speed = 8;
    }
    
    if(keys.up.pressed && (keys.right.pressed || keys.left.pressed) && player.position.y + player.height  <= marshmallow.position.y){
        player.speed = 8;
    }
*/

})

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
        currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

//chocolate blocks colision
chocolates.forEach(chocolate => {
    
    if (player.position.y + player.height <= chocolate.position.y
        && player.position.y + player.height + player.velocity.y >= chocolate.position.y 
        && player.position.x + player.width/1.5 >= chocolate.position.x 
        && player.position.x + 60<= chocolate.position.x + chocolate.width) {
        player.velocity.y = 0; //over block colision
        player.jumpCount = 1;
    }

    let secretCoin = new Coin({x: chocolate.position.x + 5, y: chocolate.position.y - 40, image: coinImg});

    if(chocolate.question == true && keys.up.pressed  && player.position.x + player.width/2>= chocolate.position.x && player.position.x < chocolate.position.x + chocolate.width){
        chocolate.position.y += player.velocity.y;
    }

    if( keys.up.pressed == false && chocolate.position.y < 280){
        chocolate.position.y += player.velocity.y;
        chocolate.image = choco;

        if(!chocolate.eaten){
            chocolate.eaten = true;
            player.score++;
        }

        secretCoin.draw();
        chocolate.question = false;
        
    }


})

movingPlatforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width/2 >= platform.position.x 
        && player.position.x + 60 <= platform.position.x + platform.width) {
        player.velocity.y = 0; //stop moving bc colision
        player.jumpCount = 0;
        platform.under = true;
       // player.velocity.x = platform.velocity.x;
    }
   
})

//making a friend

    if(player.position.x + player.width>= trap.position.x - 100 && !friend.happy){
        player.velocity.y = 0;
        player.jumpCount = 0;

        trap.trapped = false;

        friend.image = friendHappy;
        friend.happy = true;
  
    }// a sad friend won't follow you


//getting coins

    coins.forEach(coin => {
        
        if(coin.image != empty && player.position.x + player.width >= coin.position.x && player.position.x <= coin.position.x && player.position.y + player.height >= coin.position.y && player.position.y <= coin.position.y) {
            coin.image = empty;
            player.score++;
        }

    })

    //lose condition

    if(player.position.y > canvas.height) {
        init();
    }

    if(scrollOffset == 10600){

        player.won = true;

    }

    if(player.won == true && player.position.x <= canvas.width) {
        player.currentSprite = player.sprites.run.right;
        player.speed = 0;
        player.position.x += 5;
        friend.position.x += 5;
    }

    if(player.position.x > canvas.width) {
        c.clearRect(0, 0, canvas.width, canvas.height); 

        c.drawImage(endBg, 0, 0);
      

        c.drawImage(coinImg, 250, 230);

        c.fillStyle = "black";

        c.fillText(" x " + player.score, 290, 254, 70);

        c.drawImage(friendHappy, 620 ,210);

        c.fillText("Rescued!", 700, 254, 200);
        
        c.fillStyle = "black";

        document.getElementById("first").style.display="block";
        document.getElementById("second").style.display="block";
        document.getElementById("third").style.display="block";
        document.getElementById("sub").style.display="block";
        document.getElementById("score").value = player.score;

        var sc = player.score;
    }
}


animate()

addEventListener('keydown', ({ keyCode }) => {
    
    switch (keyCode) {
        case 37:
            console.log('left');
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            
            break;
        
        case 40:
            console.log('down');
            break;
        
        case 39:
            console.log('right');
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
            
        case 38:
            console.log('up');

            player.jump();
                
            break;

        case 65:
            console.log('left');
            keys.left.pressed = true;
            player.currentSprite = player.sprites.run.left;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
        
        case 83:
            console.log('down');
            break;
        
        case 68:
            console.log('right');
            keys.right.pressed = true;
            player.currentSprite = player.sprites.run.right;
            player.currentCropWidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width;
            break;
            
        case 87:
            console.log('up');
            
            player.jump();
            
            break;
    }
    
})


addEventListener('keyup', ({ keyCode }) => {
    
    console.log(keyCode);

    switch (keyCode) {

        case 37:
            console.log('left');
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
        
        case 40:
            console.log('down');
            break;
        
        case 39:
            console.log('right');
            keys.right.pressed = false;

            player.currentSprite = player.sprites.stand.right;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
            
        case 38:
            console.log('up');
            keys.up.pressed = false;
            break;

        case 65:
            console.log('left');
            keys.left.pressed = false;
            player.currentSprite = player.sprites.stand.left;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            break;
        
        case 83:
            console.log('down');
            break;
        
        case 68:
            console.log('right');
            keys.right.pressed = false;
            player.currentSprite = player.sprites.stand.right;
            player.currentCropWidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width;
            
            break;
            
        case 87:
            console.log('up');
            keys.up.pressed = false;

            break;

    }
    
})
