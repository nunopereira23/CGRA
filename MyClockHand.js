/**
 * MyClockHand
 * @constructor
 */

var degToRad = Math.PI / 180.0;

 function MyClockHand(scene,length) {
 	CGFobject.call(this,scene);
	
	this.length = length;
	this.angle = 0;

 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.initBuffers = function() {
    
	
 	this.vertices = [
 	  -0.02, 0, 0,
 	  0.02, 0, 0,
 	  0, this.length, 0
 	];

 	this.indices = [
 	  0, 1, 2
 	];
	
	this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
	];
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

MyClockHand.prototype.setAngle = function(angle){
    this.angle = degToRad * angle;
};