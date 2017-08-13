function CtxObj(tasks)
{
	this.m_tasks = tasks;
	this.m_disabled = false;
}

CtxObj.prototype.Next = function()
{
	if (this.m_disabled)
		throw 'disabled context';
	if (this.m_tasks.length == 0)
		return;
	var task = this.m_tasks.shift();
	if (task(this))
		setImmediate(function(ctx){ctx.Next();}, this);
};

CtxObj.prototype.PushFront = function(task)
{
	this.m_tasks.unshift(task);
};

CtxObj.prototype.PushBack = function(task)
{
	this.m_tasks.push(task);
};

CtxObj.prototype.Disable = function()
{
	this.m_disabled = true;
}

exports.Start = function(tasks)
{
	var ctx = new CtxObj(tasks);
	ctx.Next();
}
