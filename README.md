# Schism
    A point and click exploration game made by Hazelle Malonzo 

# Where to play your game (a link to your deployed game)

# How your design satisfies the experience requirements below
    The game uses both continuous and discrete inputs from the player: 
        continuous - Player can hold down arrow keys to move left, right, or jump. 
        discrete - Player can also press number keys to change scenes. Player can also collect treats using Sol.

    The player’s goal can only be achieved indirectly (by allowing the physics engine to move key objects into position/contact): 
        In scene 3, player has to move a crate to get up and over the train. If player is controlling Lune, they can also move Sol around. 

    3+ physics-based gameplay scenes (possibly implemented with a single Phaser Scene subclass).- 
        scene 1: non pushable and pushable characters (Lune can push sol because sol is a smol dog, but sol can not push Lune), player can switch between Lune and Sol. 
        scene 2: Sol has to jump onto the train to get to the treat. 
        scene 3: Sol has to collect the treat on top of the lamp.

    Other scenes are used to separate and contextualize the gameplay scenes - 


# How all of your data assets (if you have any) were created
    All assets were created by Hazelle Malonzo in Illustrator and Procreate. 

# Coding References 
    side scroller - https://labs.phaser.io/edit.html?src=src/tilemap/mario%20map%20scroller.js 
    non pushable characters - https://labs.phaser.io/edit.html?src=src/physics/arcade/non%20pushable%20bodies.js 

    https://janisjenny.medium.com/how-to-set-world-bounds-with-phaser-99bde692970e 

    https://phaser.discourse.group/t/change-scene-on-player-collision/5218/7 