/**
 * MyClock
 * @constructor
 */
 function MyClock(scene) {
	CGFobject.call(this,scene);

    this.clockTexture = new CGFappearance(this.scene);
    this.clockTexture.loadTexture("../resources/images/clock.png");
    
    this.handTexture = new CGFappearance(this.scene);
    this.handTexture.setAmbient(0,0,0,0);
	this.handTexture.setDiffuse(0,0,0,0);
	this.handTexture.setSpecular(0,0,0,0);	
	this.handTexture.setShininess(0);

    this.cylinder = new MyCylinder(scene,12,1);
    this.cylinder.initBuffers();

    this.surface = new MySurface(scene,12,1);
    this.surface.initBuffers();

    this.hours = new MyClockHand(scene, 0.4);
    this.hours.setAngle(90);
    this.hours.initBuffers();

    this.minutes = new MyClockHand(scene, 0.7);
    this.minutes.setAngle(180);
    this.minutes.initBuffers();

    this.seconds = new MyClockHand(scene, 0.9);
    this.seconds.setAngle(270);
    this.seconds.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor=MyClock;

MyClock.prototype.display = function() {

    this.cylinder.display();

    this.handTexture.apply();
    
    this.scene.pushMatrix();
        this.scene.translate(0,0,1.01);
        this.scene.rotate(this.hours.angle,0,0,-1);
        this.hours.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0,0,1.01);
        this.scene.rotate(this.minutes.angle,0,0,-1);
        this.minutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
        this.scene.translate(0,0,1.01);
        this.scene.rotate(this.seconds.angle,0,0,-1);
        this.seconds.display();
    this.scene.popMatrix();

    this.clockTexture.apply();
    this.surface.display();
}

MyClock.prototype.update = function(currTime) {
    
    var s = currTime;
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    this.seconds.setAngle(secs * 6);
	this.minutes.setAngle(mins * 6);
	this.hours.setAngle(hrs * 6);
};