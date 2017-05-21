 var degToRad = Math.PI / 180.0;

function MyTorpedo(scene, submarine) {
	CGFobject.call(this, scene);


	this.x = submarine.x;// + 1;
	this.y = submarine.y;// - 1;
	this.z = submarine.z;
	this.rot = submarine.dirAngle;

	this.b1_x = this.x;
	console.log("b1_x = " + this.b1_x);
	this.b1_y = this.y;
	console.log("b1_y = " + this.b1_y);
	this.b1_z = this.z;
	console.log("b1_z = " + this.b1_z);

	this.b2_x = this.x+ 6 * Math.sin(this.rot);
	console.log("b2_x = " + this.b2_x);
	this.b2_y = this.y;
	console.log("b2_y = " + this.b2_y);
	this.b2_z = this.z+ 6 * Math.cos(this.rot);
	console.log("b2_z = " + this.b2_z);

	this.target = this.scene.targets[0];

	this.b4_x = this.target.pos_x; //+ 1;
	this.b4_y = this.target.pos_y; //- 1;
	this.b4_z = this.target.pos_z;


	console.log("target_x = " + this.target.pos_x);
	console.log("target_y = " + this.target.pos_y);
	console.log("target_z = " + this.target.pos_z);

	this.b3_x = this.b4_x;
	this.b3_y = this.b4_y + 3;
	this.b3_z = this.b4_z;

	console.log("b3_x = " + this.b3_x);
	console.log("b3_y = " + this.b3_y);
	console.log("b3_z = " + this.b3_z);

	this.speed = 1/Math.sqrt(Math.pow(this.b4_x - this.b1_x,2) + Math.pow(this.b4_y - this.b1_y, 2) + Math.pow(this.b4_z - this.b1_z,2));
	//console.log("tempo = " + (1/this.speed));
	
	this.t = 0;

	this.torpedoFront = new MySemiSphere(scene, 100, 1);
	this.torpedoBody = new MyCylinderV2(scene, 100, 1, 2);
	this.torpedoBack = new MySemiSphere(scene, 100, 1);
	this.fin = new MyTrapezoid(scene);
}


MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.update = function(currTime){
	if (this.t < 1 && this.scene.drawTorpedo == true){
		this.t += this.speed;
		console.log("t= " + this.t);
		this.x = Math.pow(1-this.t,3) * this.b1_x + 3* this.t * Math.pow(1-this.t,2)*this.b2_x+3*Math.pow(this.t,2)*(1-this.t)*this.b3_x+Math.pow(this.t,3)*this.b4_x;
		this.y = Math.pow(1-this.t,3) * this.b1_y + 3* this.t * Math.pow(1-this.t,2)*this.b2_y+3*Math.pow(this.t,2)*(1-this.t)*this.b3_y+Math.pow(this.t,3)*this.b4_y;
		this.z = Math.pow(1-this.t,3) * this.b1_z + 3* this.t * Math.pow(1-this.t,2)*this.b2_z+3*Math.pow(this.t,2)*(1-this.t)*this.b3_z+Math.pow(this.t,3)*this.b4_z;
	}
	else{
		this.scene.drawTorpedo = false;
		this.scene.targets.shift();
	}
}

MyTorpedo.prototype.display = function () {
	
	//this.scene.translate(2,2,2);
	//this.scene.translate(submarine.x, submarine.y, submarine.z);
	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI/2,0,1,0);
	this.scene.scale(1.5,1,1);
	this.scene.translate(1,-1,0);
	this.scene.pushMatrix();
	//this.scene.rotate(this.rot, 0, 1, 0);
	//this.scene.rotate(this.decline, 1, 0, 0);
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

	this.scene.popMatrix();

}