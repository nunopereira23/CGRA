function MyFloor(scene) {
	CGFobject.call(this,scene);

    this.cube = new MyUnitCubeQuad(this.scene);
    this.cube.initBuffers();
    this.floorAppearance= new CGFappearance(this.scene);
    this.floorAppearance.loadTexture("../resources/images/floor.png");
};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor=MyFloor;

MyFloor.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.scale(8,0.1,6);
    this.floorAppearance.apply();
	this.cube.display();
    this.scene.popMatrix();
}