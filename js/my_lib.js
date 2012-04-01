try { console.assert(1); } catch(e) { console = { log: function() {}, assert: function() {} } }

/* Object.prototype.getElementWidth = function()
{
	if (typeof this.clip !== "undefined")
	{
		return this.clip.width;
	}
	else
	{
		if (this.style.pixelWidth)
		{
			return this.style.pixelWidth;
		}
		else
		{
			return this.offsetWidth;
		}
	}
}

Object.prototype.getElementHeight = function()
{
	if (typeof this.clip !== "undefined")
	{
		return this.clip.height;
	}
	else
	{
		if (this.style.pixelHeight)
		{
			return this.style.pixelHeight;
		}
		else
		{
			return this.offsetHeight;
		}
	}
} */

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function roundNumber(num, dec)
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function degToRad(deg)
{
	return deg * (Math.PI / 180);
}

function radToDeg(rad)
{
	return rad * (180 / Math.PI);
}

function getDxDy(degree)
{
	var dx;
	var dy;
	var degree = degree;
	
	dx = -Math.sin(degToRad(degree));
	dy = Math.cos(degToRad(degree));
	
	var dxdy = {
		dx: dx,
		dy: dy
	};
	
	return dxdy;
}

function getAngle2(dx,dy)
{
	var dx = dx;
	var dy = dy;
	var angle;
	
	if (dx == 0 && dy == 0)
	{
		return 0;
	}
	
	if (dy == 0 && dx != 0)
	{
		return 90;
	}
	
	if (dy <= 0)
	{
		angle = radToDeg(Math.atan2(dy,-dx));
		
		if (dx >= 0)
		{
			if ((-angle - 90) == 0)
			{
				return 360;
			}
			else
			{
				return -angle - 90;
			}
		}
		
		if (dx < 0)
		{
			return -angle + 270;
		}
	}
	
	if (dy > 0)
	{
		return radToDeg(Math.atan2(dy,dx)) + 90;
	}
}

function getAngle1(dx,dy)
{
	var dx = dx;
	var dy = dy;
	var ang = radToDeg(Math.atan(dy/dx));
	
	if (dx == 0)
	{
		if (dy > 0)
		{
			return 180;
		}
		else
		{
			return 360;
		}
	}
	
	if (dx > 0)
	{
		return 90 + ang;
	}
	
	if (dx < 0)
	{
		return 270 + ang;
	}
}

function getHypotenuse(x,y)
{
	var x_2 = x * x;
	var y_2 = y * y;
	var h_2 = x_2 + y_2;
	
	var h = roundNumber(Math.sqrt(h_2),2);
	return h;
}

function getSideFromHyp(s,h)
{
	var s_2 = s * s;
	var h_2 = h * h;
	
	var y = roundNumber(Math.sqrt(h_2 - s_2),2);
	return y;
}

// SETTINGS:
// ------------------------------
// Set this to false to deactivate debugging:
var debug_active = true;
// Set this to true to use canvas:
var use_canvas = false;

function Debug(id,message)
{
	this.id = id;
	this.message = message;
	
	if (debug_active)
	{
		document.getElementById(id).innerHTML = message;
	}
}

// Borrowed from:
// http://www.geekdaily.net/2007/07/04/javascript-cross-browser-window-size-and-centering/
// to address IE compatibility

function Get_Window_Size()
{
	var w = 0;
	var h = 0;

	//IE
	if(!window.innerWidth)
	{
		//strict mode
		if(!(document.documentElement.clientWidth == 0))
		{
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		}
		//quirks mode
		else
		{
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}
	}
	//w3c
	else
	{
		w = window.innerWidth;
		h = window.innerHeight;
	}
	return {
		width:w,
		height:h
	};
}

function Toggle_Display(id)
{
	var elem = document.getElementById(id);
	
	if (elem.style.display == 'none' || !elem.style.display)
	{
		elem.style.display = 'block'
	}
	else if (elem.style.display == 'block' || elem.style.display == 'inline')
	{
		elem.style.display = 'none';
	}
}

function Set_Display(id,display)
{
	var elem = document.getElementById(id);
	
	elem.style.display = display;
}

function Rotate_Canvas(degrees,ctx)
{
	ctx.translate(canvas.width/2, canvas.height/2);
	
	ctx.rotate(degToRad(degrees));

	ctx.translate(-canvas.width/2, -canvas.height/2);
}

function Vector(args)
{
	var x = (args.x) ? args.x : 0,
		y = (args.y) ? args.y : 0,
		
		Length = function()
		{
			return Math.sqrt((x * x) + (y * y));
		},
		
		Subtract = function(v)
		{
			return new Vector(x - v.x, y - v.y);
		},
		
		Dot = function(v)
		{
			return (x * v.x + y * v.y);
		},
		
		Normalize = function()
		{
			var length = this.Length();
			x = x / length;
			y = y / length;
		},
		
		Perp = function()
		{
			return new Vector(-y, x);
		};
	
	return {
		x: x,
		y: y
	};
}
