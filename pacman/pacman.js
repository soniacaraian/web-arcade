 canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const scoreText = document.querySelector("#score");

canvas.width = 440;
canvas.height = 520;

class Boundary {
    static width = 40;
    static height = 40;
    constructor({position, image}) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

class Player {
    constructor({ position, velocity }){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'yellow'
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Ghost {
    constructor({ position, velocity, color ='pink'}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.prevCollisions = [];
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


class Pellet {
    constructor({ position }){
        this.position = position;
        this.radius = 3;
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill();
        c.closePath();
    }

}



const boundaries = [];
const pellets = [];
const ghosts = [

new Ghost({
    position: {
        x: Boundary.width * 5 + Boundary.width/2,
        y: Boundary.height + Boundary.height/2
    },

    velocity: {
        x: 5,
        y: 0
    }
})

];

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width/2,
        y: Boundary.height + Boundary.height/2
    },

    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    right: {
        pressed: false
    },

    left: {
        pressed: false
    },

    up: {
        pressed: false
    },

    down: {
        pressed: false
    }

}

let lastKey = '';
let score = 0;

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src){
    const image = new Image();
    image.src = src;
    return image;
}


map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/pipeHorizontal.png")
                    })
                )
            break
            case '|':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/pipeVertical.png")
                    })
                )
            break
            case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/pipeCorner1.png")
                    })
                )
            break
            case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/pipeCorner2.png")
                    })
                )
            break
            case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/pipeCorner3.png")
                    })
                )
            break
            case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/pipeCorner4.png")
                    })
                )
            break
            case 'b':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage("./assets/block.png")
                    })
                )
            break
            case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/capLeft.png')
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/capRight.png')
          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/capBottom.png')
          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/capTop.png')
          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/pipeCross.png')
          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/pipeConnectorTop.png')
          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            
            image: createImage('./assets/pipeConnectorBottom.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./assets/pipeConnectorLeft.png')
          })
        )
        break
        case '.':
            pellets.push(
              new Pellet({
                position: {
                  x: j * Boundary.width + Boundary.width / 2,
                  y: i * Boundary.height + Boundary.height / 2
                }
              })
            )
            break

        }
    })
})



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if(keys.up.pressed && lastKey === "up"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
         
            if(collideWithRect({circle: {...player, velocity: {
                x: 0,
                y: -5
                }}, 
            
                rectangle: boundary
            })
            )
{
                player.velocity.y = 0;
                break
            } else {
                player.velocity.y = -5;
            }
        }
    }else if(keys.left.pressed && lastKey === "left"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
         
            if(collideWithRect({circle: {...player, velocity: {
                x: -5,
                y: 0
                }
            }, 
            
                rectangle: boundary}))
            {
                player.velocity.x = 0;
                break
            } else {
                player.velocity.x = -5;
            }
        }
    }else if(keys.down.pressed && lastKey === "down"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
         
            if(collideWithRect({circle: {...player, velocity: {
                x: 0,
                y: 5
                }
            }, 
            
                rectangle: boundary}))
            {
                player.velocity.y = 0;
                break
            } else {
                player.velocity.y = 5;
            }
        }
    }else if(keys.right.pressed && lastKey === "right"){
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
         
            if(collideWithRect({circle: {...player, velocity: {
                x: 5,
                y: 0
                }
            }, 
            
                rectangle: boundary}))
            {
                player.velocity.x = 0;
                break
            } else {
                player.velocity.x = 5;
            }
        }
    }

    for (let i = ghosts.length - 1; 0 <= i; i--) {
        const ghost = ghosts[i];

        if (
          Math.hypot(
            ghost.position.x - player.position.x,
            ghost.position.y - player.position.y
          ) <
          ghost.radius + player.radius
        ) {
            if(score > 0){
            score -= 5;
            }
            scoreText.innerHTML = score;
          }
        }
      
    
      // w
      if (pellets.length === 0) {
        c.clearRect(0, 0, canvas.width, canvas.height); 

        canvas.style.display="none";
        
        document.getElementById("first").style.display="block";
        document.getElementById("second").style.display="block";
        document.getElementById("third").style.display="block";
        document.getElementById("sub").style.display="block";
        document.getElementById("sc").value = score;

      }
    
