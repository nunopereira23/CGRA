/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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
 			/*for(let k=0;k<=1;k++){
 				this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , k);
 				this.vertices.push(Math.cos((i+1)*this.angulo) , Math.sin((i+1)*this.angulo) , k);
 			}*/
 			this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , j*this.height);
 			this.vertices.push(Math.cos((i+1)*this.angulo) , Math.sin((i+1)*this.angulo) , j*this.height);
 			this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , (j+1)*this.height);
 			this.vertices.push(Math.cos((i+1)*this.angulo) , Math.sin((i+1)*this.angulo) , (j+1)*this.height);

 			this.indices.push((this.slices*4*j)+i*4,(this.slices*4*j)+i*4+1,(this.slices*4*j)+i*4+3);
 			this.indices.push((this.slices*4*j)+i*4+3,(this.slices*4*j)+i*4+2,(this.slices*4*j)+i*4);
 			for (let k=0; k<=3;k++){
 				this.normals.push(Math.cos(i*this.angulo+this.angulo/2) , Math.sin(i*this.angulo+this.angulo/2) , 0);
 			}
 		}
 	}
 	
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
