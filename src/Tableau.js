class Tableau extends Phaser.Scene {
    preload() {

        this.load.image("carre", "assets/carre.png")
        this.load.image("cercle", "assets/cercle.png")
    }

    create() {
        this.width = 800;
        this.height = 800;

        this.score = 0;

        this.vie = 3;
        this.nbBrique = 45;

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
         * Physics
         */
        let me = this;

        this.physics.add.collider(this.balle, this.droit);
        this.physics.add.collider(this.balle, this.haut);
        this.physics.add.collider(this.balle, this.gauche);

        this.physics.add.collider(this.balle, this.raquette, function () {
        console.log("touche droit")
            me.rebond(me.raquette);
        });

        if(this.balle.x>this.width)
        {
            this.score +=1;
            this.textscore.setText('Player 1 = ' + this.textscore);
        }
        this.balleAucentre();
        this.initKeyboard();
        this.createbriques();
        this.perdu();
    }

    rebond(raquette) {

        let me = this;

        //console.log(raquette.x)
       // console.log(me.balle.x)
       // console.log((me.balle.x) - (raquette.x))

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.x - raquette.x);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette * 2 - 1);
        console.log(positionRelativeRaquette);

        this.balle.setVelocityX(this.balle.body.velocity.x + positionRelativeRaquette * hauteurRaquette)
    }

    //creationbrique(){
    //    var brique = new Array();
    //    for (let i=1; i<9; i++) {
    //        brique[i] = 'brique'+i;
    //       brique[i] = this.physics.add.sprite(this.brique[i].x+65, 200, 'carre').setOrigin(0, 0);
    //        brique[i].setDisplaySize(60, 30);
     //       brique[i].setImmovable(true);
      //      this.physics.add.collider(this.balle, this.brique[i]);
    //    }
    //}
   // }



    createbriques() {
        //première rangée

        this.brique1 = this.physics.add.sprite(110, 200, 'carre').setOrigin(0, 0);
        this.brique1.setDisplaySize(60, 30);
        this.brique1.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique1);

        this.brique2 = this.physics.add.sprite(this.brique1.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique2.setDisplaySize(60, 30);
        this.brique2.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique2);

        this.brique3 = this.physics.add.sprite(this.brique2.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique3.setDisplaySize(60, 30);
        this.brique3.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique3);

        this.brique4 = this.physics.add.sprite(this.brique3.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique4.setDisplaySize(60, 30);
        this.brique4.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique4);

        this.brique5 = this.physics.add.sprite(this.brique4.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique5.setDisplaySize(60, 30);
        this.brique5.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique5);

        this.brique6 = this.physics.add.sprite(this.brique5.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique6.setDisplaySize(60, 30);
        this.brique6.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique6);

        this.brique7 = this.physics.add.sprite(this.brique6.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique7.setDisplaySize(60, 30);
        this.brique7.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique7);

        this.brique8 = this.physics.add.sprite(this.brique7.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique8.setDisplaySize(60, 30);
        this.brique8.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique8);

        this.brique9 = this.physics.add.sprite(this.brique8.x + 65, 200, 'carre').setOrigin(0, 0);
        this.brique9.setDisplaySize(60, 30);
        this.brique9.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique9);

        //Deuxième rangée
        this.brique10 = this.physics.add.sprite(110, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique10.setDisplaySize(60, 30);
        this.brique10.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique10);

        this.brique11 = this.physics.add.sprite(this.brique10.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique11.setDisplaySize(60, 30);
        this.brique11.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique11);

        this.brique12 = this.physics.add.sprite(this.brique11.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique12.setDisplaySize(60, 30);
        this.brique12.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique12);

        this.brique13 = this.physics.add.sprite(this.brique12.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique13.setDisplaySize(60, 30);
        this.brique13.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique13);

        this.brique14 = this.physics.add.sprite(this.brique13.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique14.setDisplaySize(60, 30);
        this.brique14.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique14);
        this.brique14.setVisible(true);

        this.brique15 = this.physics.add.sprite(this.brique14.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique15.setDisplaySize(60, 30);
        this.brique15.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique15);

        this.brique16 = this.physics.add.sprite(this.brique15.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique16.setDisplaySize(60, 30);
        this.brique16.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique16);

        this.brique17 = this.physics.add.sprite(this.brique16.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique17.setDisplaySize(60, 30);
        this.brique17.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique17);

        this.brique18 = this.physics.add.sprite(this.brique17.x + 65, this.brique1.y + 35, 'carre').setOrigin(0, 0);
        this.brique18.setDisplaySize(60, 30);
        this.brique18.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique18);

        //troisième rangée
        this.brique19 = this.physics.add.sprite(110, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique19.setDisplaySize(60, 30);
        this.brique19.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique19);

        this.brique20 = this.physics.add.sprite(this.brique19.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique20.setDisplaySize(60, 30);
        this.brique20.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique20);

        this.brique21 = this.physics.add.sprite(this.brique20.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique21.setDisplaySize(60, 30);
        this.brique21.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique21);

        this.brique22 = this.physics.add.sprite(this.brique21.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique22.setDisplaySize(60, 30);
        this.brique22.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique22);

        this.brique23 = this.physics.add.sprite(this.brique22.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique23.setDisplaySize(60, 30);
        this.brique23.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique23);
        this.brique23.setVisible(true);

        this.brique24 = this.physics.add.sprite(this.brique23.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique24.setDisplaySize(60, 30);
        this.brique24.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique24);

        this.brique25 = this.physics.add.sprite(this.brique24.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique25.setDisplaySize(60, 30);
        this.brique25.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique25);

        this.brique26 = this.physics.add.sprite(this.brique25.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique26.setDisplaySize(60, 30);
        this.brique26.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique26);

        this.brique27 = this.physics.add.sprite(this.brique26.x + 65, this.brique10.y + 35, 'carre').setOrigin(0, 0);
        this.brique27.setDisplaySize(60, 30);
        this.brique27.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique27);

        //quatrième rangée
        this.brique28 = this.physics.add.sprite(110, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique28.setDisplaySize(60, 30);
        this.brique28.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique28);

        this.brique29 = this.physics.add.sprite(this.brique28.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique29.setDisplaySize(60, 30);
        this.brique29.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique29);

        this.brique30 = this.physics.add.sprite(this.brique29.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique30.setDisplaySize(60, 30);
        this.brique30.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique30);

        this.brique31 = this.physics.add.sprite(this.brique30.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique31.setDisplaySize(60, 30);
        this.brique31.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique31);
        //this.brique32.setTint(256,0,0);

        this.brique32 = this.physics.add.sprite(this.brique22.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique32.setDisplaySize(60, 30);
        this.brique32.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique32);
        this.brique32.setVisible(true);
        //this.brique32.setTint(0,256,0);

        this.brique33 = this.physics.add.sprite(this.brique32.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique33.setDisplaySize(60, 30);
        this.brique33.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique33);

        this.brique34 = this.physics.add.sprite(this.brique24.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique34.setDisplaySize(60, 30);
        this.brique34.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique34);

        this.brique35 = this.physics.add.sprite(this.brique34.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique35.setDisplaySize(60, 30);
        this.brique35.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique35);

        this.brique36 = this.physics.add.sprite(this.brique26.x + 65, this.brique19.y + 35, 'carre').setOrigin(0, 0);
        this.brique36.setDisplaySize(60, 30);
        this.brique36.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique36);

        //cinquième rangée
        this.brique37 = this.physics.add.sprite(110, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique37.setDisplaySize(60, 30);
        this.brique37.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique37);

        this.brique38 = this.physics.add.sprite(this.brique37.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique38.setDisplaySize(60, 30);
        this.brique38.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique38);

        this.brique39 = this.physics.add.sprite(this.brique38.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique39.setDisplaySize(60, 30);
        this.brique39.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique39);

        this.brique40 = this.physics.add.sprite(this.brique39.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique40.setDisplaySize(60, 30);
        this.brique40.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique40);

        this.brique41 = this.physics.add.sprite(this.brique40.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique41.setDisplaySize(60, 30);
        this.brique41.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique41);
        this.brique41.setVisible(true);

        this.brique42 = this.physics.add.sprite(this.brique41.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique42.setDisplaySize(60, 30);
        this.brique42.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique42);

        this.brique43 = this.physics.add.sprite(this.brique42.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique43.setDisplaySize(60, 30);
        this.brique43.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique43);

        this.brique44 = this.physics.add.sprite(this.brique43.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique44.setDisplaySize(60, 30);
        this.brique44.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique44);

        this.brique45 = this.physics.add.sprite(this.brique44.x + 65, this.brique28.y + 35, 'carre').setOrigin(0, 0);
        this.brique45.setDisplaySize(60, 30);
        this.brique45.setImmovable(true);
        this.physics.add.collider(this.balle, this.brique45);
    }


    balleAucentre(){
        this.balle.x = this.width / 2
        this.balle.y = this.height-200
        this.speedX = 0

        this.balle.setVelocityY(Math.random() > 0.5 ? -100 : 100)
        this.balle.setVelocityX(0)
    }


    win() {
        if (nbBrique <= 0){
            alert("Gagné !")
        }
        this.createbriques();
        this.balleAucentre();
    }

    perdu(){
        if (this.vie <= 0){
            alert("perdu")
        }
        this.balleAucentre()
    }

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                // initialisation de la touche en appuis X pour descendre la raquette gauche
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquette.setVelocityX(0)
                    break;
                // initialisation de la touche en appuis S pour Monter la raquette gauche
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquette.setVelocityX(0)
                    break;
            }
        })
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquette.setVelocityX(-300)
                    break;

                case Phaser.Input.Keyboard.KeyCodes.LEFT:
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
        if (this.balle.y < 0) {
            this.balleAucentre();
            this.vie = this.vie-1 ;
        }
    }
}