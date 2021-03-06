import {  Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysiscContainer } from "./PhysiscContainer";

export class Platform extends PhysiscContainer /*Container  nover el pato*/ implements IHitbox {
    private hitbox: Graphics;
    
    constructor()
    {
        super();
        const spr = Sprite.from("Platform");
        this.addChild(spr);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF, 0.3);
        this.hitbox.drawRect(0,0,384,93);
        this.hitbox.endFill();
        this.addChild(this.hitbox);
        
    }

    public getHitbox():Rectangle
    {
        return this.hitbox.getBounds()
    }
}