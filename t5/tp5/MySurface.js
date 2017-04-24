/**
 * MySurface
 * @constructor
 */
 function MySurface(scene, slices, stacks) {
 	CGFobject.call(this,scene);

    this.slices = slices;
    this.stacks = stacks;

 	this.initBuffers();
 };

 MySurface.prototype = Object.create(CGFobject.prototype);
 MySurface.prototype.constructor = MySurface;

 MySurface.prototype.initBuffers = function() {
 	
 	this.angulo = (2*Math.PI)/this.slices;

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];


    for(let i=0;i<this.slices;i++){
 		this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , this.stacks);
 		this.normals.push(0, 0, 1);
 		this.texCoords.push(0.5 + Math.cos(i*this.angulo)/2 , -(Math.sin(i*this.angulo)/2 - 0.5));

 		if (i+2 < this.slices){
 		    this.indices.push(0);
 		    this.indices.push(i+1);
 		    this.indices.push(i+2);
 		}

 	}
 	//this.indices.push(0,1,2,0,2,3,0,3,4,0,4,5,0,5,6,0,6,7,0,7,8,0,8,9,9,10,0,10,11);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
