// Associating Keycodes with Key Names
var key = {
	// Hardkeys
	esc: 27,
	backspace: 8,
	tab: 9,
	enter: 13,
	space: 32,
	l_win: 91,
	r_win: 92,
	select: 93,
	
	// Modifiers
	shift: 16,
	ctrl: 17,
	alt: 18,
	
	pause_break: 19,
	caps_lock: 20,
	num_lock: 144,
	scroll_lock: 145,
	
	// Navigation
	pgup: 33,
	pgdn: 34,
	end: 35,
	home: 36,
	ins: 45,
	del: 46,
	
	// Arrows
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	
	// Numbers
	zero: 48,
	one: 49,
	two: 50,
	three: 51,
	four: 52,
	five: 53,
	six: 54,
	seven: 55,
	eight: 56,
	nine: 57,
	
	// Numpad
	num_0: 96,
	num_1: 97,
	num_2: 98,
	num_3: 99,
	num_4: 100,
	num_5: 101,
	num_6: 102,
	num_7: 103,
	num_8: 104,
	num_9: 105,
	num_mult: 106,
	num_add: 107,
	num_sub: 109,
	num_dec: 110,
	num_div: 111,
	
	// Letters
	a: 65,
	b: 66,
	c: 67,
	d: 68,
	e: 69,
	f: 70,
	g: 71,
	h: 72,
	i: 73,
	j: 74,
	k: 75,
	l: 76,
	m: 77,
	n: 78,
	o: 79,
	p: 80,
	q: 81,
	r: 82,
	s: 83,
	t: 84,
	u: 85,
	v: 86,
	w: 87,
	x: 88,
	y: 89,
	z: 90,
	
	// Function
	f1: 112,
	f2: 113,
	f3: 114,
	f4: 115,
	f5: 116,
	f6: 117,
	f7: 118,
	f8: 119,
	f9: 120,
	f10: 121,
	f11: 122,
	f12: 123,
	
	// Punctuation
	semicolon: 186,
	equal: 187,
	comma: 188,
	dash: 189,
	period: 190,
	fwd_slash: 191,
	grave: 192,
	open_bracket: 219,
	back_slash: 220,
	close_braket: 221,
	apostrophe: 222
};

// Store Key Pressed State
var pressed = {
	any: false,
	
	// Hardkeys
	esc: false,
	backspace: false,
	tab: false,
	enter: false,
	space: false,
	l_win: false,
	r_win: false,
	select: false,
	
	// Modifiers
	shift: false,
	ctrl: false,
	alt: false,
	
	pause_break: false,
	caps_lock: false,
	num_lock: false,
	scroll_lock: false,
	
	// Navigation
	pgup: false,
	pgdn: false,
	end: false,
	home: false,
	ins: false,
	del: false,
	
	// Arrows
	left: false,
	up: false,
	right: false,
	down: false,
	
	// Numbers
	zero: false,
	one: false,
	two: false,
	three: false,
	four: false,
	five: false,
	six: false,
	seven: false,
	eight: false,
	nine: false,
	
	// Numpad
	num_0: false,
	num_1: false,
	num_2: false,
	num_3: false,
	num_4: false,
	num_5: false,
	num_6: false,
	num_7: false,
	num_8: false,
	num_9: false,
	num_mult: false,
	num_add: false,
	num_sub: false,
	num_dec: false,
	num_div: false,
	
	// Letters
	a: false,
	b: false,
	c: false,
	d: false,
	e: false,
	f: false,
	g: false,
	h: false,
	i: false,
	j: false,
	k: false,
	l: false,
	m: false,
	n: false,
	o: false,
	p: false,
	q: false,
	r: false,
	s: false,
	t: false,
	u: false,
	v: false,
	w: false,
	x: false,
	y: false,
	z: false,
	
	// Function
	f1: false,
	f2: false,
	f3: false,
	f4: false,
	f5: false,
	f6: false,
	f7: false,
	f8: false,
	f9: false,
	f10: false,
	f11: false,
	f12: false,
	
	// Punctuation
	semicolon: false,
	equal: false,
	comma: false,
	dash: false,
	period: false,
	fwd_slash: false,
	grave: false,
	open_bracket: false,
	back_slash: false,
	close_braket: false,
	apostrophe: false
};

