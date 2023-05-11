class Example extends Phaser.Scene
{
    cursors;
    currentPlayer;
    Lune;
    Sol;

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('bg', 'bg.png');
        this.load.image('ground', 'foreground.png');
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
        this.imageobject.scale = 0.1;
        

        const ground = this.physics.add.staticGroup();
        this.floor = ground.create(400,290, 'ground').setScale(0.13).refreshBody();
        this.floor.scale = 0.15; 

        this.Sol = this.physics.add.sprite(300, 450, 'Sol').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune = this.physics.add.sprite(100, 450, 'lune').setBounce(0.2).setCollideWorldBounds(true);
        this.Lune.scale = 0.12;
        this.Sol.scale = 0.1;

        // this.Sol.name = 'Sol';
        // this.Lune.name = 'lune';

        this.Lune.setPushable(false);

        this.currentPlayer = this.Sol;

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('Sol', { start: 0, end: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [ { key: 'Sol', frame: 4 } ],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('Sol', { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

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
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.currentPlayer.setAccelerationX(-this.ACCELERATION);
            this.currentPlayer.setFlip(true, false);
            //this.currentPlayer.setVelocityX(-160);

        
        }
        else if (this.cursors.right.isDown)
        {
            this.currentPlayer.setAccelerationX(this.ACCELERATION);
            this.currentPlayer.resetFlip();
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

        if (this.cursors.up.isDown && this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(this.JUMP_VELOCITY);
            //this.currentPlayer.setVelocityY(-330);

            window.showit = true;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
