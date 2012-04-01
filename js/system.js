// Space Object class (SPace OBject == sp + ob == spob)
// Handles creation, management, and interaction of/with space objects
// such as stars, planets, moons, stations, jump gates, and wormholes.
// Object can be stationary or moving, vector or graphic, static or animated.
// 
// And to answer your question: yes, the class name was borrowed from the
// corresponding object type in the Escape Velocity resource files.
function Spob(x_pos,y_pos,radius,filepath)
{
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.radius = radius;
	this.is_graphic = false;
	this.is_animated = false;
	this.moves = false;
	this.color;
	this.type; // Can equal 'star', 'planet', 'moon', 'station', 'gate', or 'wormhole'
	
	this.path;
	if (!filepath)
	{
		this.path = null;
		this.is_graphic = false;
	}
	else
	{
		this.path = filepath;
		this.is_graphic = true;
	}
	
	this.Draw = function()
	{
		// Display planet on screen, either as graphic or vector
		if (is_graphic)
		{
			// Draw graphic on screen
		}
		else
		{
			// Draw vector circle on screen
		}
	}
	
	this.Animate = function()
	{
		// progress through series of graphical animation frames
	}
}

// System Class
// Manages a System full of Spobs
function System(num_spobs)
{
	this.x_size = 72000;
	this.y_size = 72000;
	this.t_bound = (this.y_size / 2);
	this.b_bound = -(this.y_size / 2);
	this.r_bound = (this.x_size / 2);
	this.l_bound = -(this.x_size / 2);
	
	this.num_p;
	if (!num_spobs)
	{
		this.num_p = 1;
	}
	else
	{
		this.num_p = num_spobs;
	}
	
	// Set up array and iterative loop to create, store, and manage planets
	// within this system
	this.spobs = new Array(this.num_p);
	for (var i = 0; i < this.num_p; i++)
	{
		this.spobs[i] = new Spob(0,0,5);
	}
	
	this.Bounds = function(obj_x,obj_y)
	{
		var obj_x = obj_x;
		var obj_y = obj_y;
		
		if (obj_x > 0 && obj_x > this.r_bound)
		{
			obj_x = this.l_bound;
		}
		
		if (obj_x < 0 && obj_x < this.l_bound)
		{
			obj_x = this.r_bound;
		}
		
		if (obj_y > 0 && obj_y > this.t_bound)
		{
			obj_y = this.b_bound;
		}
		
		if (obj_y < 0 && obj_y < this.b_bound)
		{
			obj_y = this.t_bound;
		}
		
		var obj_x_y = {
			x: obj_x,
			y: obj_y
		}
		
		return obj_x_y; 
	}
}

var system;

// Galaxy Class
// Object to store and manage Systems
function Galaxy()
{
	
}
