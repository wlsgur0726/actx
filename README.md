# actx
async context

	var actx = require('actx');

	function SomeAsyncTask(fn)
	{
		setTimeout(fn, 100);
	}

	actx.Start([
		function(ctx)
		{
			console.log('ctx 1 ' + ctx.myCustomData);
			ctx.myCustomData = 1;
			return true;
		},
		function(ctx)
		{
			console.log('ctx 2 ' + ctx.myCustomData);
			ctx.myCustomData++;
			if (ctx.myCustomData > 0)
			{
				ctx.PushFront(function(ctx)
				{
					console.log('PushFront ' + ctx.myCustomData);
					return true;
				});
				ctx.PushBack(function(ctx)
				{
					console.log('PushBack ' + ctx.myCustomData);
					return true;
				});
			}
			return true;
		},
		function(ctx)
		{
			console.log('ctx 3 ' + ctx.myCustomData);
			ctx.myCustomData++;
			SomeAsyncTask(function()
			{
				console.log('async task ' + ctx.myCustomData);
				ctx.Next();
			});
			return false;
		},
		function(ctx)
		{
			console.log('ctx 4 ' + ctx.myCustomData);
			ctx.myCustomData++;
			return true;
		},
	]);