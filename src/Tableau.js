class Tableau extends Phaser.Scene {
    preload() {

        this.load.image("carre", "assets/carre.png")
        this.load.image("cercle", "assets/cercle.png")
    }

    create() {
        this.width = 800;
        this.height = 800;

        this.score = 0;

        /**
         * Mur Haut
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.haut = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.width, 20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);
        /**
         * Mur gauche
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.gauche = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0);
        this.gauche.setDisplaySize(20, this.height);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);
        /**
         * Mur droit
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.droit = this.physics.add.sprite(this.width-20, 0, 'carre').setOrigin(0, 0);
        this.droit.setDisplaySize(20, this.height);
        this.droit.body.setAllowGravity(false);
        this.droit.setImmovable(true);
        /**
         * Raquette bas
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.raquette = this.physics.add.sprite(this.width/2, this.height-30, 'carre').setOrigin(0, 0);
        this.raquette.setDisplaySize(200, 20);
        this.raquette.body.setAllowGravity(false);
        this.raquette.setImmovable(true);
        this.raquette.setVelocityY(0);
        /**
         * Balle
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.balle = this.physics.add.sprite(this.width / 2, this.height / 2, 'cercle').setOrigin(0, 0);
        this.balle.setDisplaySize(20, 20);
        this.balle.body.setBounce(1.1, 1.1);
        this.balle.setVelocityX(450);
        this.balle.setVelocityY(Phaser.Math.Between(350, 450));
        this.balle.setMaxVelocity(500);

        /**
         * Briques
         */
        this.brique1 = this.physics.add.sprite(110, 200, 'carre').setOrigin(0, 0);
        this.brique1.setDisplaySize(60, 30);

        this.brique2 = this.physics.add.sprite(this.brique1.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique2.setDisplaySize(60, 30);

        this.brique3 = this.physics.add.sprite(this.brique2.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique3.setDisplaySize(60, 30);

        this.brique4 = this.physics.add.sprite(this.brique3.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique4.setDisplaySize(60, 30);

        this.brique5 = this.physics.add.sprite(this.brique4.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique5.setDisplaySize(60, 30);

        this.brique6 = this.physics.add.sprite(this.brique5.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique6.setDisplaySize(60, 30);

        this.brique7 = this.physics.add.sprite(this.brique6.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique7.setDisplaySize(60, 30);

        this.brique8 = this.physics.add.sprite(this.brique7.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique8.setDisplaySize(60, 30);

        this.brique9 = this.physics.add.sprite(this.brique8.x+65, 200, 'carre').setOrigin(0, 0);
        this.brique9.setDisplaySize(60, 30);
        /**
         * Physics
         */
        let me = this;

        this.physics.add.collider(this.balle, this.droit);
        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.gauche);
       // this.physics.add.collider(this.balle, this.droite, function () {
       //     console.log("touche droit")
       //     me.rebond(me.droite);
       // });

        if(this.balle.x>this.width)
        {
            this.score +=1;
            this.textscore.setText('Player 1 = ' + this.textscore);
        }
        this.balleAucentre();
        this.initKeyboard();
    }

    rebond(raquette) {

        let me = this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y) - (raquette.y))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.y - raquette.y);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette * 2 - 1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }

    balleAucentre() {
        this.balle.x = this.width / 2
        this.balle.y = this.height / 2
        this.speedX = 0

        this.balle.setVelocityX(Math.random() > 0.5 ? -100 : 100)
        this.balle.setVelocityY(0)
    }


    win() {

        this.balleAucentre();
    }

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                // initialisation de la touche en appuis X pour descendre la raquette gauche
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.raquette.setVelocityX(0)
                    break;
                // initialisation de la touche en appuis S pour Monter la raquette gauche
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.raquette.setVelocityX(0)
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.raquette.setVelocityX(-300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.raquette.setVelocityX(300)
                    break;

            }
        })
    }

    update() {
        if (this.raquette.x < 20) {
            this.raquette.x = 20
        }
        if (this.raquette.x > 600) {
            this.raquette.x = 600
        }
        if (this.balle.x > this.width) {
            this.win;
        }
        if (this.balle.x < 0) {
            this.win;
        }
    }
}