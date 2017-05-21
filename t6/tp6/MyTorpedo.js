 var degToRad = Math.PI / 180.0;

function MyTorpedo(scene, submarine) {
	CGFobject.call(this, scene);


	this.x = submarine.x;
	this.y = submarine.y + 1;
	this.z = submarine.z;
	this.rot = submarine.angleSpeed;
	this.decline = submarine.upDown;


	this.target = this.scene.target;


	this.torpedoFront = new MySemiSphere(scene, 100, 1);
	this.torpedoBody = new MyCylinderV2(scene, 100, 1, 2);
	this.torpedoBack = new MySemiSphere(scene, 100, 1);
	this.fin = new MyTrapezoid(scene);
}


MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function () {

this.scene.translate(2,2,2);
	//this.scene.translate(submarine.x, submarine.y, submarine.z);
	this.scene.pushMatrix();
	this.scene.rotate(this.rot, 0, 1, 0);
	this.scene.rotate(this.decline, 1, 0, 0);
    this.scene.pushMatrix();
	this.scene.rotate(-90*degToRad, 0, 1, 0);
	this.scene.scale(0.22, 0.22, 0.15);
    this.torpedoBack.display();
    this.scene.popMatrix();

    
    this.scene.pushMatrix();
    this.scene.translate(0.8,0,0);
    this.scene.rotate(-90*degToRad, 0, 1, 0);
	this.scene.scale(0.22, 0.22, 0.8);
    this.torpedoBody.display();
    this.scene.popMatrix();
    

    this.scene.pushMatrix();
    this.scene.translate(0.8,0,0);
    this.scene.rotate(90*degToRad, 0, 1, 0);
	this.scene.scale(0.22, 0.22, 0.15);
   	this.torpedoFront.display();
   	this.scene.popMatrix();


    this.scene.pushMatrix();
	this.scene.scale(0.4, 0.3, 0.3);
	this.scene.translate(-0.2, 0, -0.05);
    this.fin.display();
    this.scene.popMatrix();
        

    this.scene.pushMatrix();
	this.scene.scale(0.4, 0.3, 0.3);
	this.scene.rotate(90*degToRad, 1, 0, 0);
	this.scene.translate(-0.2, 0, -0.05);
    this.fin.display();
    this.scene.popMatrix();
	this.scene.popMatrix();

}