function collideWithRect({circle, rectangle})  {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (
      circle.position.y - circle.radius + circle.velocity.y <=
        rectangle.position.y + rectangle.height + padding &&
      circle.position.x + circle.radius + circle.velocity.x >=
        rectangle.position.x - padding &&
      circle.position.y + circle.radius + circle.velocity.y >=
        rectangle.position.y - padding &&
      circle.position.x - circle.radius + circle.velocity.x <=
        rectangle.position.x + rectangle.width + padding
    )
  
}

pellets.forEach((pellet,i) => {
    pellet.draw();

    if(Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) < pellet.radius + player.radius){
        pellets.splice(i, 1);
        score += 10;
        scoreText.innerHTML = score;
    }
})

    boundaries.forEach((boundary) => {
        boundary.draw();

        if(collideWithRect({circle: player, rectangle: boundary}))
            {
                player.velocity.x = 0;
                player.velocity.y = 0;

            }
    })
    
    player.update();

    ghosts.forEach((ghost) => {
        ghost.update()
    
        const collisions = []
        boundaries.forEach((boundary) => {
          if (
            !collisions.includes('right') &&
            collideWithRect({
              circle: {
                ...ghost,
                velocity: {
                  x: 2,
                  y: 0
                }
              },
              rectangle: boundary
            })
          ) {
            collisions.push('right')
          }
    
          if (
            !collisions.includes('left') &&
            collideWithRect({
              circle: {
                ...ghost,
                velocity: {
                  x: -2,
                  y: 0
                }
              },
              rectangle: boundary
            })
          ) {
            collisions.push('left')
          }
    
          if (
            !collisions.includes('up') &&
            collideWithRect({
              circle: {
                ...ghost,
                velocity: {
                  x: 0,
                  y: -2
                }
              },
              rectangle: boundary
            })
          ) {
            collisions.push('up')
          }
    
          if (
            !collisions.includes('down') &&
            collideWithRect({
              circle: {
                ...ghost,
                velocity: {
                  x: 0,
                  y: 2
                }
              },
              rectangle: boundary
            })
          ) {
            collisions.push('down')
          }
        })
    
        if (collisions.length > ghost.prevCollisions.length)
          ghost.prevCollisions = collisions
    
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
        
    
          if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
          else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
          else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')
          else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

    
          const pathways = ghost.prevCollisions.filter((collision) => {
            return !collisions.includes(collision)
          })
    
          const direction = pathways[Math.floor(Math.random() * pathways.length)]
    
    
          switch (direction) {
            case 'down':
              ghost.velocity.y = 2
              ghost.velocity.x = 0
              break
    
            case 'up':
              ghost.velocity.y = -2
              ghost.velocity.x = 0
              break
    
            case 'right':
              ghost.velocity.y = 0
              ghost.velocity.x = 2
              break
    
            case 'left':
              ghost.velocity.y = 0
              ghost.velocity.x = -2
              break
          }
    
          ghost.prevCollisions = []
        }
      })
}
animate();



addEventListener('keydown', ({ keyCode }) => {
    
    switch (keyCode) {
        case 37:
            console.log('left');
            keys.left.pressed = true;
            lastKey = "left";
            break;
        
        case 40:
            console.log('down');
            keys.down.pressed = true;
            lastKey = "down";
            break;
        
        case 39:
            console.log('right');
            keys.right.pressed = true;
            lastKey = "right";
            break;
            
        case 38:
            console.log('up');
            keys.up.pressed = true;
            lastKey = "up";
            break;

        case 65:
            console.log('left');
            keys.left.pressed = true;
            lastKey = "left";
            break;
        
        case 83:
            console.log('down');
            keys.down.pressed = true;
            lastKey = "down";
            break;
        
        
        case 68:
            console.log('right');
            keys.right.pressed = true;
            lastKey = "right";
            break;
            
        case 87:
            console.log('up');
            keys.up.pressed = true;
            lastKey = "up";
            break;
    }
    
})

addEventListener('keyup', ({ keyCode }) => {
    
    console.log(keyCode);

    switch (keyCode) {

        case 37:
          
            keys.left.pressed = false;
            
            break;
        
        case 40:
        
            keys.down.pressed = false;
            break;
        
        case 39:
         
            keys.right.pressed = false;

            break;
            
        case 38:
     
            keys.up.pressed = false;
            break;

        case 65:
        
            keys.left.pressed = false;
            
            break;
        
        case 83:
            
            keys.down.pressed = false;
            break;
        
        case 68:
            
            keys.right.pressed = false;
            
            break;
            
        case 87:
            
            keys.up.pressed = false;

            break;

    }
    
})
