Lambda.Variable = function (name) {
  this.name = name;
};

Lambda.Variable.prototype = Object.create(Lambda.lambda_prototype);

Lambda.Variable.prototype.using = function (scope) {
  return scope[this.name] ? scope[this.name] : this;
};

Lambda.Variable.prototype.toString =
  Lambda.Variable.prototype.toJavaScript = function () {
    return this.name;
  };
