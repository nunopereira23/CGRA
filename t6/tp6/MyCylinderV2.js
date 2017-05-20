/**
 * MyCylinderV2
 * @constructor
 */
 function MyCylinderV2(scene, slices, stacks, bases) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.bases = bases;
    
    this.cylinder = new MyCylinder(scene,this.slices,this.stacks);
    this.cylinder.initBuffers();

    this.cylint = new MyCylint(scene, this.slices, this.stacks);
    this.cylint.initBuffers();

    this.surface = new MySurface(scene,this.slices,0);
    this.surface.initBuffers();
};

MyCylinderV2.prototype = Object.create(CGFobject.prototype);
MyCylinderV2.prototype.constructor=MyCylinderV2;

MyCylinderV2.prototype.display = function() {

    this.cylinder.display();
    this.cylint.display();


	if (this.bases == true){
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.surface.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.surface.display();
		this.scene.popMatrix();
	}
}