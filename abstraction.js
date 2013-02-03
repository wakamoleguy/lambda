Lambda.Abstraction = function (param, expr) {
  this.param = param;
  this.expr = expr;
};

Lambda.Abstraction.prototype = Object.create(Lambda.lambda_prototype);

Lambda.Abstraction.prototype.apply = function (val) {
  var myScope = {};  // Functions create a new scope when applied
  myScope[this.param] = val;  // Substitute the argument for the parameter
  return this.expr.using(myScope);
};

Lambda.Abstraction.prototype.using = function (scope) {
  var myScope = Object.create(scope); // Inherit scope from parent
  myScope[this.param] = new Lambda.Variable(this.param); // Bind your parameter
  return new Lambda.Abstraction(this.param, this.expr.using(myScope));
};

Lambda.Abstraction.prototype.toString = function () {
  return '(\\' + this.param + ' ' + this.expr + ')';
};

Lambda.Abstraction.prototype.toJavaScript = function (indent) {
  indent = indent || '';
  return 'function (' + this.param + ') {\n' + indent + '  return ' +
    this.expr.toJavaScript(indent + '  ') + ';\n' + indent + '}';
};