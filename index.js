const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.2;

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width, canvas.height)



class Sprite
{
    
    constructor({position, fillStyle, velocity, lastKey})
    {
        this.position = position; 
        this.fillStyle = fillStyle;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey = lastKey;
    }

    draw()
    {
        c.fillStyle = this.fillStyle;
        c.fillRect(this.position.x, this.position.y, 50, this.height)
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

    player.velocity.x = 0;
    if(keys.a.pressed && (lastKey === 'a'))
    {
        player.velocity.x = -1;
    }
    else if(keys.d.pressed && lastKey === 'd')
    {
        player.velocity.x = 1;
    }
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
            player.velocity.y = -10;
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
            enemy.velocity.y = -10;
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
})