var actx = require('../');

actx.Start(
	function(ctx){
		console.log('ctx 1 ' + ctx.myCustomData);
		//throw Error('exception test');
		ctx.myCustomData = 1;
		return ctx.Next();
	},
	function(ctx){
		console.log('ctx 2 ' + ctx.myCustomData++);
		setTimeout(function() {
			console.log('async task ' + ctx.myCustomData++);
			//return ctx.Error(Error('error test'));
			return ctx.Next();
		}, 100);
	},
	function(ctx){
		console.log('ctx 3 ' + ctx.myCustomData++);
		if (ctx.myCustomData > 0){
			ctx.PushFront([
				function(ctx){
					console.log('PushFront1 ' + ctx.myCustomData++);
					return ctx.Next();
				},
				function(ctx){
					console.log('PushFront2 ' + ctx.myCustomData++);
					return ctx.Next();
				},
			]);
			ctx.PushBack([
				function(ctx){
					console.log('PushBack1 ' + ctx.myCustomData++);
					return ctx.Next();
				},
				function(ctx){
					console.log('PushBack2 ' + ctx.myCustomData++);
					return ctx.Next();
				},
			]);
		}
		return ctx.Next();
	},
	function(ctx){
		console.log('ctx 4 ' + ctx.myCustomData++);
		return ctx.Next();
	}
)
.OnFin(function(err, ctx){
	console.log('OnFin ' + ctx.myCustomData);
	console.log(err ? err.stack : 'success');
});

/**** Result ****
ctx 1 undefined
ctx 2 1
async task 2
ctx 3 3
PushFront1 4
PushFront2 5
ctx 4 6
PushBack1 7
PushBack2 8
OnFin 9
success
*/