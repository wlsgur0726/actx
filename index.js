function CtxObj(tasks)
{
	this.m_tasks = tasks;
}

CtxObj.prototype.Next = function()
{
	setImmediate(function(ctx) {
		var task = ctx.m_tasks.shift();
		if (task)
			task(ctx);
	}, this);
};

CtxObj.prototype.PushFront = function(task)
{
	this.m_tasks.unshift(task);
};

CtxObj.prototype.PushBack = function(task)
{
	this.m_tasks.push(task);
};

CtxObj.prototype.Dispose = function()
{
	this.m_tasks = [];
}

exports.Start = function(tasks)
{
	var ctx = new CtxObj(tasks);
	ctx.Next();
}
