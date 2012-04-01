function Stars(num_layers,num_stars,stars_context)
{		
	this.mult = 4;
	this.num_l = num_layers;
	this.num_s = Math.floor((num_stars * (this.mult ^ 3)) / (num_layers * 2));
	this.ctx = stars_context;
	
	this.star;
	this.stars = new Array(this.num_l);
	for (var i = 0; i < this.num_l; i++)
	{
		this.stars[i] = new Array(this.num_s * (i + 1));
	}
	
	this.dx = 0;
	this.dy = 0;
	
	this.r = 255;
	this.g = 255;
	this.b = 255;
	this.a = 1;
	
	this.l_mult;
	
	this.move_angle = 0;
	
	this.Draw = function()
	{
		this.ctx.setTransform(1,0,0,1,0,0);
		//this.ctx.clearRect(0,0,canvas.width,canvas.height);
		for (i = 0; i < this.num_l; i++)
		{
			for (j = 0; j < this.stars[i].length; j++)
			{
				this.star = this.stars[i][j];
				if (this.star.x <= canvas.width && this.star.x >= 0 && this.star.y <= canvas.height && this.star.y >= 0)
				{	
					this.ctx.fillStyle = this.star.fill;
					this.ctx.beginPath();
					this.ctx.arc(this.star.x,this.star.y,this.star.radius,0,Math.PI*2,false);
					this.ctx.closePath();
					this.ctx.fill();
				}
			}
		}
	}
	
	this.Create = function()
	{
		for (i = 0; i < this.num_l; i++)
		{
			for (j = 0; j < this.stars[i].length; j++)
			{
				this.l_mult = (Math.round(1 / ((i + 1) / this.num_l)));
				this.stars[i][j] = new Array();
				this.stars[i][j] = {x:0,y:0,radius:0,fill:'rgba(255,255,255,1)'};
				this.star = this.stars[i][j];
				this.star.x = Math.floor(Math.random() * (canvas.width * this.mult)) + 1;
				this.star.y = Math.floor(Math.random() * (canvas.height * this.mult)) + 1;
				
				// Random-ish radius
				this.star.radius = ((Math.floor(Math.random() * 101) / 2) / 100) * this.l_mult;
				
				if (this.star.radius < 0.5)
				{
					this.star.radius += (Math.floor(Math.random() * 21) / 100);
				}
				if (this.star.radius > 1.5)
				{
					this.star.radius -= (Math.floor(Math.random() * 21) / 100);
				}
				
				// Random-ish opacity
				this.a = ((Math.floor(Math.random() * 31) + 70) / 100) * this.l_mult;
				
				this.star.fill = 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
			}
		}
		this.Draw();
	}
	this.Create();
	
	this.Move = function(vx,vy)
	{
		this.dx = vx;
		this.dy = vy;
		
		this.move_angle = roundNumber(getAngle1(this.dx,this.dy),0);
		this.speed = getHypotenuse(this.dx,this.dy);
		
		for (i = 0; i < this.num_l; i++)
		{
			for (j = 0; j < this.stars[i].length; j++)
			{
				this.l_mult = (Math.round(1 / ((i + 1) / this.num_l)));
				this.star = this.stars[i][j];
				this.star.x += this.dx / (i + 1);
				this.star.y += this.dy / (i + 1);
				if (this.star.x > (canvas.width * this.mult))
				{
					this.star.x = 0;
				}
				else if (this.star.x < 0)
				{
					this.star.x = (canvas.width * this.mult);
				}
				
				if (this.star.y > (canvas.height * this.mult))
				{
					this.star.y = 0;
				}
				else if (this.star.y < 0)
				{
					this.star.y = (canvas.height * this.mult);
				}
			}
		}
	}
}
var stars;
