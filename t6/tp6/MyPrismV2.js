/**
 * MyPrismV2
 * @constructor
 */
 function MyPrismV2(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
    
    this.prism = new MyPrism(scene,this.slices,this.stacks);
    this.prism.initBuffers();

    this.surface = new MySurface(scene,this.slices,0);
    this.surface.initBuffers();
};

MyPrismV2.prototype = Object.create(CGFobject.prototype);
MyPrismV2.prototype.constructor=MyPrismV2;

MyPrismV2.prototype.display = function() {

    this.prism.display();
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,1,0);
    this.surface.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0,0,1);
    this.surface.display();
    this.scene.popMatrix();
}