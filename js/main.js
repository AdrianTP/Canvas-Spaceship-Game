/**
*	INSERT NAME HERE
*	Created by Adrian Thomas-Prestemon
*	http://adrian.thomas-prestemon.com/game/v3/
*	
*	Version 3.5
*	Updated: 2011-05-26
*	
*	Major Features to Implement:
*	+	Parallax Stars
*	+	Spaceship Rotation
*	/	Newtonian Physics Model
*	+	Star System Boundary Looping
*	-	Weapons System
*	-	Planetary Interaction
*	-	AI and NPC Ships
*	-	Galactic Map System
*	-	Galactic Economy
*	-	Missions System and Storylines
*	-	WebSocket and BiSON for Multiplayer
*	-	User Account System and Possible MySQL Integration for Account Info
*			Storage
*	-	Possible Sprites or User Configuration Option to Include Them via 
*			Downloadable Expansion Packs (Local Storage?)
*	-	Sound Effects
*	-	Graphics and Animations
*	
*	To Do List:
*	
*	FIX THE STARS!!!
*
*	Ship movement:
*	+	FIND AND FIX UNCONTROLLED ACCELERATION BUG
*	-	tweak max speed checking routine to work better/smoother
*	+	change rotation behaviour from frame-based to time based
*	+	change acceleration behaviour from frame-based to time based
*	+	set up ship reverse-direction based on current motion vector
*	+	figure out how to find current angle of motion across all 360 degrees
*	-	pick a format to store game data (systems, spobs, coordinates, etc.)
*		(it needs to be human-readable -- for easy modification like EV resource files)
*		X	MySQL (Problem: slow, server-based, bandwidth usage)
*		X	WebSQL (Problem: Not supported by Firefox)
*		X	IndexedDB (Problem: Far from being properly and uniformly implemented)
*		-	XML	(Problem: cannot be securely stored locally)
*			*	(Workaround: hash and compare client and server copies?)
*		-	Transmit to Local Storage on first login to save bandwidth later?
*			*	(Maximum storage size 5MB)
*			*	(use vectors for graphics, offer user to download image pack for local hosting?)
*	-	Redo contacts section to display list of ships in-system, and friends
*			list including what system friend is currently in
*	
*	
*	
*	
*	
*	
*	
*	
*	
*/

function Resize(e)
{
	//ps.x = (canvas.w / 2);
	//ps.y = (canvas.h / 2);
	
	stars.Create();
	
	// Keeping the canvas square
	canvas.h = Get_Window_Size()['height']-44;
	canvas.w = canvas.h;
	
	Get_Elements();
	
	Set_Elements();
	
	/* if (viewport != undefined) {
		viewport.dimensions.width = canvas.width;
		viewport.dimensions.height = canvas.height;
	}; */

	/* if (stars != undefined) {
		var xRatio = canvas.width/starsOriginalWidth;
		var yRatio = canvas.height/starsOriginalHeight;

		var starCount = stars.length,
			star,
			s;
		for (s = 0; s < starCount; s++) {
			star = stars[s];

			if (star == null) {
				continue;
			};

			star.pos.x *= xRatio;
			star.pos.y *= yRatio;
		};

		starsOriginalWidth = canvas.width;
		starsOriginalHeight = canvas.height;
	}; */
	
	/* var msg = formatMessage(MESSAGE_TYPE_UPDATE_PLAYER_SCREEN, {
		w: viewport.dimensions.width+50,
		h: viewport.dimensions.height+50
	});
	socket.send(msg); */
}

