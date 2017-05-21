var degToRad = Math.PI / 180.0;

function MySubmarine(scene, x=0, y=0, z=0) {
	CGFobject.call(this,scene);

    this.x=x;
    this.y=y;
    this.z=z;

    this.dirAngle=degToRad*90;

    this.speed=0.00;
    this.accel=0.05;
	this.rotSpeed=0.05;
	this.rotAccel=0.05;
	
	this.declination=degToRad * 0;
	this.angleSpeed=0;

	this.heliceAngle = 0;
	this.finAngle = 0;

	this.up=0;
	this.down=0;

	this.semi = new MySemiSphere(scene, 200,1);
	this.body = new MyCylinder(scene,128,1);
	this.upbody = new MyCylinderV2(scene, 100, 1, true);
	this.propeller = new MyCylinderV2(scene, 100,1,false);
	this.helice = new MyUnitCubeQuad(scene);
	//this.fin = new MyPrism(scene,4,1);
	this.fin = new MyTrapezoid(scene);
	//this.horizontalBackFin = new MyTrapezoid(scene);


	this.topSubmarineAppearance = new CGFappearance(scene);
	this.topSubmarineAppearance.loadTexture("../resources/images/topsphere.png");
	
	this.bodySubmarineAppearance = new CGFappearance(scene);
	this.bodySubmarineAppearance.loadTexture("../resources/images/bodycylinder.png");

	this.submarineAppearance2 = new CGFappearance(scene);
	this.submarineAppearance2.loadTexture("../resources/images/body2.png");
	
	this.currentAppearance = 0;
	
	this.submarineAppearances = [
	this.bodySubmarineAppearance ,
	this.submarineAppearance2
	];

	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

/*MySubmarine.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0.0,
            -0.5, 0.3, 0.0,
            0.0, 0.3, 2
			];


 	this.indices = [
 	0, 1, 2,
 	2, 1, 0
 	];

    this.normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    ]
    
  this.texCoords = [
    this.minS, this.maxT, //(0,1)
    this.maxS,  this.maxT, //(1,1)
    this.minS,  this.minT  
    ]






 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
*/

 MySubmarine.prototype.increaseVeloc = function(){
	
    if (this.speed >= 5){
        this.speed = 5;
    }
    else{
        this.speed += this.accel;
    }
}

MySubmarine.prototype.decreaseVeloc = function(){
  
    if (this.speed <= -5){
        this.speed = -5;
    }
    else{
        this.speed -= this.accel;
    }
}

MySubmarine.prototype.rotate = function(direction) {

	//direction=0 ->right

	if(direction==0){
		this.dirAngle-=this.rotSpeed;
 		this.dirAngle %= degToRad*360;
 		this.finAngle = 45;
	}
	else{
		this.dirAngle+=this.rotSpeed;
 		if(this.dirAngle<0)
 		this.dirAngle=360 * degToRad * dirAngle-this.rotSpeed;
 		this.finAngle = -45;
	}
}

MySubmarine.prototype.setDeclination = function(direction){
	if (this.direction==0){
		this.down=1;
	}
	else
	{
		this.up=1;
	} 
}

MySubmarine.prototype.dive = function(direction) {
	// 0 -> down
	if (direction == 0) {
		this.down=1;
		this.declination -= Math.sin(this.angleSpeed * this.degToRad);
		if (this.declination < -25)
		this.declination = -25;
	}
	else {
		this.up=1;
		this.declination += Math.sin(this.angleSpeed * this.degToRad);
		if (this.declination > 25)
		this.declination = 25;
	}
}


 MySubmarine.prototype.update = function(currTime){



 	this.x += (this.speed) * Math.sin(this.dirAngle);
 	this.z +=(this.speed) * Math.cos(this.dirAngle);
 	//this.speed *= 0.99;

	if(this.up==1){
		if(angleSpeed>=25)
		angleSpeed=25;
		else {
			this.submarine.angleSpeed += 1;
			this.dive(1);
	}
	}	

	if(this.down==1){
		if(angleSpeed<=-25)
		angleSpeed=-25;
		else {
			this.submarine.angleSpeed -= 1;
			this.dive(0);
		}
	}
 	this.heliceAngle += this.speed/0.05 * (1/100) * 360;

 }


 MySubmarine.prototype.display = function(){

 	//Draw submarine front and back
		this.scene.pushMatrix();
		this.scene.translate(0,0,4.08);
		this.scene.scale(0.73, 0.8, 0.46);
		this.topSubmarineAppearance.apply();
		this.semi.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.73, 0.8, 0.46);
		this.scene.rotate(degToRad*180,1,0,0);
		this.topSubmarineAppearance.apply();
		this.semi.display();
		this.scene.popMatrix();

	//Draw up part from submarin
		this.scene.pushMatrix();
		this.scene.scale(0.4, 2, 0.64);
		this.scene.translate(0, 0.8, 2.2);
		this.scene.rotate(90 * degToRad, 1, 0, 0);
		this.upbody.display();
		this.scene.popMatrix();


	
	//Draw propellers
		this.scene.pushMatrix();
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.translate(-3.35, -0.8, 1);
		this.propeller.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.3, 0.3, 0.3);
		this.scene.translate(3.35, -0.8, 1);
		this.propeller.display();
		this.scene.popMatrix();


	//Draw fins
		this.scene.pushMatrix();
		this.scene.translate(0,0,-0.1);
		this.scene.rotate(this.finAngle*degToRad,0,1,0);
		this.scene.translate(0.05,0,-0.2);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(1.5,1,1);
		this.fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.05,-0.3);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(1.5,1,1);
		this.fin.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,1.25,1.4);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(1.5,0.7,1);
		this.fin.display();
		this.scene.popMatrix();

	  //Draw Periscope 
 
		this.scene.pushMatrix(); 
		this.scene.translate(0,1.5,1.75); 
		this.scene.rotate(-Math.PI/2,1,0,0); 
		this.scene.scale(0.05,0.05,1); 
		this.upbody.display(); 
		this.scene.popMatrix(); 

		this.scene.pushMatrix(); 
		this.scene.translate(0,2.45,1.75); 
		this.scene.scale(0.05,0.05,0.2); 
		this.upbody.display(); 
		this.scene.popMatrix();

	   
	//Draw helices
		this.scene.pushMatrix();
		this.scene.translate(-1,-0.25,0.4);
		this.scene.rotate(this.heliceAngle * degToRad,0,0,1);
		this.scene.rotate(-90*degToRad,1,0,0);
		this.scene.scale(0.6,0.12,0.05);
		this.helice.display();
		this.scene.popMatrix();

	
		this.scene.pushMatrix();
		this.scene.translate(1,-0.25,0.4);
		this.scene.rotate(this.heliceAngle * degToRad,0,0,1);
		this.scene.rotate(-90*degToRad,1,0,0);
		this.scene.scale(0.6,0.12,0.05);
		this.helice.display();
		this.scene.popMatrix();		

		this.scene.pushMatrix();
		this.scene.translate(-1,-0.25,0.5);
		this.scene.scale(0.07,0.07,0.07);
		this.semi.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(1,-0.25,0.5);
		this.scene.scale(0.07,0.07,0.07);
		this.semi.display();
		this.scene.popMatrix();

		//Draw cilinder from submarine
		this.scene.pushMatrix();
		this.scene.scale(0.73, 0.8, 4.08);	
		this.submarineAppearances[this.currentAppearance].apply();	
		this.body.display();
		this.scene.popMatrix();
 }