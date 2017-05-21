function MyTarget(scene, x, y, z) {
	CGFobject.call(this, scene);

    this.degToRad = Math.PI / 180.0;

    this.pos_x = x;
    this.pos_y = y;
    this.pos_z = z;

	this.body = new MyPrism(scene,8,1);

}


MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function () {

this.scene.pushMatrix();
this.body.display();
this.scene.popMatrix();
}