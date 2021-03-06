/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyPrism;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	this.angulo = (2*Math.PI)/this.slices;

	this.height = 1.0/this.stacks;

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];


 	for (let j=0; j< this.stacks; j++){
 		for(let i=0;i<this.slices;i++){
 			this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , j*this.height);
 			
 			this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , (j+1)*this.height);
 			

 			if (i == this.slices - 1){
 				this.indices.push((this.slices*2*j)+i*2,(this.slices*2*j),(this.slices*2*j)+i*2+1);
 				this.indices.push((this.slices*2*j),(this.slices*2*j)+1,(this.slices*2*j)+i*2+1);
 			}
 			else{
 				this.indices.push((this.slices*2*j)+i*2,(this.slices*2*j)+i*2+2,(this.slices*2*j)+i*2+1);
 				this.indices.push((this.slices*2*j)+i*2+2,(this.slices*2*j)+i*2+3,(this.slices*2*j)+i*2+1);
 			}
 			
 			for (let k=0; k<=1;k++){
 				this.normals.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , 0);
 			}
 		}
 	}
 	
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
