function Timer(fps)
{
	this.fps = fps;
	var last_frame = new Date().getTime();
	var framerate = 1000 / this.fps;
	var leftover = 0.0;
	var frames = 0;
	this.interval;
	
	this.Run = function()
	{
		this.interval = setInterval(this.Tick, 1000/this.fps);
	}
	
	this.Halt = function()
	{
		clearInterval(this.interval);
	}

	this.Tick = function()
	{
		var this_frame = new Date().getTime();
		var this_since = (this_frame - last_frame) + leftover;
		var catch_up = Math.floor(this_since / framerate);
		
		for(i = 0 ; i < catch_up; i++)
		{
			Update();
			frames++;
		}
		
		Draw();
		
		leftover = this_since - (catch_up * framerate);
		last_frame = this_frame;
	}
}
