function Quadtree(x, y, width, height, maxLevel, curLevel) {
	//(x, y) position from top left corner of box
	this.xPos     = xPos;
	this.yPos     = yPos;
	this.width    = width;
	this.height   = height;

	this.maxLevel = maxLevel;
	this.curLevel = curLevel;

	this.children = [];

	this.vertices = [];
	this.faces    = [];
}

Quadtree.prototype.subdivide = function() {
	var newLevel = this.curlevel + 1;
	var newWidth = this.width / 2;
	var newHeight = this.height / 2;

	//Create top left node
	this.children.push(new Quadtree(this.x, this.y, newWidth, newHeight, maxLevel, newLevel));

	//Create top right node
	this.children.push(new Quadtree(this.x + newWidth, this.y, newWidth, newHeight, maxLevel, newLevel));

	//Create bottom left node
	this.children.push(new Quadtree(this.x, this.y - newHeight, newWidth, newHeight, maxLevel, newLevel));

	//Create bottom right node
	this.children.push(new Quadtree(this.x + newWidth, this.y - newHeight, newWidth, newHeight, maxLevel, newLevel));
}