function Ship(sh_ctx)
{		
	this.ctx = sh_ctx;
	
	this.is_player = false;
	
	this.dx = 0;
	this.dy = 0;
	
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 1;
	
	/* this.draw = {
		x: (canvas.w / 2),
		y: (canvas.h / 2)
	}; */
	
	this.x = (canvas.w / 2);
	this.y = (canvas.h / 2);
	
	this.fill = '#FFF'; //'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
	
	this.coords = {
		x: 0,
		y: 0
	};
	
	//Ship Rotation Stuff
	this.turn = 'none';
	this.facing_angle = 0;
	this.reverse_angle = 0;
	this.rad = degToRad(this.facing_angle);
	this.turn_speed = 180;						// turn this.turn_speed degrees per second
	this.turn_duration = 2000;					// turn 360 degrees in this.turn_duration seconds
	this.turn_increment = 1;					// turn in this.turn_increment degree increments
	this.turn_rad = degToRad(this.turn_speed);
	
	// Ship Motion Stuff
	this.thrust = 'none';
	
	this.move_angle; // track what angle the ship is currently moving at
	
	this.acceleration = 0.1;
	/* this.accel = {
		x: 0,
		y: 0,
		max: 0
	}; */
	this.x_accel = 0;// = roundNumber(getDxDy(this.facing_angle)['dx'] * this.acceleration,2);
	this.y_accel = 0;// = roundNumber(getDxDy(this.facing_angle)['dy'] * this.acceleration,2);
	this.accel_max = 0;
	this.speed = 0;
	this.dx = 0;
	this.dy = 0;
	
	this.max_speed = 5;
	this.max_x = 0;// = roundNumber(getDxDy(this.facing_angle)['dx'] * this.max_speed,2);
	this.max_y = 0;// = roundNumber(getDxDy(this.facing_angle)['dy'] * this.max_speed,2);
	
	/* this.speed = {
		x: 0,
		y: 0,
		tot: 0,
		max_x: 0,
		max_y: 0,
		max_tot: 0
	}; */
	
/*

	if (local)
	{
		pos = new Vector({x: canvas.width/2, y: canvas.height/2});
	}
	else
	{
		viewport.worldToScreen(currentState.pos.x, currentState.pos.y);
	}
	
*/
	
	this.Draw = function()
	{
		this.ctx.setTransform(1,0,0,1,0,0);
		Rotate_Canvas(this.facing_angle,this.ctx);
		//this.ctx.clearRect(this.x - 20,this.y - 20,40,40);
		
		this.ctx.fillStyle = this.fill;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x,this.y + 5);
		this.ctx.lineTo(this.x - 10,this.y + 10);
		this.ctx.lineTo(this.x,this.y - 15);
		this.ctx.lineTo(this.x + 10,this.y + 10);
		this.ctx.lineTo(this.x,this.y + 5);
		this.ctx.closePath();
		this.ctx.fill();
		
		if (this.thrust == 'thrust')
		{
			//this.ctx.fillStyle = '#F30';
			
			this.ctx.fillStyle = '#03F';
			this.ctx.beginPath();
			this.ctx.moveTo(this.x,this.y + 5);
			this.ctx.lineTo(this.x - 3,this.y + 7);
			this.ctx.lineTo(this.x,this.y + 20);
			this.ctx.lineTo(this.x + 3,this.y + 7);
			this.ctx.lineTo(this.x,this.y + 5);
			this.ctx.moveTo(this.x - 3,this.y + 7);
			this.ctx.lineTo(this.x - 5,this.y + 15);
			this.ctx.lineTo(this.x - 7,this.y + 9);
			this.ctx.lineTo(this.x - 3,this.y + 7);
			this.ctx.moveTo(this.x + 3,this.y + 7);
			this.ctx.lineTo(this.x + 5,this.y + 15);
			this.ctx.lineTo(this.x + 7,this.y + 9);
			this.ctx.lineTo(this.x + 3,this.y + 7);
			this.ctx.closePath();
			this.ctx.fill();
		}
	}
	this.Draw();
	
	this.Rotate = function()
	{
		if (this.use_rad)
		{
			if (this.rad < this.turn_rad)
			{
				this.rad = 2*Math.PI;
			}
			if (this.rad > 2*Math.PI)
			{
				this.rad = this.turn_rad;
			}
			if (this.rad == 0)
			{
				this.rad = 2*Math.PI;
			}
		}
		
		if (!this.use_rad)
		{
			if (this.facing_angle < this.turn_increment)
			{
				this.facing_angle = 360;
			}
			if (this.facing_angle > 360)
			{
				this.facing_angle = this.turn_increment;
			}
			if (this.facing_angle == 0)
			{
				this.facing_angle = 360;
			}
		}
		
		switch (this.turn)
		{
			case 'left':
				if (this.use_rad)
				{
					this.rad -= this.turn_rad;
					Rotate_Canvas(-this.turn_rad,this.ctx);
				}
				if (!this.use_rad)
				{
					this.facing_angle -= this.turn_increment;
					//Rotate_Canvas(-this.turn_increment,this.ctx);
				}
				break;
			case 'right':
				if (this.use_rad)
				{
					this.rad += this.turn_rad;
					Rotate_Canvas(this.turn_rad,this.ctx);
				}
				if (!this.use_rad)
				{
					this.facing_angle += this.turn_increment;
					//Rotate_Canvas(this.turn_increment,this.ctx);
				}
				break;
			case 'reverse':
				if (this.use_rad)
				{
					this.rad += this.turn_rad;
					Rotate_Canvas(this.turn_rad,this.ctx);
				}
				if (!this.use_rad)
				{
					if (this.facing_angle != this.reverse_angle)
					{
						if (this.facing_angle - this.reverse_angle <= 0)
						{
							this.facing_angle += this.turn_increment;
							//Rotate_Canvas(this.turn_increment,this.ctx);
							//console.log('reverse right');
						}
						if (this.facing_angle - this.reverse_angle > 0)
						{
							this.facing_angle -= this.turn_increment;
							//Rotate_Canvas(-this.turn_increment,this.ctx);
							//console.log('reverse left');
						}
					}
					//this.facing_angle += this.reverse_angle;
					//Rotate_Canvas(this.reverse_angle,this.ctx);
				}
				break;
		}
	}
	
	this.Move = function()
	{
		this.x_accel = 0;
		this.y_accel = 0;
		
		this.coords['x'] -= this.dx;
		this.coords['x'] = roundNumber(this.coords['x'],2);
		this.coords['y'] += this.dy;
		this.coords['y'] = roundNumber(this.coords['y'],2);
		
		this.speed = getHypotenuse(this.dx, this.dy);
		
		this.accel_max = roundNumber(((this.speed / this.max_speed) * 100),2);
		
		this.reverse_angle = roundNumber(getAngle1(this.dx,this.dy),0);
		
		// Move Angle Handling
		this.move_angle = roundNumber(getAngle1(this.dx,this.dy),0);
		
		this.move_angle -= 180;
		
		if (this.move_angle < this.turn_increment)
		{
			this.move_angle += 360;
		}
		if (this.move_angle > 360)
		{
			this.move_angle = this.turn_increment;
		}
		if (this.move_angle == 0)
		{
			this.move_angle = 360;
		}
		
		// Max Speed Handling
		if (this.dx !=0)
		{
			this.max_x = roundNumber(getDxDy(this.move_angle)['dx'] * this.max_speed,2);
			
			if (this.dx > 0 && this.dx > this.max_x)
			{
				this.dx = this.max_x;
			}
			
			if (this.dx < 0 && this.dx < this.max_x)
			{
				this.dx = this.max_x;
			}
		}
		else if (this.dx == 0)
		{
			this.max_x = roundNumber(getDxDy(this.facing_angle)['dx'] * this.max_speed,2);
		}
		
		if (this.dy !=0)
		{
			this.max_y = roundNumber(getDxDy(this.move_angle)['dy'] * this.max_speed,2);
			
			if (this.dy > 0 && this.dy > this.max_y)
			{
				this.dy = this.max_y;
			}
			
			if (this.dy < 0 && this.dy < this.max_y)
			{
				this.dy = this.max_y;
			}
		}
		else if (this.dy == 0)
		{
			this.max_y = roundNumber(getDxDy(this.facing_angle)['dy'] * this.max_speed,2);
		}
		
		// Thruster Handling
		if (!this.inertialess && this.thrust == 'thrust')
		{
			this.x_accel = roundNumber(getDxDy(this.facing_angle)['dx'] * this.acceleration,2);
			this.y_accel = roundNumber(getDxDy(this.facing_angle)['dy'] * this.acceleration,2);
		}
		
		this.dx += this.x_accel;
		this.dy += this.y_accel;
		
		this.dx = roundNumber(this.dx,2);
		this.dy = roundNumber(this.dy,2);
	}
}

function Player_State(args)
{
	var state = {
		turning: 'none', // can be 'left', 'right', or 'none'
		thrusting: 'none', // can be 'forward', 'reverse', or 'none'
		facing_angle: 0, // 1-360
		motion: {
			dx: 0,
			dy: 0
		},
		stats: {
			shield: 100,
			armour: 100,
			ion: 100
		},
		disabled: false,
		syst: {
			id: 0,
			pos: new Vector({x: args.x, y: args.y})
		}
	};
	
	return state;
}

function Player(args)
{
	var vars = {
		id: args.id,
		name: args.name,
		local: args.local,
		state: new Player_State()
	};
	
	var ship = new Ship(args.ctx);
	
	return vars;
}
