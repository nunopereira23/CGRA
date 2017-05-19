var degToRad = Math.PI / 180.0;


function MySubmarine(scene, x=0, y=0, z=0, declination=0) {
	CGFobject.call(this,scene);

    this.x=x;
    this.y=y;
    this.z=z;

    this.dirAngle=degToRad*90;

    this.speed=0.00;
    this.accel=0.05;
	this.rotSpeed=0.05;
	this.rotAccel=0.05;

    this.declination=degToRad * declination;


	this.semi = new MySemiSphere(scene, 200,1);
	this.body = new MyCylinder(scene,100,1);


	this.topSubmarineAppearance = new CGFappearance(scene);
	this.topSubmarineAppearance.loadTexture("../resources/images/topsphere.png");
	this.bodySubmarineAppearance = new CGFappearance(scene);
	this.bodySubmarineAppearance.loadTexture("../resources/images/body.png");


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
	}
	else{
		this.dirAngle+=this.rotSpeed;
 		if(this.dirAngle<0)
 		this.dirAngle=360 * degToRad * dirAngle-this.rotSpeed;
	}
}

 MySubmarine.prototype.update = function(currTime){



 	this.x += (this.speed) * Math.sin(this.dirAngle);
 	this.z +=(this.speed) *Math.cos(this.dirAngle);

 }

 MySubmarine.prototype.display = function(){

 	//Draw submarine front and back
		this.scene.pushMatrix();
		this.scene.translate(0,0,4.08);
		this.scene.scale(0.73, 0.94, 0.46);
		this.topSubmarineAppearance.apply();
		this.semi.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.73, 0.94, 0.46);
		this.scene.rotate(degToRad*180,1,0,0);
		this.topSubmarineAppearance.apply();
		this.semi.display();
		this.scene.popMatrix();

	//Draw cilinder from submarine
		this.scene.pushMatrix();
		this.scene.scale(0.73, 0.94, 4.08);	
		this.bodySubmarineAppearance.apply();	
		this.body.display();
		this.scene.popMatrix;

 }