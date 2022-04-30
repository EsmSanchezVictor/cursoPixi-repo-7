import { Container } from "pixi.js";
import { HEIGHT, WHIDTH } from "..";

import { Player } from "../game/Player";
import { IUpdateable } from "../utils/IUpdateable";




export class Scene extends Container implements IUpdateable {

    private playerLoki: Player;
   



    constructor() {
        super();
        this.playerLoki=new Player();
       
        
        this.addChild(this.playerLoki);
     

    }
    public update(deltaTime: number, _deltaFrame: number): void {

        this.playerLoki.update(deltaTime);
        
       
       

        if(this.playerLoki.x>WHIDTH){
            
            this.playerLoki.x=WHIDTH-430;
            this.playerLoki.speed.x=Math.abs(this.playerLoki.speed.x)*-1;
            this.playerLoki.scale.x=-1;
       
           
            

        }else if (this.playerLoki.x<0)
        {
            this.playerLoki.x=430;
            this.playerLoki.speed.x=Math.abs(this.playerLoki.speed.x);  
            this.playerLoki.scale.x=1; 
          

        }
        if(this.playerLoki.y>HEIGHT){
            this.playerLoki.y=HEIGHT;
            this.playerLoki.speed.y=-1200+HEIGHT*Math.random();
       

        }else if(this.playerLoki.y<250){
            this.playerLoki.y=250;
            this.playerLoki.speed.y=HEIGHT*Math.random();
      
        }

    
    }



}






