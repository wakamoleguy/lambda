Lambda.lambda_prototype = {
  exec: function () {
    var that = this;
    while (!that.isNormal) {
      that = that.step();
    }
    return that;
  },

  step: function () {
    return this;
  },

  using: function (scope) {
    return this;
  },

  toString: function () {
    return '';
  },

  toJavaScript: function () {
    return '';
  },

  isNormal: function () {
    return true;
  }
};