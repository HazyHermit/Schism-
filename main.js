class scene1intro extends Phaser.Scene {
    constructor() {
        super({ key: 'scene1intro' });
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
        // this.floor = ground.create(450,600, 'ground').setScale(0.15).refreshBody();
        this.floor = ground.create(600,350, 'ground').setScale(0.15).refreshBody();
        //this.floor.scale = 0.15; 

        this.Sol = this.physics.add.sprite(300, 650, 'Sol').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune = this.physics.add.sprite(100, 450, 'lune').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune.scale = 0.1;
        this.Sol.scale = 0.1;


        this.Lune.setPushable(false);

        this.currentPlayer = this.Sol;


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

        this.add.text(10, 10, 'Click to change character', { fontSize: '22px', fill: '#ecf0f1' });
        this.add.text(10,50, 'press 1,2,3 to switch between scenes.', { fontSize: '22px', fill: '#ecf0f1' });


    // set up Scene switcher
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('Main');
                    break;
                case '2':
                    this.scene.start('scene2');
                    break;
                case '3':
                    this.scene.start('scene3');
                    break;
                default:
                    break;
            }
        }); 
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
            //this.currentPlayer.setVelocityX(0);

           // this.currentPlayer.anims.play('turn');
        }

        if (this.cursors.up.isDown && !this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
            //this.currentPlayer.setVelocityY(-330);

            window.showit = true;
        }

        //this.physics.world.wrap(this.currentPlayer, this.currentPlayer.width/2);
    }
}

class scene2intro extends Phaser.Scene {
    constructor() {
        super({ key: 'scene2intro' });
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

        //const trainstuff = this.physics.add.staticGroup();
        this.trainstuff = this.physics.add.image(700,410, 'train').setScale(0.1);
        //this.trainstuff.scale = 0.1;
        this.trainstuff.setImmovable(true);
        this.trainstuff.body.allowGravity = false;
        //this.trainstuff.setVelocityX(-50); 
        

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

        // for (const treat of this.treat.getChildren())
        // {
        //     treat.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // }


        this.physics.add.collider(this.Sol, ground);
        this.physics.add.collider(this.Lune, ground);
        this.physics.add.collider(this.treat, ground);
        this.physics.add.collider(this.treat,this.trainstuff);

        this.physics.add.collider(this.Sol, this.Lune);
        this.physics.add.collider(this.currentPlayer,this.trainstuff);

        this.physics.add.overlap(this.currentPlayer, this.treat, this.collecttreat, null, this);
        //this.physics.add.collider(this.Lune, this.trainstuff);
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

        //this.add.text(10, 10, 'Click to change character', { fontSize: '22px', fill: '#ecf0f1' });
        this.add.text(10,50, 'press 1,2,3 to switch between scenes.', { fontSize: '22px', fill: '#ecf0f1' });
        this.add.text(10,70, 'only Sol can collect dog treats.', { fontSize: '22px', fill: '#ecf0f1' });


    // set up Scene switcher
        this.input.keyboard.on('keydown', (event) => {
            //console.log(event);
            switch(event.key) {
                case '1':
                    this.scene.start('Main');
                    break;
                case '2':
                    this.scene.start('scene2');
                    break;
                case '3':
                    this.scene.start('scene3');
                    break;
                default:
                    break;
            }
        }); 
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
            //this.currentPlayer.setVelocityX(0);

           // this.currentPlayer.anims.play('turn');
        }

        if (this.cursors.up.isDown && !this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
            //this.currentPlayer.setVelocityY(-330);

            window.showit = true;
        }

        //this.physics.world.wrap(this.currentPlayer, this.currentPlayer.width/2);
    }

    collecttreat(player, treat)
    {
        treat.disableBody(true, true);
    }
}

class scene1intro extends Phaser.Scene {
    constructor() {
        super({ key: 'scene1intro' });
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
            //this.load.image('ground', 'foreground2.png');
            //this.load.image('star', 'src/games/firstgame/assets/star.png');
            //this.load.image('lune', 'lune.png', { frameWidth: 100, frameHeight: 48 });
            //this.load.image('Sol', 'Sol.png', { frameWidth: 32, frameHeight: 48 });
    
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
            // this.floor = ground.create(450,600, 'ground').setScale(0.15).refreshBody();
            this.floor = ground.create(600,350, 'ground').setScale(0.16).refreshBody();
            //this.floor.scale = 0.15; 
            
            //const trainstuff = this.physics.add.staticGroup();
            this.lamp = this.physics.add.image(700,410, 'lamp').setScale(0.29);
            //this.trainstuff.scale = 0.1;
            this.lamp.setImmovable(true).setFlip(true);
            this.lamp.body.allowGravity = false;
            //this.trainstuff.setVelocityX(-50); 
    
            //include treat 
            this.treat = this.physics.add.group({
                key: 'treat',
                repeat: 0,
                setXY: { x: 700, y: 50, stepX: 90 }
            });

            //this.treat.setImmovable(true);
            //this.treat.body.allowGravity = false;
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
            //this.physics.add.collider(this.Lune, this.trainstuff);
            // this.physics.add.collider(Lune, Sol);
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
    
            //this.add.text(10, 10, 'Click to change character', { fontSize: '22px', fill: '#ecf0f1' });
            this.add.text(10,50, 'press 1,2,3 to switch between scenes.', { fontSize: '22px', fill: '#ecf0f1' });
            this.add.text(10,70, 'only Sol can collect dog treats.', { fontSize: '22px', fill: '#ecf0f1' });
    
    
        // set up Scene switcher
            this.input.keyboard.on('keydown', (event) => {
                //console.log(event);
                switch(event.key) {
                    case '1':
                        this.scene.start('Main');
                        break;
                    case '2':
                        this.scene.start('scene2');
                        break;
                    case '3':
                        this.scene.start('scene3');
                        break;
                    default:
                        break;
                }
            }); 
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
                //this.currentPlayer.setVelocityX(0);
    
               // this.currentPlayer.anims.play('turn');
            }
    
            if (this.cursors.up.isDown && !this.currentPlayer.body.touching.down)
            {
                this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
                //this.currentPlayer.setVelocityY(-330);
    
                window.showit = true;
            }
    
            //this.physics.world.wrap(this.currentPlayer, this.currentPlayer.width/2);
        }
        collecttreat(player, treat)
    {
        treat.disableBody(true, true);
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
    scene: [ scene1 , scene2, scene3]
};

const game = new Phaser.Game(config);
