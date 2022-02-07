class Tableau extends Phaser.Scene {
    preload() {

        this.load.image("carre", "assets/carre.png")
        this.load.image("cercle", "assets/cercle.png")
    }

    create() {
        this.width = 800;
        this.height = 800;
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
        this.gauche.setDisplaySize(this.width, 20);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);
        /**
         * Mur droit
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.droit = this.physics.add.sprite(this.width, 0, 'carre').setOrigin(0, 0);
        this.droit.setDisplaySize(800, 20);
        this.droit.body.setAllowGravity(false);
        this.droit.setImmovable(true);
        /**
         * Raquette bas
         * @type {Phaser.Physics.Arcade.Sprite & {body: Phaser.Physics.Arcade.Body}}
         */
        this.bas = this.physics.add.sprite(this.width - 40, 200, 'carre').setOrigin(0, 0);
        this.bas.setDisplaySize(20, 100);
        this.bas.body.setAllowGravity(false);
        this.bas.setImmovable(true);
        this.bas.setVelocityY(0);
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
         * Physics
         */
        let me = this;

        this.physics.add.collider(this.balle, this.bas);
        this.physics.add.collider(this.balle, this.haut);

        this.physics.add.collider(this.balle, this.gauche);
        this.physics.add.collider(this.balle, this.droite, function () {
            console.log("touche droit")
            me.rebond(me.droite);
        });

        if(this.balle<0)
        {
            this.scoreplayer2 +=1;
            this.textplayer1.setText('Player 1 = ' + this.scoreplayer1);

        }

        if(this.balle>this.width)
        {
            this.scoreplayer1  +=1;
            this.textplayer2.setText('Player 2 = ' + this.scoreplayer2);
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

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur) {
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                // initialisation de la touche en appuis X pour descendre la raquette gauche
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(0)
                    break;
                // initialisation de la touche en appuis S pour Monter la raquette gauche
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(0)
                    break;
                // initialisation de la touche en appuis N pour descendre la raquette Droite
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(0)
                    break;
                // initialisation de la touche en appuis J pour Monter la raquette Droite
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(0)
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.droite.setVelocityY(-300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.droite.setVelocityY(300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.gauche.setVelocityY(-300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.gauche.setVelocityY(300)
                    break;
            }
        })
    }

    update() {
        if (this.gauche.y < this.haut.y + 20) {
            this.gauche.y = this.haut.y + 20
        }
        if (this.gauche.y > this.bas.y - 100) {
            this.gauche.y = this.bas.y - 100
        }
        if (this.droite.y < this.haut.y + 20) {
            this.droite.y = this.haut.y + 20
        }
        if (this.droite.y > this.bas.y - 100) {
            this.droite.y = this.bas.y - 100
        }
        if (this.balle.x > this.width) {
            this.win(this.joueurGauche);
        }
        if (this.balle.x < 0) {
            this.win(this.joueurDroite);
        }
    }
}