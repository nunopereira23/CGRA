var degToRad = Math.PI / 180.0;

function MySubmarine(scene, x=0, y=0, z, direction=0, declination=0) {
	CGFobject.call(this,scene);

    this.x=x;
    this.y=y;
    this.z=z;
    this.direction=degToRad * direction;
    this.declination=degToRad * declination;
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