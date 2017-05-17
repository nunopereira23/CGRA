var degToRad = Math.PI / 180.0;

function MySubmarine(scene, x=0, y=0, z, direction=0, declination=0) {
	CGFobject.call(this,scene);

    this.x=x;
    this.y=y;
    this.z=z;

    this.speed=0.00;
    this.accel=0.05;
    this.accelDrag=0.0025;

	this.rotSpeed=0.00;
	this.rotAccel=0.005;
	this.rotDrag=0.0025;

    this.direction=degToRad * direction;
    this.declination=degToRad * declination;

	this.moveForward=false;
	this.moveBack=false;
	this.rotateLeft=false;
	this.rotateRight=false;

	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.initBuffers = function () {
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
    
  /* this.texCoords = [
    this.minS, this.maxT, //(0,1)
    this.maxS,  this.maxT, //(1,1)
    this.minS,  this.minT  
    ]*/






 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MySubmarine.prototype.handleKeyPressed = function(key){
 	switch(key){

 		case "a":{
 			this.rotateLeft=true;
 		}
 		break;

 		case "d":{
 			this.rotateRight=true;
 		}
 		break;

 		case "w":{
 			this.moveForward=true;
 		}
 		break;

 		case "s":{
 			this.moveBack=true;
 		}
 		break;

 		
 	}
 };



 MySubmarine.prototype.handleKeyUnpressed = function(key){
 	switch(key){

 		case "a":{
 			this.rotateLeft=false;
 		}
 		break;

 		case "d":{
 			this.rotateRight=false;
 		}
 		break;

 		case "w":{
 			this.moveForward=false;
 		}
 		break;

 		case "s":{
 			this.moveBack=false;
 		}
 		break;

 		
 	}
 };



 MySubmarine.prototype.increaseVeloc = function(){

	if(this.scene.speed ==0){
		this.scene.speed+=1;
	}
	
    else if (this.scene.speed >= 6){
        this.scene.speed = 6;
    }
    else{
        this.scene.speed += accel;
    }
}

MySubmarine.prototype.decreaseVeloc = function(){
    
	if(this.scene.speed ==0){
		this.scene.speed-=1;
	}

    else if (this.scene.speed <= -6){
        this.scene.speed = -6;
    }
    else{
        this.scene.speed -= accel;
    }
}


 MySubmarine.prototype.update = function(currTime){

 	 var dt = currTime - this.pastTime;

 	 if(this.moveForward){
		this.increaseVeloc();
 	 }

 	 if(this.moveBack){
 	 	this.decreaseVeloc();
 	 }



	this.pastTime = currTime;
 }