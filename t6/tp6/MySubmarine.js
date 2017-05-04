function MySubmarine(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0.0,
            -0.5, 0.3, 0.0,
            0.0, 0.3, 2
			];

	this.indices = [
            2,1,3
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};