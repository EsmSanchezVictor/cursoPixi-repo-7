import { Container, Texture, TilingSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../game/IHitbox";

import { Platform } from "../game/Platform";
import { Player } from "../game/Player";
import { IUpdateable } from "../utils/IUpdateable";




export class Scene extends Container implements IUpdateable {

    private playerLoki: Player;

    private platforms:Platform[];
   
    private world:Container;
    private background: TilingSprite;



    constructor() {

        super();
        this.world = new Container();

        this.background = new TilingSprite(Texture.from("Background"), WIDTH, HEIGHT);
        this.addChild(this.background);

        this.platforms = [];

        let plat = new Platform()
        plat.position.set(150,700);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1000,600);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(1800,500);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform()
        plat.position.set(-500,700);
        this.world.addChild(plat);
        this.platforms.push(plat);

        this.playerLoki = new Player();
        this.world.addChild(this.playerLoki);
        this.addChild(this.world);
    }
    public update(deltaTime: number, _deltaFrame: number): void {

        this.playerLoki.update(deltaTime);

        for (let platform of this.platforms) {
            const overlap = checkCollision(this.playerLoki, platform);
            if (overlap != null)
            {
                this.playerLoki.separate(overlap, platform.position);
            }
        }


        if (this.playerLoki.x > WIDTH) {
            this.playerLoki.x = WIDTH - 430;
        } else if (this.playerLoki.x < 0) {
            this.playerLoki.x = 430;
        }

        if (this.playerLoki.y > HEIGHT) {
            this.playerLoki.y = HEIGHT;
            this.playerLoki.canJump = true;
        }


    }


        


}






