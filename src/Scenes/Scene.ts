import { Container,/* Texture, TilingSprite, /*Sprite*/ } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";

import { Platform } from "../game/Platform";
import { Player } from "../game/Player";
import { IUpdateable } from "../utils/IUpdateable";




export class Scene extends Container implements IUpdateable {

    private playerLoki: Player;

    private platforms: Platform[];

    private world: Container;

   // private background: TilingSprite;

    private gameSpeed:number=300;

    private timePassed:number=0;



    constructor() {

        super();
        this.world = new Container();
        //   const bg=Sprite.from("Background");
     //   this.background = new TilingSprite(Texture.from("Background"), WIDTH, HEIGHT);
       // this.addChild(this.background);

        this.platforms = [];

        let plat = new Platform()
        plat.position.set(150, 700);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1000, 600);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1800, 500);
        this.world.addChild(plat);
        this.platforms.push(plat);

     // plat = new Platform()
     // plat.position.set(-500, 700);
     // this.world.addChild(plat);
     // this.platforms.push(plat);

        this.playerLoki = new Player();
        this.playerLoki.x=300;
        this.playerLoki.y=300;
        this.playerLoki.scale.set(0.5)
        this.world.addChild(this.playerLoki);

        this.addChild(this.world);
    }
    public update(deltaTime: number, _deltaFrame: number): void {
        this.timePassed +=deltaTime;

        if(this.timePassed > (2000*200/this.gameSpeed))
        {
            this.gameSpeed+=5;
            this.timePassed=0;
            const plat = new Platform()
            plat.position.set(WIDTH, Math.random()*1000);
            this.world.addChild(plat);
            this.platforms.push(plat);
        }

        this.playerLoki.update(deltaTime);

        for (let platform of this.platforms) {
            platform.speed.x=-this.gameSpeed;
            platform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerLoki, platform);
            if (overlap != null) {
                this.playerLoki.separate(overlap, platform.position);
            }
            if(platform.getHitbox().right<0)
            {
                
                platform.destroy();
                            }
        }
        this.platforms=this.platforms.filter((elem)=>!elem.destroyed);

        this.world.x = -this.playerLoki.x * this.worldTransform.a + WIDTH / 4;
       // this.background.tilePosition.x -= this.gameSpeed * deltaTime/1000; this.world.x * 0.2;

        // if (this.playerLoki.x > WIDTH) {
            // this.playerLoki.x = WIDTH - 430;
        //} else if (this.playerLoki.x < 0) {
             this.playerLoki.x = 430;
        // }*/

       if (this.playerLoki.y > HEIGHT) {
            this.playerLoki.y = HEIGHT;
            this.playerLoki.canJump = true;
        }//para perder al caer del mundo


    }





}






