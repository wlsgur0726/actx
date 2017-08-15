# actx
async context

	var actx = require('../');
	
	actx.Start([
		function(ctx)
		{
			console.log('ctx 1 ' + ctx.myCustomData);
			ctx.myCustomData = 1;
			return ctx.Next();
		},
		function(ctx)
		{
			console.log('ctx 2 ' + ctx.myCustomData);
			ctx.myCustomData++;
			setTimeout(function() {
				console.log('async task ' + ctx.myCustomData);
				return ctx.Next();
			}, 100);
		},
		function(ctx)
		{
			console.log('ctx 3 ' + ctx.myCustomData);
			ctx.myCustomData++;
			if (ctx.myCustomData > 0)
			{
				ctx.PushFront(function(ctx)
				{
					console.log('PushFront ' + ctx.myCustomData);
					return ctx.Next();
				});
				ctx.PushBack(function(ctx)
				{
					console.log('PushBack ' + ctx.myCustomData);
					return ctx.Next();
				});
			}
			return ctx.Next();
		},
		function(ctx)
		{
			console.log('ctx 4 ' + ctx.myCustomData);
			ctx.myCustomData++;
			return ctx.Next();
		},
	]);
	
	/**** Result ****
	ctx 1 undefined
	ctx 2 1
	async task 2
	ctx 3 2
	PushFront 3
	ctx 4 3
	PushBack 4
	*/