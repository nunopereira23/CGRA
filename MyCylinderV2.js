/**
 * MyCylinderV2
 * @constructor
 */
 function MyCylinderV2(scene, slices, stacks, bases) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	this.bases = bases;

 	this.initBuffers();
 };

 MyCylinderV2.prototype = Object.create(CGFobject.prototype);
 MyCylinderV2.prototype.constructor = MyPrism;

 MyCylinderV2.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	
	var texCoordS = 1 / this.slices;
    var texCoordT = 1 / this.stacks;

	this.angulo = (2*Math.PI)/this.slices;

	this.height = 1.0/this.stacks;

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

	
	// Vertices para as faces externas
 	for (let j=0; j< this.stacks; j++){
 		for(let i=0;i<this.slices;i++){

 			// Arestas para face externa
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
    

 	// Vertices para as faces internas
 	
 	for (let j=0; j< this.stacks; j++){
 		for(let i=0;i<this.slices;i++){

 			this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , j*this.height);
 			
 			this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , (j+1)*this.height);


 			if (i == this.slices - 1){
 				this.indices.push(2*this.slices*this.stacks+(this.slices*2*j)+i*2+1,2*this.slices*this.stacks+(this.slices*2*j),2*this.slices*this.stacks+(this.slices*2*j)+i*2);
 				this.indices.push(2*this.slices*this.stacks+(this.slices*2*j)+i*2+1,2*this.slices*this.stacks+(this.slices*2*j)+1,2*this.slices*this.stacks+(this.slices*2*j));
 			}
 			else{
 				this.indices.push(2*this.slices*this.stacks+(this.slices*2*j)+i*2+1,2*this.slices*this.stacks+(this.slices*2*j)+i*2+2,2*this.slices*this.stacks+(this.slices*2*j)+i*2);
 				this.indices.push(2*this.slices*this.stacks+(this.slices*2*j)+i*2+1,2*this.slices*this.stacks+(this.slices*2*j)+i*2+3,2*this.slices*this.stacks+(this.slices*2*j)+i*2+2);
 			}
 			
 			for (let k=0; k<=1;k++){
 				this.normals.push(-Math.cos(i*this.angulo) , -Math.sin(i*this.angulo) , 0);
 			}
 		}
 	}
    
    if (this.bases == true){
        // BAse 1 
        for (let i=0; i<this.slices; i++){
            this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , 0);
            if (i<this.slices-2){
                this.indices.push(2*2*this.slices*this.stacks+i+2, 2*2*this.slices*this.stacks+i+1, 2*2*this.slices*this.stacks);
            }
            this.normals.push(0,0,-1);
        }

        // Base 2
        for (let i=0; i<this.slices; i++){
            this.vertices.push(Math.cos(i*this.angulo) , Math.sin(i*this.angulo) , 1);
            if (i<this.slices-2){
                this.indices.push(2*2*this.slices*this.stacks+this.slices, 2*2*this.slices*this.stacks+this.slices+i+1, 2*2*this.slices*this.stacks+this.slices+i+2);
            }
            this.normals.push(0,0,1);
        }
    }


 	 this.texCoords = [];
        for (i = 0; i <= this.stacks; ++i)
        {
            for (j = 0; j <= this.slices; ++j)
            {
                this.texCoords.push(j * texCoordS);
                this.texCoords.push(i * texCoordT);
            }
        }

        for (i = 0; i <= this.stacks; ++i)
        {
            for (j = 0; j <= this.slices; ++j)
            {
                this.texCoords.push(j * texCoordS);
                this.texCoords.push(i * texCoordT);
            }
        }

        for (j = 0; j <= this.slices; ++j)
        {
        	this.texCoords.push(0.5 + Math.cos(i*this.angulo)/2 , -(Math.sin(i*this.angulo)/2 - 0.5));
            //this.texCoords.push(j * texCoordS);
            //this.texCoords.push(0);
        }

        for (j = 0; j <= this.slices; ++j)
        {
        	this.texCoords.push(0.5 + Math.cos(i*this.angulo)/2 , -(Math.sin(i*this.angulo)/2 - 0.5));
            //this.texCoords.push(j * texCoordS);
            //this.texCoords.push(this.stacks * texCoordT);
        }


 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };