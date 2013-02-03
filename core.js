Lambda = {
  exec: function (string) {
    return this.parse(string).exec();
  },

  parse: function (string) {
    var re, match = true, stack, typestack, type, x, e, f, a;
    re = /\(\\([^(\\) ]+)|\(|[^(\\) ]+| |\)/g;
    stack = [];
    typestack = [];

    match = re.exec(string);
    while (match) {
      if (/\(\\/.test(match[0])) { // Start abstraction
        typestack.push('abstraction');
        stack.push(match[1]);
      } else if (/\(/.test(match[0])) { // Start application
        typestack.push('application');
      } else if (/ /.test(match[0])) { // Delimiter (abstraction/application)
        // Do nothing
      } else if (/\)/.test(match[0])) { // End abstraction or application
        type = typestack.pop();
        if (type === 'application') {
          a = stack.pop();
          f = stack.pop();
          stack.push(new Lambda.Application({f: f, a: a}));
        } else if (type === 'abstraction') {
          e = stack.pop();
          x = stack.pop();
          stack.push(new Lambda.Abstraction({x: x, e: e}));
        }
      } else { // Variable
        stack.push(new Lambda.Variable(match[0]));
      }
      match = re.exec(string);
    }
    return stack.pop();
  }
};
