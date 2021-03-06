(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 375,
	height: 375,
	fps: 30,
	color: "#FFFFFF",
	manifest: [
		{src:"/img/kanpai/beer_kanpai.png", id:"beer_kanpai"},
		{src:"/img/kanpai/beer_left.png", id:"beer_left"},
		{src:"/img/kanpai/beer_right.png", id:"beer_right"},
		{src:"/img/kanpai/lineright.png", id:"lineright"},
		{src:"/img/kanpai/line_center.png", id:"line_center"},
		{src:"/img/kanpai/line_left.png", id:"line_left"},
		{src:"/img/kanpai/star_blue.png", id:"star_blue"},
		{src:"/img/kanpai/star_green.png", id:"star_green"},
		{src:"/img/kanpai/star_red.png", id:"star_red"}
	]
};

// stage content:
(lib.kanpai = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// text
	this.instance = new lib.kanpai_1("synched",0);
	this.instance.setTransform(180.2,402.6,1,1,0,0,0,48.9,18.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({_off:false},0).to({y:262.6},7,cjs.Ease.get(0.75)).to({y:292.6},3,cjs.Ease.get(-0.75)).wait(1));

	// line_right
	this.instance_1 = new lib.line_right("synched",0);
	this.instance_1.setTransform(197.1,150,1,1,0,0,0,11.5,5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(9).to({_off:false},0).to({x:217.1,y:110,alpha:0},10).wait(1));

	// line_center
	this.instance_2 = new lib.line_center_1("synched",0);
	this.instance_2.setTransform(187.3,143.3,1,1,0,0,0,3.8,8.8);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({_off:false},0).to({x:197.3,y:103.3,alpha:0},10).wait(1));

	// line_left
	this.instance_3 = new lib.line_left_1("synched",0);
	this.instance_3.setTransform(170.5,146.6,1,1,0,0,0,7.8,7.6);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({_off:false},0).to({x:150.5,y:106.6,alpha:0},10).wait(1));

	// star_blue
	this.instance_4 = new lib.star_blue_1("synched",0);
	this.instance_4.setTransform(217,134.9,1,1,0,0,0,5.1,5.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({x:237,y:94.9,alpha:0},10).wait(1));

	// star_green
	this.instance_5 = new lib.star_green_1("synched",0);
	this.instance_5.setTransform(149.1,143.1,1,1,0,0,0,5.8,5.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({_off:false},0).to({x:129.1,y:103.1,alpha:0},10).wait(1));

	// star_red
	this.instance_6 = new lib.star_red_1("synched",0);
	this.instance_6.setTransform(171.7,127.5,1,1,0,0,0,5.9,5.5);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(9).to({_off:false},0).to({y:87.5,alpha:0},10).wait(1));

	// beer_right
	this.instance_7 = new lib.beer_right_1("synched",0);
	this.instance_7.setTransform(420,200.8,1,1,0,0,0,43.4,47.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({x:225},9,cjs.Ease.get(-0.75)).to({rotation:15,x:245,y:180.7},5).to({x:265,y:190.7},5).wait(1));

	// beer_left
	this.instance_8 = new lib.beer_left_1("synched",0);
	this.instance_8.setTransform(-50,200.1,1,1,0,0,0,43.5,47.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({x:145},9,cjs.Ease.get(-0.75)).to({regX:43.6,rotation:-15,x:125.1,y:180},5).to({x:105.1,y:190},5).wait(30)).call(function() {$('.animation').closest('.aside').fadeOut(500);});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(94,339.8,556.8,96.2);


