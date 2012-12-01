function WaterWellBuilding(pos_x, pos_y, player)
{
	this._proto = WaterWellBuilding;
	this.player = player;
	
	this._water_level = 10000;
	this._water_level_max = 10000;
	
	this.setPosition(pos_x, pos_y);
	
	this.run = function() {}
	
	this.draw = function()
	{
		game.objDraw.addElement(DRAW_LAYER_GBUILD, this.position.x, {
			res_key: this._proto.res_key,
			src_x: (this.health == 0) ? this._proto.image_size.x : 0,
			src_y: 0,
			src_width: this._proto.image_size.x,
			src_height: this._proto.image_size.y,
			x: this.position.x - this._proto.image_padding.x - game.viewport_x,
			y: this.position.y - this._proto.image_padding.y - game.viewport_y
		});
	}
	
	//Custom selection bar
	this.drawSelection = function(is_onmouse)
	{
		this._drawSelectionStandart(is_onmouse);
		
		var top_x = this.position.x - 4 - game.viewport_x,
			top_y = this.position.y + CELL_SIZE*this._proto.cell_size.y - 33 - game.viewport_y, 
			water_h = parseInt((this._water_level/this._water_level_max)*34);
			
		game.viewport_ctx.fillStyle = '#000000';
		game.viewport_ctx.fillRect(top_x, top_y, 4, 36);
		
		if (this._water_level_max > this._water_level)
		{
			game.viewport_ctx.fillStyle = '#bbbbbb';
			game.viewport_ctx.fillRect(top_x + 1, top_y + 1, 2, 34);
		}
		
		game.viewport_ctx.fillStyle = '#00a5ff';
		game.viewport_ctx.fillRect(top_x + 1, top_y + 35 - water_h, 2, water_h);
	}
}

WaterWellBuilding.prototype = new AbstractBuilding();

WaterWellBuilding.res_key = 'water_well';
WaterWellBuilding.obj_name = 'Pure Water Spring';
WaterWellBuilding.cost = 0;
WaterWellBuilding.sell_cost = 0;
WaterWellBuilding.health_max = 100;
WaterWellBuilding.build_time = 0;
WaterWellBuilding.energy = 0;
WaterWellBuilding.enabled = false;
WaterWellBuilding.count = 0;

WaterWellBuilding.cell_size = {x: 3, y: 3};
WaterWellBuilding.cell_matrix = [1,1,1,1,1,1,1,1,1];
WaterWellBuilding.move_matrix = [0,0,0,0,0,0,0,0,0];
WaterWellBuilding.cell_padding = {x: 0, y: 0};
WaterWellBuilding.image_size = {x: 72, y: 68};
WaterWellBuilding.image_padding = {x: 0, y: -6};
WaterWellBuilding.require_building = [];

WaterWellBuilding.upgradable = false;

WaterWellBuilding.loadResources = function(){
	AbstractBuilding.loadResources(this);
};