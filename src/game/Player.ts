import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { PhysiscContainer } from "./PhysiscContainer";

export class Player extends PhysiscContainer {

    private static readonly GRAVITY = 100;
    private lokiAnimated: AnimatedSprite;
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
        this.lokiAnimated.anchor.set(1, 1);
        this.lokiAnimated.animationSpeed = 0.25;

        const auxZero = new Graphics;
        auxZero.beginFill(0xff00ff);
        auxZero.drawCircle(0, 0, 10);
        auxZero.endFill();

        this.addChild(this.lokiAnimated);
        this.addChild(auxZero);
        this.acceleration.y = Player.GRAVITY;

    }
    
    public override update(deltaMS: number) {

        super.update(deltaMS / 1000);
        this.lokiAnimated.update(deltaMS / (1000 / 60));

    
        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = 650;
            console.log("derecha");
        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -650;
            console.log("izquierda");
        } else {
            this.speed.x = 0;

        }
    }
}