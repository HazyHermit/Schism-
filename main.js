class scene1intro extends Phaser.Scene {
    constructor() {
        super({ key: 'scene1intro' });
    }

    create ()
    {
        this.cameras.main.setBackgroundColor("#443D45");
        this.add.text(10,50, 'Scene 1: Use arrow keys to get to the red arrow!', { fontSize: '22px', fill: '#ecf0f1' }); 
        this.add.text(10,70, 'click anywhere to begin.', { fontSize: '22px', fill: '#ecf0f1' });
        this.input.on('pointerdown', () =>
        {
            this.scene.start('Main')

        }, this);
    }

}

class scene1 extends Phaser.Scene
{
    constructor() {
        super({ key: 'Main' });
    }

    cursors;
    currentPlayer;
    Lune;
    Sol;

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('bg', 'bg.png');
        this.load.image('ground', 'foreground2.png');
        //this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.image('arrow', 'arrowscale.png')
        this.load.image('lune', 'lune.png', { frameWidth: 100, frameHeight: 48 });
        this.load.image('Sol', 'Sol.png', { frameWidth: 32, frameHeight: 48 });

    }

    create ()
    {
        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1000;
        this.physics.world.gravity.y = 3000;

        //include bg 
        this.imageobject = this.add.image(400, 300, 'bg');
        this.imageobject.scale = 0.143;
        

        const ground = this.physics.add.staticGroup();
        
        this.floor = ground.create(600,350, 'ground').setScale(0.15).refreshBody();
         

        this.Sol = this.physics.add.sprite(300, 650, 'Sol').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune = this.physics.add.sprite(100, 450, 'lune').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune.scale = 0.1;
        this.Sol.scale = 0.1;


        this.Lune.setPushable(false);

        this.currentPlayer = this.Sol;


        //include arrow 
        this.arrow = this.physics.add.image(850,510, 'arrow').setScale(0.1)
        //.setFontSize(this.s * 2)
            .setInteractive()
            .setImmovable(true)
            .setVelocity(0)
            .on('pointover', ()=> {
                this.scene.start('scene2intro')
            })
        
        this.arrow.body.allowGravity = false;
            
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.Sol, ground);
        this.physics.add.collider(this.Lune, ground);

        this.physics.add.collider(this.Sol, this.Lune);

        // this.physics.add.collider(Lune, Sol);

        window.body1 = this.Sol.body;
        window.physics = this.physics;
        window.showit = false;

        this.input.on('pointerdown', () =>
        {

            if (this.currentPlayer === this.Sol)
            {
                this.currentPlayer = this.Lune;
            }
            else
            {
                this.currentPlayer = this.Sol;
            }

        }, this);

        this.add.text(10, 10, 'Click anywhere to change character', { fontSize: '22px', fill: '#ecf0f1' });
        //this.add.text(10,50, 'press 1,2,3 to switch between scenes.', { fontSize: '22px', fill: '#ecf0f1' });

    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.currentPlayer.setAccelerationX(-this.ACCELERATION);
            this.currentPlayer.resetFlip();
            //this.currentPlayer.setVelocityX(-160);

        
        }
        else if (this.cursors.right.isDown)
        {
            this.currentPlayer.setAccelerationX(this.ACCELERATION);
            
            this.currentPlayer.setFlip(true, false);
           
        }
        else
        {
            this.currentPlayer.setAccelerationX(0);
            this.currentPlayer.setDragX(this.DRAG);
            //this.currentPlayer.setVelocityX(0);

           // this.currentPlayer.anims.play('turn');
        }

        if (this.cursors.up.isDown && !this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
            //this.currentPlayer.setVelocityY(-330);

            window.showit = true;
        }

        this.physics.world.collide(this.currentPlayer, this.arrow, function(){
            game.scene.start('scene2intro')
        });

    }
}

class scene2intro extends Phaser.Scene {
    constructor() {
        super({ key: 'scene2intro' });
    }

    create ()
    {
        this.cameras.main.setBackgroundColor("#443D45");
        this.add.text(10,50, 'Huzzah!! You know how to move!!', { fontSize: '22px', fill: '#ecf0f1' }); 
        this.add.text(10,70, 'Scene 2: Use arrow keys to get onto the train to retrieve a treat.', { fontSize: '22px', fill: '#ecf0f1' }); 
        this.add.text(10,100, 'Click anywhere to begin.', { fontSize: '22px', fill: '#ecf0f1' }); 
        this.input.on('pointerdown', () =>
        {
            this.scene.start('scene2')

        }, this);
    }
}

class scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene2' });
    }

    cursors;
    currentPlayer;
    Lune;
    Sol;

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('train bg', 'train bg.png');
        this.load.image('train', 'train.png')
        this.load.image('ground', 'foreground2.png');
        this.load.image('treat', 'treat.PNG');
        this.load.image('arrow', 'arrowscale.png')
        this.load.image('lune', 'lune.png', { frameWidth: 100, frameHeight: 48 });
        this.load.image('Sol', 'Sol.png', { frameWidth: 32, frameHeight: 48 });

    }

    create ()
    {
        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 500;   // pixels/second
        this.MAX_Y_VEL = 5000;
        this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
        this.JUMP_VELOCITY = -1000;
        this.physics.world.gravity.y = 3000;

        //include bg 
        this.imageobject = this.add.image(400, 310, 'train bg');
        this.imageobject.scale = 0.125;


        this.trainstuff = this.physics.add.image(700,410, 'train').setScale(0.1);
        this.trainstuff.setImmovable(true);
        this.trainstuff.body.allowGravity = false;


        //include arrow 
        this.arrow = this.physics.add.image(850,510, 'arrow').setScale(0.1)
        //.setFontSize(this.s * 2)
            .setInteractive()
            .setImmovable(true)
            .setVelocity(0)
            .on('pointover', ()=> {
                this.scene.start('scene3intro')
            })
        
        this.arrow.body.allowGravity = false;
        

        const ground = this.physics.add.staticGroup();
        this.floor = ground.create(600,450, 'ground').setScale(0.156).refreshBody();
        //this.floor.scale = 0.15; 

        this.Sol = this.physics.add.sprite(300, 450, 'Sol').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune = this.physics.add.sprite(100, 450, 'lune').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune.scale = 0.1;
        this.Sol.scale = 0.1;


        this.Lune.setPushable(false);

        this.currentPlayer = this.Sol;


        this.cursors = this.input.keyboard.createCursorKeys();

        this.treat = this.physics.add.group({
            key: 'treat',
            repeat: 0,
            setXY: { x: 800, y: 50, stepX: 90 }
        });
        this.treat.scale = 0.00000000765;

        


        this.physics.add.collider(this.Sol, ground);
        this.physics.add.collider(this.Lune, ground);
        this.physics.add.collider(this.treat, ground);
        this.physics.add.collider(this.treat,this.trainstuff);
        //this.physics.add.collider(this.arrow, ground)

        this.physics.add.collider(this.Sol, this.Lune);
        this.physics.add.collider(this.currentPlayer,this.trainstuff);

        this.physics.add.overlap(this.currentPlayer, this.treat, this.collecttreat, null, this);


        window.body1 = this.Sol.body;
        window.physics = this.physics;
        window.showit = false;

        

        this.input.on('pointerdown', () =>
        {

            if (this.currentPlayer === this.Sol)
            {
                this.currentPlayer = this.Lune;
            }
            else
            {
                this.currentPlayer = this.Sol;
            }

        }, this);

        
        this.add.text(10,70, 'only Sol can collect dog treats.', { fontSize: '22px', fill: '#ecf0f1' });

    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.currentPlayer.setAccelerationX(-this.ACCELERATION);
            this.currentPlayer.resetFlip();
            //this.currentPlayer.setVelocityX(-160);

        
        }
        else if (this.cursors.right.isDown)
        {
            this.currentPlayer.setAccelerationX(this.ACCELERATION);
            
            this.currentPlayer.setFlip(true, false);
            //this.currentPlayer.setVelocityX(160);

           // this.currentPlayer.anims.play('right', true);
        }
        else
        {
            this.currentPlayer.setAccelerationX(0);
            this.currentPlayer.setDragX(this.DRAG);
        }

        if (this.cursors.up.isDown && !this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
            //this.currentPlayer.setVelocityY(-330);

            window.showit = true;
        }

        this.physics.world.collide(this.currentPlayer, this.arrow, function(){
            game.scene.start('scene3intro')
        });
        //this.physics.world.wrap(this.currentPlayer, this.currentPlayer.width/2);
    }

    collecttreat(player, treat)
    {
        treat.disableBody(true, true);
    }
}

class scene3intro extends Phaser.Scene {
    constructor() {
        super({ key: 'scene3intro' });
    }

    create ()
    {
        this.cameras.main.setBackgroundColor("#443D45");
        this.add.text(10,50, 'Almost there!!', { fontSize: '22px', fill: '#ecf0f1' }); 
        this.add.text(10,70, 'Scene 3: Now apply what you learned to get the treat and arrow!!', { fontSize: '22px', fill: '#ecf0f1' }); 
        this.add.text(10,100, 'Click anywhere to begin.', { fontSize: '22px', fill: '#ecf0f1' });
        this.input.on('pointerdown', () =>
        {
            this.scene.start('scene3')

        }, this);
    }
}

class scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene3' });
    }
        cursors;
        currentPlayer;
        Lune;
        Sol;
    
        preload ()
        {
            this.load.path = './assets/';
            //this.load.image('train bg', 'train bg.png');
            this.load.image('lamp', 'lamp.png')
            this.load.image('treat', 'treat.PNG');

        }
    
        create ()
        {
            // variables and settings
            this.ACCELERATION = 500;
            this.MAX_X_VEL = 500;   // pixels/second
            this.MAX_Y_VEL = 5000;
            this.DRAG = 600;    // DRAG < ACCELERATION = icy slide
            this.JUMP_VELOCITY = -1000;
            this.physics.world.gravity.y = 3000;
    
            //include bg 
            this.imageobject = this.add.image(400, 300, 'bg');
            this.imageobject.scale = 0.143;
            

            const ground = this.physics.add.staticGroup();
            this.floor = ground.create(600,350, 'ground').setScale(0.16).refreshBody();

            
            //const trainstuff = this.physics.add.staticGroup();
            this.lamp = this.physics.add.image(700,410, 'lamp').setScale(0.29);
            //this.trainstuff.scale = 0.1;
            this.lamp.setImmovable(true).setFlip(true);
            this.lamp.body.allowGravity = false;
            //this.trainstuff.setVelocityX(-50); 

            //include arrow 
            this.arrow = this.physics.add.image(850,510, 'arrow').setScale(0.1)
            //.setFontSize(this.s * 2)
                .setInteractive()
                .setImmovable(true)
                .setVelocity(0)
            this.arrow.body.allowGravity = false;

            //include treat 
            this.treat = this.physics.add.group({
                key: 'treat',
                repeat: 0,
                setXY: { x: 700, y: 50, stepX: 90 }
            });

            
            this.treat.scale = 0.00000000765;


            //include characters 
            this.Sol = this.physics.add.sprite(300, 450, 'Sol').setBounce(0.2).setCollideWorldBounds(true);
            this.Lune = this.physics.add.sprite(100, 450, 'lune').setBounce(0.2).setCollideWorldBounds(true);
            this.Lune.scale = 0.1;
            this.Sol.scale = 0.1;
    
            this.Lune.setPushable(false);
    
            this.currentPlayer = this.Sol;
    
    
            this.cursors = this.input.keyboard.createCursorKeys();
    
            this.physics.add.collider(this.Sol, ground);
            this.physics.add.collider(this.Lune, ground);
            this.physics.add.collider(this.treat, this.floor);
            this.physics.add.collider(this.treat,this.lamp);
            this.physics.add.collider(this.Sol, this.Lune);
            this.physics.add.collider(this.currentPlayer,this.lamp);
           
            this.physics.add.overlap(this.currentPlayer, this.treat, this.collecttreat, null, this);
            
    
            window.body1 = this.Sol.body;
            window.physics = this.physics;
            window.showit = false;
    
            this.input.on('pointerdown', () =>
            {
    
                if (this.currentPlayer === this.Sol)
                {
                    this.currentPlayer = this.Lune;
                }
                else
                {
                    this.currentPlayer = this.Sol;
                }
    
            }, this);
    
            this.add.text(10,70, 'only Sol can collect dog treats.', { fontSize: '22px', fill: '#ecf0f1' });
    
    
        }
    
        update ()
        {
            if (this.cursors.left.isDown)
            {
                this.currentPlayer.setAccelerationX(-this.ACCELERATION);
                this.currentPlayer.resetFlip();
    
            
            }
            else if (this.cursors.right.isDown)
            {
                this.currentPlayer.setAccelerationX(this.ACCELERATION);
                
                this.currentPlayer.setFlip(true, false);
              
            }
            else
            {
                this.currentPlayer.setAccelerationX(0);
                this.currentPlayer.setDragX(this.DRAG);
            
            }
    
            if (this.cursors.up.isDown && !this.currentPlayer.body.touching.down)
            {
                this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
                
    
                window.showit = true;
            }

            this.physics.world.collide(this.currentPlayer, this.arrow, function(){
                game.scene.start('outro')
            });

        }
        collecttreat(player, treat)
    {
        treat.disableBody(true, true);
    }
    }

class outro extends Phaser.Scene {
    constructor() {
        super({ key: 'outro' });
    }
    
    create ()
    {
        this.cameras.main.setBackgroundColor("#443D45");
        this.add.text(10,50, 'Thank you for playing!!', { fontSize: '22px', fill: '#ecf0f1' }); 
    
    }
}


const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [ scene1intro, scene1 , scene2intro, scene2, scene3intro, scene3, outro]
};

const game = new Phaser.Game(config);
