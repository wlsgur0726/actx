function CtxObj(tasks){
	this.m_tasks = tasks;
}

function CallOnFin(err, ctx){
	ctx.Dispose();
	if (ctx.m_onFin){
		var onFin = ctx.m_onFin;
		ctx.m_onFin = null;
		onFin(err, ctx);
	}
	else if (err) {
		throw err;
	}
}

CtxObj.prototype.Next = function(){
	setImmediate(function(ctx){
		var task = ctx.m_tasks.shift();
		if (task) {
			try {task(ctx);} catch(e){CallOnFin(e, ctx);}
		}
		else {
			CallOnFin(null, ctx);
		}
	}, this);
	return this;
};

CtxObj.prototype.PushFront = function(task){
	this.m_tasks = task.concat(this.m_tasks);
	return this;
};

CtxObj.prototype.PushBack = function(task){
	this.m_tasks = this.m_tasks.concat(task);
	return this;
};

CtxObj.prototype.Dispose = function(){
	this.m_tasks = [];
};

CtxObj.prototype.Error = function(err){
	CallOnFin(err, this);
	return this;
};

CtxObj.prototype.OnFin = function(onFin){
	this.m_onFin = onFin;
	return this;
};

exports.Start = function(){
	var tasks;
	if (arguments.length==1 && Array.isArray(arguments[0]))
		tasks = arguments[0];
	else
		tasks = [...arguments];
	var ctx = new CtxObj(tasks);
	ctx.Next();
	return ctx;
}
