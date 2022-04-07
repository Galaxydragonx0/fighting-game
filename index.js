const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


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
    }

    draw()
    {
        c.fillStyle = this.fillStyle;
        c.fillRect(this.position.x, this.position.y, 50, 150)
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
            y : 0
        }
    }
);

console.log(player)
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


function animate()
{
    window.requestAnimationFrame(animate);
    console.log('test');
}

//animate();