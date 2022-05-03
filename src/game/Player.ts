import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";
import { PhysiscContainer } from "./PhysiscContainer";

export class Player extends PhysiscContainer implements IHitbox{

    private static readonly GRAVITY = 100;
    private static readonly MOVE_SPEED = 100;
    public canJump=true;
    private lokiAnimated: AnimatedSprite;
    private hitbox:Graphics;
    constructor() {
        super();
        //animated sprite
        this.lokiAnimated = new AnimatedSprite(
            [
                Texture.from("corre1"),
                Texture.from("corre2"),
                Texture.from("corre3"),
                Texture.from("corre3"),
                Texture.from("corre5"),
                Texture.from("corre6"),
                Texture.from("corre7"),
                Texture.from("corre8")
            ], true
        );
        this.lokiAnimated.play();
        this.lokiAnimated.anchor.set(0.5, 1);
        this.lokiAnimated.animationSpeed = 0.25;

        const auxZero = new Graphics;
        auxZero.beginFill(0xff00ff);
        auxZero.drawCircle(0, 0, 10);
        auxZero.endFill();

        //---caja----
        this.hitbox=new Graphics();
        this.hitbox.beginFill(0xff00ff,0.3);
        this.hitbox.drawRect(0,0,450,230);
        this.hitbox.endFill;
        this.hitbox.x=-250;
        this.hitbox.y=-250;
        


        this.addChild(this.lokiAnimated);
        this.addChild(auxZero);
        this.lokiAnimated.addChild(this.hitbox);

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("ArrowUp",this.jump, this);

    }
    
    public override  destroy(options:any) {
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
    }

    public override update(deltaMS: number) {

        super.update(deltaMS / 1000);
        this.lokiAnimated.update(deltaMS / (1000 / 60));

    
        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = Player.MOVE_SPEED;
            this.lokiAnimated.scale.x=1;
            this.lokiAnimated.play();

        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Player.MOVE_SPEED;
            this.lokiAnimated.scale.x=-1;
            this.lokiAnimated.play();
        } else {
            this.speed.x = 0;
            this.lokiAnimated.stop();
        }

        
    }
    private jump(){
        if(this.canJump)
        {
            this.canJump=false;
            this.speed.y = -1000;
        }
    }
    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds();
    }
    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height)
                {
                    if (this.x > platform.x)
                    {
                        this.x += overlap.width;
                    }else if (this.x < platform.x)
                    {
                        this.x -= overlap.width;
                    }

                }
                else
                {
                    if (this.y > platform.y)
                    {
                        this.y -= overlap.height;
                        this.speed.y = 0;
                        this.canJump = true;
                    }else if (this.y < platform.y)
                    {
                        this.y += overlap.height;
                    }
                }
    }
}