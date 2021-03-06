var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.1, 0.4, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.enableTextures(true);

	// Scene elements
	this.clock = new MyClock(this);
	this.background = new Plane(this);
	this.backgroundy = new Plane(this);
	this.backgroundz = new Plane(this);
	this.submarine = new MySubmarine(this, 3 ,2 ,5);
	this.poste = new MyCylinder(this, 100, 1);
	
	var rand = Math.floor((Math.random() * 20) + 1);

	this.targets = [new MyTarget(this, Math.floor((Math.random() * 15) + 1), Math.floor((Math.random() * 15) + 1), Math.floor((Math.random() * 15) + 1)), 
	new MyTarget(this,Math.floor((Math.random() * 15) + 1), Math.floor((Math.random() * 15) + 1) , Math.floor((Math.random() * 15) + 1) ),
	new MyTarget(this, Math.floor((Math.random() * 15) + 1) , Math.floor((Math.random() * 15) + 1) , Math.floor((Math.random() * 15) + 1) )];
	this.torpedo = new MyTorpedo(this, this.submarine);


	this.backgroundAppearance = new CGFappearance(this);
	this.backgroundAppearance.loadTexture("../resources/images/ocean.png");
	this.backgroundAppearance.setTextureWrap('REPEAT','REPEAT');

	this.postAppearance = new CGFappearance(this);
	this.postAppearance.loadTexture("../resources/images/postTexture.png");
	
	this.torpedoAppearance = new CGFappearance(this);
	this.torpedoAppearance.loadTexture("../resources/images/metalTexture.png");
	
	this.materialDefault = new CGFappearance(this);
	this.setUpdatePeriod(100);

	this.ambientLight = true;
	this.light_1 = true;
	this.light_2 = true;
	this.light_3 = true;
	this.light_4 = true;
	this.light_5 = true;
	this.enable = true;
	this.speed = 3;

	this.submarineAppearanceList = [
	"Yellow",
	"Grey"
	];

	this.currSubmarineApperance = 0;

	this.drawTorpedo = false;

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0, 0, 0, 1.0);
	//this.setGlobalAmbientLight(0.0, 1.0, 1.0, 1.0); // Cyan ambient light
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1, 1, 0, 1);
	this.lights[0].enable();

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1, 1, 1, 1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1, 1, 0, 1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();

	this.lights[4].setPosition(0, 6, 7.5, 1);
	this.lights[4].setVisible(true);
	this.lights[4].enable();

};

LightingScene.prototype.updateLights = function() {
	lights = [
		this.light_1,
		this.light_2,
		this.light_3,
		this.light_4,
		this.light_5
	]

	for (i = 0; i < this.lights.length; i++)
		if (lights[i])
		this.lights[i].enable();
		else this.lights[i].disable();

	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();

	if (this.ambientLight)
		this.setGlobalAmbientLight(1, 1, 1, 1.0);
	else
		this.setGlobalAmbientLight(0.0, 0.0, 0.0,1.0); // No ambient light
};


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	this.submarine.update();

	// Draw axis
	this.axis.display();

	//Draw Plane
	this.pushMatrix();
	this.translate(7.5,7.5,0);
	this.scale(15,15,15);
	this.backgroundAppearance.apply();
	this.background.display();
	this.popMatrix();
/*
	this.pushMatrix();
	this.translate(22.5,22.5,0);
	this.scale(15,15,15);
	this.backgroundAppearance.apply();
	this.background.display();
	this.popMatrix();
*/
	//Draw Plane
	this.pushMatrix();
	this.rotate(-90*degToRad,1,0,0);
	this.translate(7.5,-7.5,0);
	this.scale(15,15,15);
	this.backgroundAppearance.apply();
	this.backgroundy.display();
	this.popMatrix();

	//Draw Plane
	this.pushMatrix();
	this.rotate(90*degToRad,0,1,0);
	this.translate(-7.5,7.5,0);
	this.scale(15,15,15);
	this.backgroundAppearance.apply();
	this.backgroundz.display();
	this.popMatrix();
	
	//Draw poste 
	this.pushMatrix();
	this.scale(1,4,1);
	this.rotate(degToRad* -90,1,0,0);
	this.translate(8,0,0);
	this.scale(0.35,0.35,1.02);
	this.setShininess(100);
	this.postAppearance.apply();
	this.poste.display();
	this.popMatrix();

	//Draw clock
	this.pushMatrix();
	this.translate(8,5,0);
	this.scale(1,1,0.3);
	this.clock.display();
	this.popMatrix();

	// Draw submarine	
	this.pushMatrix();
	this.translate(this.submarine.x, this.submarine.y, this.submarine.z);
	this.rotate(this.submarine.dirAngle,0,1,0);
	this.submarine.display();
	this.popMatrix();
	

	// Draw targets
	
	for (i = 0; i < this.targets.length; i++){
		this.pushMatrix();
		this.targets[i].display();
		this.popMatrix();
	}	
	


	//Draw torpedo

	if (this.drawTorpedo == true){
		this.pushMatrix();
		this.translate(this.torpedo.x, this.torpedo.y, this.torpedo.z);
		this.rotate(this.torpedo.rot,0,1,0);
		this.torpedoAppearance.apply();
		this.torpedo.display();
		this.popMatrix();
	}
	


	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// ---- END Primitive drawing section
};

LightingScene.prototype.positionTorpedo = function(){
	if (this.targets.length != 0){
		this.torpedo = new MyTorpedo(this, this.submarine);
		this.drawTorpedo = true;
	}
}



LightingScene.prototype.update = function(currTime){
	if(this.enable){
		this.clock.update(currTime);
	}
	this.submarine.update(currTime);
	if (this.drawTorpedo == true){
		this.torpedo.update(currTime);
	}
	if(this.currSubmarineApperance == "Yellow")
		this.submarine.currentAppearance = 0;

	if(this.currSubmarineApperance == "Grey")
		this.submarine.currentAppearance = 1;
	


}

LightingScene.prototype.Settings = function ()
{
	console.log("Doing Something ...");
};