// symbols:
(lib.beer_kanpai = function() {
	this.initialize(img.beer_kanpai);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,722,552);


(lib.beer_left = function() {
	this.initialize(img.beer_left);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,348,382);


(lib.beer_right = function() {
	this.initialize(img.beer_right);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,347,382);


(lib.lineright = function() {
	this.initialize(img.lineright);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,92,40);


(lib.line_center = function() {
	this.initialize(img.line_center);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,71);


(lib.line_left = function() {
	this.initialize(img.line_left);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,62,61);


(lib.star_blue = function() {
	this.initialize(img.star_blue);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,41,41);


(lib.star_green = function() {
	this.initialize(img.star_green);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,46,41);


(lib.star_red = function() {
	this.initialize(img.star_red);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,47,44);


(lib.star_red_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.star_red();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,11.8,11);


(lib.star_green_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.star_green();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,11.5,10.3);


(lib.star_blue_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.star_blue();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,10.3,10.3);


(lib.pai = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("Ah2CuIAAiRQAAgdAGgrQgNArgJAUQgUAqgKAOQgEAHgHAAQgFAAgEgDQgGgFAAgHQAAgEADgFQAPgTAYgtQAKgYAPgzIgsAAQgLAAAAgOQAAgNALAAIAxAAIAAhCQAAgMAOAAQAPAAAAAMIAABCIApAAQALAAAAANQAAAOgLAAIgnAAQAIASAMAQQALAQAPAQQAFAEAAAGQAAAEgEADQgFAFgFAAQgFAAgFgFQgJgIgJgOQgKgPgGgQQAFAkAAAZIAACjQAAALgPAAQgOAAAAgLgAAnCtIAAicQAAgZAEggQgMAZgQAUQgNASgNAPQgPAQgRAMQgEADgHAAQgHAAgEgEQgEgFAAgGQAAgIAHgFQAXgRATgUQAUgUARgZQAOgWAMgXQAMgXAIgXIhnAAQgLAAAAgPQAAgNALAAIDVAAQALAAAAANQAAAPgLAAIhNAAQgLAegPAbIAAD4QAAALgQAAQgPAAAAgLgAClBBQgggdgPgSQgPgSgXgkIgCgHQAAgIAIgEIAIgCQAIAAAFAIQALATAaAfQATAWAWAQQAGAFAAAJQAAAFgDAEQgFAGgIAAQgFABgFgEg");
	this.shape.setTransform(19.1,18.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,38.3,37.2);


(lib.line_right = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.lineright();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,23,10);


(lib.line_left_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.line_left();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,15.5,15.3);


(lib.line_center_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.line_center();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,7.5,17.8);


(lib.kan = function() {
	this.initialize();

	// レイヤー 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("AhqC4QgFgDAAgFIAAg4Ig/AAQgKAAAAgOQAAgOAKAAIA/AAIAAgiIgcAAQgQAAgIgHQgHgHAAgQIAAhTQAAgQAHgHQAIgHAQAAIAdAAIAAggIg/AAQgKgBAAgNQAAgOAKAAIA/AAIAAgdQAAgLAOAAQAPAAAAALIAAAdIBBAAQALAAAAAOQAAANgLABIhBAAIAAAgIAfAAQARAAAHAHQAHAHAAAQIAABTQAAAQgHAHQgHAHgRAAIgfAAIAAAiIA+AAQALAAAAAOQAAAOgLAAIg+AAIAAA4QAAAFgFADQgEACgGAAQgHAAgDgCgAiOAYQAAAJALAAIBKAAQAKAAAAgJIAAgaIhfAAgAiOgzIAAAZIBfAAIAAgZQAAgKgKAAIhKAAQgLAAAAAKgAAvCrQgRgCgKgFQgKgFgFgIQgEgIAAgMQAAgOANgcQAJgSARgTQATgXA4g1IACgDQAAAAAAgBQAAAAgBgBQAAAAgBAAQAAAAgBAAIhUAAQgLAAAAgOQAAgOALAAIBmAAQANAAAGAGQAHAGAAAIQAAANgKAIQhCA+gSAXQgfApAAAOQAAAMAJAEQAMAFAlgBQAeAAANgDQAKgEAEgIQAGgLABgZQAAgIAEgDQADgDAHgBIACAAQAOACAAANIAAABQgEAmgGAMQgEAHgFAGQgGAFgJAEQgKAEgOABIglACQgaAAgRgCgAgIgzQgFgEAAgHQAAgFAEgFQAKgPATgjQAOgaAIgbQADgJAJAAIAGABQALACAAAKIgBAGQgGARgHAQIB0AAQAMAAAAAPQAAAOgMAAIiCAAQgPAbgRAWQgFAIgGAAQgDAAgFgFg");
	this.shape.setTransform(18.6,18.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,37.2,37.3);


(lib.beer_right_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.beer_right();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,86.8,95.5);


(lib.beer_left_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.beer_left();
	this.instance.setTransform(0,0,0.25,0.25);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,87,95.5);


(lib.kanpai_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.pai("synched",0);
	this.instance.setTransform(78.6,18.6,1,1,0,0,0,19.1,18.6);

	this.instance_1 = new lib.kan("synched",0);
	this.instance_1.setTransform(18.6,18.7,1,1,0,0,0,18.6,18.7);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,97.8,37.3);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;