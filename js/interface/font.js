function FontDraw(font_name, size)
{
	var _table = {}, _cache_table = {};
	
	function constructor()
	{
		var img = game.resources.get(font_name), cur_char = 32, cur_start = 0, pos = 0;
		
		var tmp_canvas = $('<canvas width="' + img.width + '" height="' + size + '"></canvas>');
		var tmp_ctx = tmp_canvas.get(0).getContext('2d');
		
		tmp_ctx.drawImage(img, 0, 0);
		var img_data = tmp_ctx.getImageData(0, 0, img.width, size);
		
		while (pos<img.width && cur_char<127)
		{
			var offset = pos*4;
			if (img_data.data[offset]==255 && img_data.data[offset+1]==0 && img_data.data[offset+2]==255)
			{
				_table[cur_char] = [cur_start, pos - cur_start];
				cur_char++;
				cur_start = pos + 1;
			}
			pos++;
		}
	}
	
	this.getDataUrl = function(text)
	{
		var key = this._checkCache(text, '');
		return _cache_table[key].canvas.toDataURL();
	};
	
	this.drawOnCanvas = function(text, ctx, x, y, color, align, align_width)
	{
		var key = this._checkCache(text, color);
		
		switch (align)
		{
			case 'center':
				x += parseInt((align_width - _cache_table[key].width)/2);
				break;
			case 'right':
				x += (align_width - _cache_table[key].width);
				break;
			default:
				//No changes required for other types
				break;
		}
		
		ctx.drawImage(
			_cache_table[key].canvas, 0, 0, _cache_table[key].width, size,
			x+0.5, y+0.5, _cache_table[key].width, size
		);
	};
	
	this.getSize = function(text)
	{
		var summ = 0;
		for (var i=0; i<text.length; ++i)
			summ += _table[text.charCodeAt(i)][1];
		
		return summ;
	};
	
	this._checkCache = function(text, color)
	{
		var key = 'chached_text_'+text+color;
		
		if (typeof _cache_table[key] === 'undefined')
		{
			var canvas = $('<canvas width="500" height="' + size + '"></canvas>'), twidth = this._bufferDraw(canvas, text, color);
			canvas.width = twidth;
			_cache_table[key] = {
				width: twidth,
				canvas: canvas.get(0)
			};
		}
		
		return key;
	};
	
	this._bufferDraw = function(canvas, text, color)
	{
		var ctx = canvas.get(0).getContext('2d'), current_position = 0, ascii, letter, 
			color_offset = this._getColorOffset(color), font = game.resources.get(font_name);
		
		for (var i=0; i<text.length; ++i)
		{
			ascii = text.charCodeAt(i);
			letter = _table[ascii];
			ctx.drawImage(
				font, letter[0], color_offset, letter[1], size, 
				current_position, 0, letter[1], size
			);
			current_position += letter[1];
		}
		
		return current_position;
	};
	
	this._getColorOffset = function(color)
	{
		switch (color)
		{
			case 'red':
				return 14;
			case 'green':
				return 28;
			default:
				return 0;
		}
	};

	constructor();
}