function Debug_Out()
{
	if (debug_active)
	{
		// Ship Stats
		Debug('turn',ps.turn);
		Debug('angle',ps.facing_angle);
		Debug('thrust',ps.thrust);
		Debug('ship_speed',ps.speed);
		Debug('accel',ps.accel);
		Debug('accel_max',ps.accel_max);
		Debug('system_x',ps.coords['x']);
		Debug('system_y',ps.coords['y']);
		Debug('ship_angle',ps.move_angle);
		
		// Star Stats
		Debug('stars_angle',stars.move_angle);
		Debug('stars_speed',stars.speed);
		Debug('stars_dx',stars.dx);
		Debug('stars_dy',stars.dy);
		
		// Key Stats
		Debug('left',pressed.left);
		Debug('right',pressed.right);
		Debug('up',pressed.up);
		Debug('down',pressed.down);
		Debug('esc',pressed.esc);
		Debug('enter',pressed.enter);
		Debug('space',pressed.space);
		
		// Movement Stats
		Debug('x_accel',ps.x_accel);
		Debug('y_accel',ps.y_accel);
		Debug('max_x',ps.max_x);
		Debug('max_y',ps.max_y);
	}
	
}

function Update()
{	
	ps.coords['x'] = system.Bounds(ps.coords['x'],ps.coords['y'])['x'];
	ps.coords['y'] = system.Bounds(ps.coords['x'],ps.coords['y'])['y'];
	
	ps.Move();
	ps.Rotate();
	stars.Move(ps.dx,ps.dy);	
	//Key_Checker();
	
	//document.getElementById('speedProg').value = ps.accel_max;
	
	Debug_Out();
}

function Draw()
{	
	canvas.ctx.clearRect(0,0,canvas.width,canvas.height);
	ps.Draw();
	stars.Draw();
	
/* 	if (pressed.any || getHypotenuse(stars.dx,stars.dy) != 0)
	{
		canvas.ctx.clearRect(0,0,canvas.w,canvas.h);
	}
	
	if (pressed.any)
	{
		ps.Draw();
	}
	
	if (getHypotenuse(stars.dx,stars.dy) != 0)
	{
		stars.Draw();
	} */
}

function Get_Elements()
{
	canvas = {
		el: document.getElementById('stage'),
		ctx: canvas.el.getContext('2d'),
		w: Get_Window_Size()['height'] - 44,
		width: canvas.el.getAttribute('width'),
		h: Get_Window_Size()['height'] - 44,
		height: canvas.el.getAttribute('height'),
		Set: function()
		{
			//this.el.setAttribute('width',canvas.w);
			//this.el.setAttribute('height',canvas.h);
			this.el.style.width = canvas.w + 'px';
			this.el.style.height = canvas.h + 'px';
		}
	};
	
	el = {
		start: document.getElementById('start'),
		stop: document.getElementById('stop'),
		debug_button: document.getElementById('debug_button'),
		debug: document.getElementById('debug'),
		stage: document.getElementById('stage'),
		chat: document.getElementById('chat'),
			chat_header: document.getElementById('chat_header'),
			chat_contents: document.getElementById('chat_contents'),
			chat_input: document.getElementById('chat_input'),
				chat_box: document.getElementById('chat_box'),
				chat_button: document.getElementById('chat_button'),
		map: document.getElementById('map'),
			map_header: document.getElementById('map_header'),
			map_body: document.getElementById('map_body'),
				map_area: document.getElementById('map_area'),
				map_info: document.getElementById('map_info'),
			map_footer: document.getElementById('map_footer'),
		page: document.getElementById('page'),
			sidebar: document.getElementById('sidebar'),
				radar: document.getElementById('radar'),
				target: document.getElementById('target'),
			frame: document.getElementById('frame'),
				levels: document.getElementById('levels'),
					shield: document.getElementById('shield'),
					armour: document.getElementById('armour'),
//					ion: document.getElementById('ion'),
					fuel: document.getElementById('fuel'),
				amounts: document.getElementById('amounts'),
//					power: document.getElementById('power'),
//					weap: document.getElementById('weap'),
					cargo: document.getElementById('cargo'),
					credits: document.getElementById('credits'),
			panel: document.getElementById('panel'),
				list: document.getElementById('list'),
		Set_Size:  function(elem,w,h)
		{
			if(w)
			{
				elem.style.width = w + 'px';
			}
			if(h)
			{
				elem.style.height = h + 'px';
			}
		},
		Set_Pos: function(elem,x,y)
		{
			if(x)
			{
				elem.style.left = x + 'px';
			}
			if(y)
			{
				elem.style.top = y + 'px';
			}
		}
	};
}

