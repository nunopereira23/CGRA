function MyTarget(scene, x, y, z) {
	CGFobject.call(this, scene);

    this.degToRad = Math.PI / 180.0;

    this.pos_x = x;
    this.pos_y = y;
    this.pos_z = z;

	this.body = new MyPrismV2(scene,8,1);
	this.targetAppearance = new CGFappearance(scene);
	this.targetAppearance.loadTexture("../resources/images/rockTexture3.png");
}


MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function () {

this.scene.pushMatrix();
this.scene.translate(this.pos_x,this.pos_y,this.pos_z);
this.targetAppearance.apply();
this.body.display();
this.scene.popMatrix();
}