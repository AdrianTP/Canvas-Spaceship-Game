// Vector Class
// A coordinate vector (with start in the origin and a given end)
// http://en.wikipedia.org/wiki/Coordinate_vector
// @param x The x coordinate of the vector
// @param y The y coordinate of the vector
function Vector(x, y)
{
	this.x = x;
	this.y = y;
   
	// Calculate the length of a the vector
	// @param void
	// @return vector
	this.Length = function Length()
	{
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}
   
	// Substract 2 vectors
	// @param v A vector
	// @return vector
	this.Substract = function Substract(v)
	{
		return new toolbox.Vector(this.x - v.x, this.y - v.y);
	}
   
	// Calculate a vector dot product
	// @param v A vector
	// @return The dot product
	this.DotProduct = function DotProduct(v)
	{
		return (this.x * v.x + this.y * v.y);
	}
   
	// Normalize the vector
	// http://www.fundza.com/vectors/normalize/index.html
	// http://programmedlessons.org/VectorLessons/vch04/vch04_4.html
	// @param void
	// @return vector
	this.Normalize = function Normalize()
	{
		var length = this.Length();
		this.x = this.x / length;
		this.y = this.y / length;
	}
   
	// Calculate the perpendicular vector (normal)
	// http://en.wikipedia.org/wiki/Perpendicular_vector
	// @param void
	// @return vector
	this.Perp = function Perp()
	{
		return new Vector(-this.y, this.x);
	}
}