function Set_Elements()
{
	canvas.Set();
	
	el.Set_Size(el.chat,400,400);
	el.Set_Pos(el.chat,((Get_Window_Size()['width'] / 2) - (parseInt(el.chat.style.width,10) / 2)),((Get_Window_Size()['height'] / 2) - (parseInt(el.chat.style.height,10) / 2)));
	
	el.Set_Size(el.map,700,500);
	el.Set_Pos(el.map,((Get_Window_Size()['width'] / 2) - (parseInt(el.map.style.width,10) / 2)),((Get_Window_Size()['height'] / 2) - (parseInt(el.map .style.height,10) / 2)));
	
	el.Set_Size(el.page,Get_Window_Size()['width'],Get_Window_Size()['height']);
		
		el.Set_Size(el.sidebar,((Get_Window_Size()['width'] - Get_Window_Size()['height']) / 2),Get_Window_Size()['height']);
			
			el.Set_Size(el.radar,((Get_Window_Size()['width'] - Get_Window_Size()['height']) / 2),((Get_Window_Size()['width'] - Get_Window_Size()['height']) / 2));
			
		el.Set_Size(el.frame,Get_Window_Size()['height']-44,Get_Window_Size()['height']);
			
			el.Set_Size(el.levels,Get_Window_Size()['height']-44,null);
				
				el.Set_Size(el.shield,((Get_Window_Size()['height']-44)/3)-1,null);
				el.Set_Size(el.armour,((Get_Window_Size()['height']-44)/3)-1,null);
				el.Set_Size(el.fuel,((Get_Window_Size()['height']-44)/3),null);
			
			el.Set_Size(el.amounts,(Get_Window_Size()['height']-44),null);
				
				el.Set_Size(el.cargo,((Get_Window_Size()['height']-44)/2)-1,null);
				el.Set_Size(el.credits,((window.innerHight-44)/2),null);
				
		el.Set_Size(el.panel,((Get_Window_Size()['width'] - Get_Window_Size()['height']) / 2),Get_Window_Size()['height']);
			
			el.Set_Size(el.target,((Get_Window_Size()['width'] - Get_Window_Size()['height']) / 2),(Get_Window_Size()['height'] / 3) - 2);
			el.Set_Size(el.list,((Get_Window_Size()['width'] - Get_Window_Size()['height']) / 2),(Get_Window_Size()['height'] / 3) * 2);
}

function Window_Manager()
{
	this.handles = {
		chat: el.chat,
		map: el.map
	};
	
	this.Open = function(handle)
	{
		var handle = handle;
		handle.style.display = 'block';
		handle.focus();
	}
	
	this.Close = function(handle)
	{
		var handle = handle;
		handle.style.display = 'none';
		handle.blur();
	}
	
	this.Close_All = function()
	{
		// loop through this.handles and apply:
		// style.display = 'none'
		// and
		// .blur()
		// to all
		// Also apply onmousedown='drag(this.parentNode,event);';
	}
}

function Do_XML()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","./xml/ships.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
}

function Add_Canvas()
{
	canvas.el = document.createElement('canvas');
	canvas.el.setAttribute('id', 'stage');
	canvas.el.setAttribute('width', '600');
	canvas.el.setAttribute('height', '600');
	var amounts = document.getElementById('amounts');
	var frame = document.getElementById('frame');
	frame.insertBefore(canvas.el,amounts);
	//document.getElementById('frame').appendChild(canvas.el);
	if (excanvas) {G_vmlCanvasManager.initElement(canvas.el);};
	canvas.ctx = canvas.el.getContext('2d');
}

