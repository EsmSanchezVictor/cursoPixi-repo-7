import { AnimatedSprite, Container, Texture } from "pixi.js";
import { HEIGHT, WHIDTH } from ".";
import { PhysiscContainer } from "./game/PhysiscContainer";
import { IUpdateable } from "./utils/IUpdateable";




export class Scene extends Container implements IUpdateable {
    private lokiAnimated: AnimatedSprite;
    private physloki: PhysiscContainer;
   



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
            ], false
        );
        this.lokiAnimated.play();
        this.lokiAnimated.anchor.set(1,1);
        this.lokiAnimated.animationSpeed = 0.25;


        this.physloki = new PhysiscContainer();
        this.physloki.speed.x = 250;
        this.physloki.speed.y = 0;
        this.physloki.acceleration.y=20;

            this.physloki.x=500;
            this.physloki.y=500;
        this.addChild(this.physloki);
        

    

        this.physloki.addChild(this.lokiAnimated);
   


    }
    public update(deltaTime: number, deltaFrame: number): void {

        this.lokiAnimated.update(deltaFrame);
        
        const dt = deltaTime / 1000;
        
        this.physloki.update(dt);
       

        if(this.physloki.x>WHIDTH){
            
            this.physloki.x=WHIDTH-430;
            this.physloki.speed.x=Math.abs(this.physloki.speed.x)*-1;
            this.physloki.scale.x=-1;
       
           
            

        }else if (this.physloki.x<0)
        {
            this.physloki.x=430;
            this.physloki.speed.x=Math.abs(this.physloki.speed.x);  
            this.physloki.scale.x=1; 
          

        }
        if(this.physloki.y>HEIGHT){
            this.physloki.y=HEIGHT;
            this.physloki.speed.y=-1200+HEIGHT*Math.random();
       

        }else if(this.physloki.y<250){
            this.physloki.y=250;
            this.physloki.speed.y=HEIGHT*Math.random();
      
        }

    
    }



}






