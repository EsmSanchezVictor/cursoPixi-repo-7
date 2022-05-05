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
                Texture.from("0"),
           //     Texture.from("1"),
           //     Texture.from("2"),
           //     Texture.from("3"),
           //     Texture.from("4"),
                Texture.from("5"),
            //   Texture.from("6"),
            //   Texture.from("7"),
            //   Texture.from("8"),
            //   Texture.from("9"),
                Texture.from("10"),
            //   Texture.from("11"),
            //   Texture.from("12"),
            //   Texture.from("13"),
               Texture.from("14"),
             //   Texture.from("15"),
            ], true
        );
        this.lokiAnimated.play();
        this.lokiAnimated.anchor.set(0.5, 1);
        this.lokiAnimated.animationSpeed = 0.65;

        const auxZero = new Graphics;
        auxZero.beginFill(0xff00ff);
        auxZero.drawCircle(0, 0, 10);
        auxZero.endFill();

        //---caja----
        this.hitbox=new Graphics();
        this.hitbox.beginFill(0xff00ff,0.3);
        this.hitbox.drawRect(0,0,250,330);
        this.hitbox.endFill;
        this.hitbox.x=-150;
        this.hitbox.y=-350;
        


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