

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.7;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width, canvas.height)



class Sprite
{
    
    constructor({position, fillStyle, velocity})
    {
        this.position = position; 
        this.fillStyle = fillStyle;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;

        // hit box based on the position of the player
        this.attackBox = 
        {
            position : this.position,
            width : 100,
            height : 50
        }
    }

    draw()
    {
        c.fillStyle = this.fillStyle;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
        //attack box render
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update()
    {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y >= canvas.height)
        {
            this.velocity.y = 0;
        }
        else
        {
            this.velocity.y += gravity;
        }
        
    }
}


const player = new Sprite
(
    {   
        position: 
        {
            x:0,
            y:0
        }, 
        fillStyle : "blue",
        velocity : 
        {
            x : 0,
            y : 10
        }
    }
);

player.draw();

const enemy= new Sprite 
(
    {   
        position: 
        {
            x:600,
            y:0
        }, 
        fillStyle : "red",
        velocity : 
        {
            x : 0,
            y : 0
        }
    }
);

enemy.draw();

const keys = 
{
    a : {pressed: false},
    d : {pressed : false},
    w : {pressed : false},
    ArrowRight : {pressed : false},
    ArrowLeft: {pressed : false},
    ArrowUp: {pressed : false}
};

var lastKey;

function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width, canvas.height);
    player.update();
    enemy.update();

    //PLAYER MOVEMENT
    player.velocity.x = 0;
    if(keys.a.pressed && (player.lastKey === 'a'))
    {
        player.velocity.x = -5;
    }
    else if(keys.d.pressed && player.lastKey === 'd')
    {
        player.velocity.x = 5;
    }

    //ENEMY MOVEMENT
    enemy.velocity.x = 0;
    if(keys.ArrowLeft.pressed && (enemy.lastKey === 'ArrowLeft'))
    {
        enemy.velocity.x = -5;
    }
    else if(keys.ArrowRight.pressed && (enemy.lastKey === 'ArrowRight'))
    {
        enemy.velocity.x = 5;
    }

    // COLLISION DETECTION
    if(detectCollision(player, enemy))
    {
        console.log('hit');
    }
}

function detectCollision(player, enemy)
{
    
    if(
        // player weapon hits the enemy
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        // can only hit the enemy and not continue damaging them when pass them
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        // player weapon hits from above 
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        // can only hit the enemy from above and not continue damaging when landed
        player.attackBox.position.y <= enemy.position.y + enemy.height
      )
    {
        // console.log("attackbox height: " + (player.attackBox.position.y + player.attackBox.height))
        // console.log("attackbox length: " + (player.attackBox.position.x + player.attackBox.width))
        // console.log("attackbox postion x: " + player.attackBox.position.x)
        // console.log("attackbox postion y: " + player.attackBox.position.y)
        // console.log("player positon: " + player.position.x + ", " + player.position.y)
        // console.log("enemy position: " + enemy.position.x + ", " + enemy.position.y)
        return true;
    }
    // else if (enemy.attackBox.position.x + enemy.attackBox.width <= player.attackBox.position.x)
    // {
    //     return true;
    // }
    // else
    // {
    //     return false;
    // }
}

animate();

window.addEventListener('keydown', (event) => 
{
    console.log(event.key);
    switch(event.key)
    {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            keys.w.pressed = true;
            player.lastKey = 'w';
            player.velocity.y = -25;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp';
            enemy.velocity.y = -25;
            break;
    }
})

window.addEventListener('keyup', (event) => 
{
    switch(event.key)
    {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    //enemy keys
    switch(event.key)
    {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
})