function Init()
{
	//draw();
	//addEvent(window,'keydown',function(){Key_Down();});
	//addEvent(window,'keyup',function(){Key_Up();});
	addEvent(window,'resize',function(){Resize();});
	
	Add_Canvas();
	
//	Load_Images();
	
	Get_Elements();
	
	Set_Elements();
	
	shortcut.add("Alt+D",function(){Toggle_Display('debug');if (el.debug.style.display != 'none'){debug_active = true;}else{debug_active = false;}},{disable_in_input:true});
	shortcut.add("Y",function(){Toggle_Display('chat');el.chat_box.focus();},{disable_in_input:true});
	shortcut.add("M",function(){Toggle_Display('map');el.map.focus();},{disable_in_input:true});
	shortcut.add("ESC",function(){/* Set_Display('map','none');Set_Display('chat','none'); */el.chat_box.blur();el.chat_box.value = '';});
	
	el.chat_header.onmousedown = function(){drag(this.parentNode,event);};
	el.map_header.onmousedown = function(){drag(this.parentNode,event);};
	
//	el.chat.onblur = function(){Set_Display('chat','none');};
//	el.map.onblur = function(){Set_Display('map','none');};
	
	play = true;
	
	Do_XML();
	
	/* el.start.onclick = function()
	{
		Set_Display('start','none');
		Set_Display('stop','block');
		play = true;
		
		timer.Run();
	}
	
	el.stop.onclick = function()
	{
		Set_Display('start','block');
		Set_Display('stop','none');
		
		timer.Halt();
	}
	
	el.debug_button.onclick = function()
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
	} */ 
	
	stars = new Stars(3,96,canvas.ctx);
	
	ps = new Ship(canvas.ctx);
	ps.is_player = true;
	
	system = new System(4);
	
	timer = new Timer(60);
	
	/* player = new Ship('player','starbridge');
	player.Create();
	player.Init(); */
	
	if (play == true)
	{
		timer.Run();
	}
}
/* 
// Defining a Sprite class:
// ------------------------------
// The Sprite class will handle everything about sprites; loading the images, tracking
// what frame is active, handling multiple sprite sets per sprite (such as ships that
// tilt while turning, different animations for walk and run, etc.), starting frame in
// an image (if an image contains multiple sprites), and a bunch of other stuff I
// haven't figured out how to explain yet.
// 
// How it Works:
// ------------------------------
// It takes the image specified in file_path and displays a portion of it sized according
// to x_size and y_size (the width and height of the sprite itself, not the full image),
// then cycles through a row until it reaches the last column/cell, at which point it 
// moves down one row and continues to cycle.  It repeats this behaviour until it reaches
// the absolute last frame, at which point it resets itself to be called again by a timer
// function for infinite looping, and it can cycle in a specified direction to offer greater
// control of sprite frame display.
// 
// Example:
// ------------------------------
// var player_ship = new Sprite('player_ship',48,48,6,6,'./img/ships/shiptype/base.png');
// player_ship.Draw('stage');  // Outputs error to JS Console if div already exists
// player_ship.Cycle('fwd'); // Outputs current frame values to JS Console
// 
// Available Functions:
// ------------------------------
// Draw(el_name,z_index)   - Adds the sprite's div to the document
// Display_Frame() - Changes the backgroundPosition property of the sprite's div.
//                   Is called by Sprite.Cycle(fwd_rev), and not designed to be called
//                   directly
// Cycle(fwd_rev)  - Cycles through the defined frames in the sprite image, accepts
//                   argument designating forward or reverse, and variants thereof.
// 
function Sprite(sprite_name,context,x_size,y_size,num_cols,num_rows,opacity,file_path)
{
	this.sprite_name = sprite_name;
	this.x_start = 0;
	this.y_start = 0;
	this.x_size = x_size;
	this.y_size = y_size;
	this.num_cols = num_cols;
	this.num_rows = num_rows;
	this.opacity = opacity;
	this.file_path = file_path;
	this.x_pos = 0;
	this.y_pos = 0;
	this.x_offset = [0];
	this.y_offset = [0];
	this.x_index = 0;
	this.y_index = 0;
	this.x_off;
	this.y_off;	
	this.parent;
	this.elem;
	this.elem_id;
	this.total_frames = num_rows * num_cols;
	this.total_width = x_size * num_cols;
	this.total_height = y_size * num_rows;
	this.current_frame = 1;
	this.timeout_id;
	this.cycle_speed = 100;
	this.cycle_running = 0;
	this.direction;
	this.image = new Image();
	this.image.src = file_path;
	
	this.context = document.getElementById(context).getContext('2d');
	
	this.visible = false;
	this.clear = false;
	
	// Displaying the Current Frame:
	// ------------------------------
	// This function handles the actual background-position change of the sprite_name div
	// element.
	//
	this.Display_Frame = function()
	{
		this.x_off = this.x_offset[this.x_index];
		this.y_off = this.y_offset[this.y_index];
		this.context.clearRect(this.x,this.y,this.x_size,this.y_size);
		if (this.visible)
		{
			this.context.drawImage(this.image,(this.x_pos + this.x_off),(this.y_pos + this.y_off),this.x_size,this.y_size,this.x,this.y,this.x_size,this.y_size);
		}
	}
	
	this.Draw = function()
	{
		
		//stage.clearRect(this.x,this.y,this.x_size,this.y_size);
		if (this.visible)
		{
			this.context.drawImage(this.image,this.x_pos,this.y_pos,this.x_size,this.y_size,this.x,this.y,this.x_size,this.y_size);
		}
	}
	
	this.Cycle = function()//fwd_rev) // Handles tracking which sprite frame should be active
	{
		//this.fwd_rev = fwd_rev;
		
		this.fwd_rev = this.direction;
		
		if (!this.fwd_rev)
		{
			this.x_pos = this.x_pos;
			this.y_pos = this.y_pos;
			this.current_frame = this.current_frame;
		}
		
		if (this.fwd_rev == 'rev')
		{
			this.x_pos = this.x_pos - this.x_size;
			
			if (this.x_pos < 0)
			{
				this.x_pos = this.total_width - this.x_size;
				this.y_pos = this.y_pos - this.y_size;
			}
			if (this.y_pos < 0)
			{
				this.y_pos = this.total_height - this.y_size;
			}
			this.current_frame --;
			if (this.current_frame < 1)
			{
				this.current_frame = this.total_frames;
			}
			if (this.current_frame > this.total_frames)
			{
				this.current_frame = 1;
			}
//			this.timeout_id = setTimeout(sprite_name + ".Cycle('rev')",this.cycle_speed);
		}
		
		if (this.fwd_rev == 'fwd')
		{
			this.x_pos = this.x_pos + this.x_size;
			if (this.x_pos > this.total_width - this.x_size)
			{
				this.x_pos = 0;
				this.y_pos = this.y_pos + this.y_size;
			}
			if (this.y_pos > this.total_height - this.y_size)
			{
				this.y_pos = 0;
			}
			this.current_frame ++;
			if (this.current_frame < 1)
			{
				this.current_frame = this.total_frames;
			}
			if (this.current_frame > 36)
			{
				this.current_frame = 1;
			}
//			this.timeout_id = setTimeout(sprite_name + ".Cycle('fwd')",this.cycle_speed);
		}
		this.Display_Frame();
	}
}

function Get_Ship_Stats(type)
{
	this.type = type;
	this.ship_size;
	this.glow_size;
	this.max_speed;
	this.rot_speed;
	this.accel;
	
	switch (this.type)
	{
		case 'starbridge':
			this.ship_size = 72;
			this.glow_size = 72;
			this.max_speed = 0.5;
			this.rot_speed = 6;
			this.accel = 0.1;
			this.armour = 150;
			this.armour_recharge = 0;
			this.shield = 300;
			this.shield_recharge = 30;
			break;
		
		case 'lightning':
			this.ship_size = 48;
			this.glow_size = 48;
			this.max_speed = 0.6;
			this.rot_speed = 5;
			this.accel = 0.2;
			this.armour = 100;
			this.armour_recharge = 0;
			this.shield = 250;
			this.shield_recharge = 50;
			break;
	}
	return [this.ship_size,this.glow_size,this.max_speed,this.rot_speed,this.accel,this.armour,this.armour_recharge,this.shield,this.shield_recharge];
}

function Ship(name,type,x_start,y_start)
{
	this.name = name;
	this.type = type;
	this.x_start = x_start;
	this.y_start = y_start;
	
	this.stats = Get_Ship_Stats(type);
	
	this.type_ship_size = this.stats[0];
	this.type_glow_size = this.stats[1];
	this.ship_opacity = 100;
	this.glow_opacity = 0;
	this.file_path = './img/ships/' + type + '/';
	
	this.canvas_x = 600;
	this.canvas_y = 600;
	
	// Ship Attributes:
	
	// + Ship Speed:
	// - stock max speed
	this.type_max_speed = this.stats[2];
	// - instance speed bonus
	this.speed_bonus = 0;
	// - instance calculated max speed
	this.max_speed = this.type_max_speed + this.speed_bonus;
	// - are the ship's thrusters active?
	this.is_thrust = false;
	// - tells the ship to thrust
	this.thrust; // can equal 'thrust', 'reverse', or 'none'
	// - tracks the ship's current speed
	this.current_speed = 0;
	
	// + Ship Rotation Speed:
	// - stock rotation speed
	this.type_rot_speed = this.stats[3];
	// - instance rotation speed bonus
	this.rot_bonus = 0;
	// - instance calculated rotation speed
	this.rot_speed = this.type_rot_speed + this.rot_bonus;
	// - is this ship turning?
	this.is_turn = false;
	// - tells the ship to turn
	this.turn; // can equal 'left', 'right, or 'none'
	// - tracks the ship's current angle
	this.current_angle;
	
	// + Ship Acceleration:
	// - stock acceleration speed
	this.type_accel = this.stats[4];
	// - instance acceleration bonus
	this.accel_bonus = 0;
	// - instance calculated acceleration
	this.accel_increment = this.type_accel + this.accel_bonus;
	// - is this ship accelerating?  Should be set back to false once max_speed is reached.
	this.is_accel = false;
	// - is this ship decelerating?  Should be set back to false once speed = 0.
	this.is_decel = false;
	// - tells the ship to accelerate.  Should have no effect once max_speed is reached.
	this.accelerate; // can equal 'accelerate', 'decelerate', or 'none'
	// - tracks the ship's current percentage of max speed
	this.accel_percent;
	
	// + Ship Armour:
	// - stock armour
	this.type_armour = this.stats[5];
	// - stock armour recharge
	this.type_armour_recharge = this.stats[6];
	// - instance armour bonus
	this.armour_bonus = 0;
	// - instance armour recharge bonus
	this.armour_recharge_bonus = 0;
	// - instance calculated armour
	this.armour = this.type_armour + this.armour_bonus;
	// - instance calculated armour recharge
	this.armour_recharge = this.type_armour_recharge + this.armour_recharge_bonus;
	// - is this ship damaged?
	this.armour_damaged = false;
	// - tells the ship to turn
	this.ping_armour; // can equal 'plus', 'minus, or 'none'
	// - tracks the ship's current angle
	this.current_armour;
	
	// + Ship Shield:
	// - stock shield
	this.type_shield = this.stats[7];
	// - stock shield recharge
	this.type_shield_recharge = this.stats[8];
	// - instance shield bonus
	this.shield_bonus = 0;
	// - instance shield recharge bonus
	this.shield_recharge_bonus = 0;
	// - instance calculated shield
	this.shield = this.type_shield + this.shield_bonus;
	// - instance calculated shield recharge
	this.shield_recharge = this.type_shield_recharge + this.shield_recharge_bonus;
	// - is this ship damaged?
	this.shield_damaged = false;
	// - tells the ship to turn
	this.ping_shield; // can equal 'plus', 'minus, or 'none'
	// - tracks the ship's current angle
	this.current_shield;
	
	this.x_pos;
	this.y_pos;
	this.ship_sprite;
	this.glow_sprite;
	this.thrusters;
	
	this.tilt_counter = 0;
	
	this.start_time = new Date();
	this.current_time;
	this.goal_time = 10;
	
	this.glow_vis = false;
	
	// Creates the instances of the required objects to make a ship
	// 
	this.Create = function()
	{
		this.ship_sprite = new Sprite(this.name + '_ship','ship',this.type_ship_size,this.type_ship_size,6,6,this.ship_opacity,this.file_path + 'base.png');
		
		this.glow_sprite = new Sprite(this.name + '_glow','glow',this.type_glow_size,this.type_glow_size,6,6,this.glow_opacity,this.file_path + 'glow.png');
		
		this.thrusters = new Move_Field('thrusters');
	}
	
	// Initializes the ship's sprites by drawing them on the screen
	// 
	this.Init = function()
	{
		this.ship_sprite.visible = true;
		this.glow_sprite.visible = false;
		this.ship_sprite.clear = false;
		this.glow_sprite.clear = true;
		this.ship_sprite.Draw();//'stage',1);
		this.glow_sprite.Draw();//'stage',2);
		
		if (this.name == 'player')
		{
			this.ship_sprite.y_offset[0] = 0;
			this.ship_sprite.y_offset[1] = this.type_ship_size * 6;
			this.ship_sprite.y_offset[2] = this.type_ship_size * 12;
			
			this.ship_sprite.x = (this.canvas_x / 2) - (this.type_ship_size / 2);
			this.ship_sprite.y = (this.canvas_y / 2) - (this.type_ship_size / 2);
			
			this.glow_sprite.y_offset[0] = 0;
			this.glow_sprite.y_offset[1] = this.type_glow_size * 6;
			this.glow_sprite.y_offset[2] = this.type_glow_size * 12;
			
			this.glow_sprite.x = (this.canvas_x / 2) - (this.glow_sprite.x_size / 2);
			this.glow_sprite.y = (this.canvas_y / 2) - (this.glow_sprite.y_size / 2);
		}
		else
		{
			this.ship_sprite.y_offset[0] = 0;
			this.ship_sprite.y_offset[1] = this.type_ship_size * 6;
			this.ship_sprite.y_offset[2] = this.type_ship_size * 12;
			
			this.ship_sprite.elem_id.style.position='absolute';
			this.ship_sprite.elem_id.style.top = this.y_start + 'px'; //modify to include placement to fix for size
			this.glow_sprite.elem_id.style.marginTop = '-' + (this.type_ship_size / 2) + 'px';
			this.ship_sprite.elem_id.style.left = this.x_start + 'px'; //modify to include placement to fix for size
			this.glow_sprite.elem_id.style.marginLeft = '-' + (this.type_ship_size / 2) + 'px';
			this.ship_sprite.elem_id.style.backgroundColor = '#F00';
			
			this.glow_sprite.y_offset[0] = 0;
			this.glow_sprite.y_offset[1] = this.type_glow_size * 6;
			this.glow_sprite.y_offset[2] = this.type_glow_size * 12;
			
			this.glow_sprite.elem_id.style.position='absolute';
			this.glow_sprite.elem_id.style.top = this.y_start + 'px'; //modify to include placement to fix for size
			this.glow_sprite.elem_id.style.marginTop = '-' + (this.type_glow_size / 2) + 'px';
			this.glow_sprite.elem_id.style.left = this.x_start + 'px'; //modify to include placement to fix for size
			this.glow_sprite.elem_id.style.marginLeft = '-' + (this.type_glow_size / 2) + 'px';
		}
	}
	
	// Handles turning the ship by cycling the sprites and switching between
	// the ship's defined sprite sets
	// 
	this.Turn = function()
	{
		switch (this.turn)
		{
			case 'none':
				this.is_turn = false;
				// reset tilt delay counter
				this.ship_sprite.y_index = 0;
				this.glow_sprite.y_index = 0;
				this.ship_sprite.direction = null;
				this.glow_sprite.direction = null;
				Debug('turn','none');
				break;
			case 'left':
				this.is_turn = true;
				// increment tilt delay counter
				// once counter reaches 4, start tilt
				this.ship_sprite.y_index = 1;
				this.glow_sprite.y_index = 1;
				this.ship_sprite.direction = 'rev';
				this.glow_sprite.direction = 'rev';
				Debug('turn','left');
				break;
			case 'right':
				this.is_turn = true;
				// increment tilt delay counter
				// once counter reaches 4, start tilt
				this.ship_sprite.y_index = 2;
				this.glow_sprite.y_index = 2;
				this.ship_sprite.direction = 'fwd';
				this.glow_sprite.direction = 'fwd';
				Debug('turn','right');
				break;
		}
		
		if (heartbeat_counter % this.rot_speed == 0)
		{
			this.ship_sprite.Cycle();
			this.glow_sprite.Cycle();
		}

		this.current_angle = (this.ship_sprite.current_frame * 10) - 10;
		Debug('angle',this.current_angle);
		//console.log(this.current_angle);
	}
	
	this.Move_Background = function()
	{
		// make the thrust move the other layers
		// change backgroundPosition of background layer
		// or change x and y offsets of dynamic stars background
	}
	
	this.Move_Sprite = function()
	{
		// make the thrust move the ship
		// change top and left properties of ship layer
	}
	
	// Handles ship thrust:
	// - displays/hides glow sprite
	// - determines whether ship is player ship, and if so changes movement
	// 		focus from moving the ship to moving the playing field
	// 
	this.Thrust = function()
	{
		switch (this.thrust)
		{
			case 'thrust':
//				this.glow_sprite.elem_id.style.opacity = 1;
				this.is_thrust = true;
				this.accelerate = 'accelerate';
				this.glow_sprite.visible = true;
				Debug('thrust','thrust');
//				console.log('thrust');
				break;
			case 'reverse':
//				this.glow_sprite.elem_id.style.opacity = 0;
				this.is_thrust = true;
				this.accelerate = 'decelerate';
				this.glow_sprite.visible = false;
				Debug('thrust','reverse');
//				console.log('reverse');
				break;
			case 'none':
//				this.glow_sprite.elem_id.style.opacity = 0;
				this.is_thrust = false;
				this.accelerate = 'none';
				this.glow_sprite.visible = false;
				Debug('thrust','none');
//				console.log('none');
				break;
		}
		
		if (this.name == 'player')
		{
			this.Move_Background()
		}
		else
		{
			this.Move_Sprite();
		}
		
		this.Accelerate();
	}
	
	// Handles ship acceleration:
	// - keeps track of ship's speed relative to ship's max speed
	// - modifies parameters of Thrust()
	// 
	this.Accelerate = function()
	{
		switch (this.accelerate)
		{
			case 'accelerate':
				this.is_accel = true;
				this.is_decel = false;
				Debug('accel','accelerate');
//				console.log('accelerate');
				break;
			case 'decelerate':
				this.is_accel = false;
				this.is_decel = true;
				if (this.is_inertialess)
				{
					// speed --;
				}
				else
				{
					// turn around according to stars' angle of motion
				}
				Debug('accel','decelerate');
//				console.log('decelerate');
				break;
			case 'none':
				this.is_accel = false;
				this.is_decel = false;
				Debug('accel','none');
				break;
//				console.log('none');
		}
	}
}

var images = ['./img/ships/starbridge/base.png','./img/ships/starbridge/glow.png'];

var image = [];

function Load_Images()
{
	for (var i = 0; i < images.length; i++)
	{
		image[i] = new Image();
		image[i].src = images[i];
	}
} */
