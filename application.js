Lambda.Application = function (func, arg) {
  this.func = func;
  this.arg = arg;
};

Lambda.Application.prototype = Object.create(Lambda.lambda_prototype);

Lambda.Application.prototype.step = function () {
  if (!this.func.isNormal()) {
    return new Lambda.Application(this.func.step(), this.arg);
  } else if (this.func.apply) {
    return this.func.apply(this.arg);
  } else {
    return this;
  }
};

Lambda.Application.prototype.using = function (scope) {
  return new Lambda.Application(this.func.using(scope), this.arg.using(scope));
};

Lambda.Application.prototype.isNormal = function () {
  return this.func.isNormal() && !this.func.apply;
};

Lambda.Application.prototype.toString = function () {
  return '(' + this.func + ' ' + this.arg + ')';
};

Lambda.Application.prototype.toJavaScript = function (indent) {
  indent = indent || '';
  return '(' + this.func.toJavaScript(indent) + ')(' +
    this.arg.toJavaScript(indent) + ')';
};