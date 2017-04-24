function MyTable(scene) {
	CGFobject.call(this,scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function() {
   
   // Tampo
    this.scene.pushMatrix();
	this.scene.translate(0.0,3.5,0.0);
    this.scene.scale(5,0.3,3);
	this.cube.display();
	this.scene.popMatrix();
	
	
	// Pernas da mesa

	this.scene.pushMatrix();
	this.scene.translate(-2.3,1.75,-1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.3,1.75,-1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.3,1.75,1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.3,1.75,1.3);
	this.scene.scale(0.3,3.5,0.3);
	this.cube.display();
    this.scene.popMatrix();
}