KeyboardJS.bind.key('left', function(){ps.turn = 'left';pressed.left = true;pressed.any = true;}, function(){ps.turn = 'none'; pressed.left = false;});

KeyboardJS.bind.key('right', function(){ps.turn = 'right';pressed.right = true;pressed.any = true;}, function(){ps.turn = 'none'; pressed.right = false;});

KeyboardJS.bind.key('up', function(){ps.thrust = 'thrust';pressed.up = true;pressed.any = true;}, function(){ps.thrust = 'none'; pressed.up = false;});

KeyboardJS.bind.key('down', function(){ps.thrust = 'reverse'; ps.turn = 'reverse';pressed.down = true;pressed.any = true;}, function(){ps.thrust = 'none';ps.turn = 'none'; pressed.down = false;});

/* function Key_Checker()
{
	if (pressed.left)
	{
		if (pressed.right)
		{
			ps.turn = 'none';
		}
		else if (!pressed.right)
		{
			ps.turn = 'left';
		}
	}
	else if (pressed.right)
	{
		if (pressed.left)
		{
			ps.turn = 'none';
		}
		else if (!pressed.left)
		{
			ps.turn = 'right';
		}
	}
	else
	{
		ps.turn = 'none';
	}
	
	if (pressed.up)
	{
		ps.thrust = 'thrust';
	}
	else if (ps.inertialess && pressed.down)
	{
		ps.thrust = 'reverse';
	}
	else
	{
		ps.thrust = 'none';
	}
	
	if (pressed.down)
	{
		if (ps.inertialess)
		{
			ps.thrust = 'reverse';
		}
		else if (!ps.inertialess)
		{
			ps.turn = 'reverse'
		}
	} */
	
	/* if (pressed.ctrl)
	{
		if (pressed.d)
		{
			Toggle_Display('debug');
			if (el.debug.style.display != 'none')
			{
				debug_active = true;
			}
			else
			{
				debug_active = false;
			}
		}
	} */
/* } */

/* function Key_Down(e)
{ 
	this.key_id = (window.event) ? event.keyCode : e.keyCode;
	
	switch (key_id)
		{
			case key.left:
				//ps.turn = 'left';
				pressed.left = true;
				pressed.any = true;
				break;
			case key.right:
				//ps.turn = 'right';
				pressed.right = true;
				pressed.any = true;
				break;
			case key.up:
				//ps.thrust = 'thrust';
				pressed.up = true;
				pressed.any = true;
				break;    
			case key.down:
				//ps.thrust = 'reverse';
				pressed.down = true;
				pressed.any = true;
				break; 
			case key.esc:
				//ps.turn = 'right';
				pressed.esc = true;
				pressed.any = true;
				break;
			case key.enter:
				//ps.thrust = 'thrust';
				pressed.enter = true;
				pressed.any = true;
				break;    
			case key.space:
				//ps.thrust = 'reverse';
				pressed.space = true;
				pressed.any = true;
				break;
			case key.y:
				//ps.thrust = 'reverse';
				pressed.y = true;
				//Toggle_Display('chat');
				break;
			case key.m:
				//ps.thrust = 'reverse';
				pressed.m = true;
				//Toggle_Display('map');
				break;
			case key.ctrl:
				//ps.thrust = 'reverse';
				pressed.ctrl = true;
				break;
			case key.d:
				//ps.thrust = 'reverse';
				pressed.d = true;
				break;
		}
}

function Key_Up(e)
{
	this.key_id = (window.event) ? event.keyCode : e.keyCode;
	
	switch (key_id)
	{
		case key.left:
			//ps.turn = 'none';
			pressed.left = false;
			break;  
		case key.right:
			//ps.turn = 'none'
			pressed.right = false;
			break; 
		case key.up:
			//ps.thrust = 'none';
			pressed.up = false;
			break;   
		case key.down:
			//ps.thrust = 'none';
			pressed.down = false;
			break;
		case key.esc:
			//ps.turn = 'right';
			pressed.esc = false;
			break;
		case key.enter:
			//ps.thrust = 'thrust';
			pressed.enter = false;
			break;    
		case key.space:
			//ps.thrust = 'reverse';
			pressed.space = false;
			break;
		case key.y:
			pressed.y = false;
			break;
		case key.m:
			pressed.m = false;
			break;
		case key.ctrl:
			pressed.ctrl = false;
			break;
		case key.d:
			pressed.d = false;
			break;
	}
} */
