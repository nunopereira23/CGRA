/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'Settings');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'ambientLight');
	group.add(this.scene, 'light_1');
	group.add(this.scene, 'light_2');
	group.add(this.scene, 'light_3');
	group.add(this.scene, 'light_4');
	group.add(this.scene, 'light_5');

	
	var group2=this.gui.addFolder("Clock");
	group2.add(this.scene, 'enable');

	var group3=this.gui.addFolder("Submarine");
	group3.add(this.scene, 'currSubmarineApperance', this.scene.submarineAppearanceList)

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    
    switch (event.keyCode)
    {
        //a ou A
        case (65):
        case (97):
        this.scene.submarine.rotate(1);
        break;

        //d ou D
        case (68):
        case (100):
        console.log ("fui eu que escrevi" + event.type);
        this.scene.submarine.rotate(0);
        break;

        //s ou S
        case (83):
        case (115):
        this.scene.submarine.decreaseVeloc();
        break;

        //w ou W
        case (87):
        case (119):
        this.scene.submarine.increaseVeloc();
        break;
        
        case (81):
        case(113):
			console.log("Key 'Q' pressed");
			this.scene.submarine.dive(1);
			break;

		case (69):
		case(101):
			console.log("Key 'E' pressed");
			this.scene.submarine.dive(0);
			break;

		case (76):
		case (108):
			console.log("Key 'L' pressed");
			this.scene.submarine.periscopeDown=1;
			break;
		case (80):
		case (112):
			console.log("Key 'P' pressed");
			this.scene.submarine.periscopeUp=1;
			break;
		case(70):
		case(102):
			this.scene.positionTorpedo();
			break;
	};
};

MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyUp.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    
    this.scene.submarine.finAngle= 0;
    
};