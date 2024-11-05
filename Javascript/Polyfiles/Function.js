let obj = {
  name: "Testing User",
  method: function (job, org) {
    console.log(`Username: ${this.name} is a ${job} at ${org}`);
  },
  arrowMethod: (job, org) => {
    console.log(`Username: ${this.name} is a ${job} at ${org}`);
  },
};

obj.method("Developer", "Meta"); // Testing User is a Developer at Meta
obj.arrowMethod("Developer", "Meta"); // undefined is a Developer at Meta

// Call
let newObj = {
  name: "Main User",
};

obj.method.call(newObj, "Developer", "Meta"); // Main User is a Developer at Meta

// Apply

obj.method.apply(newObj, ["Developer", "Meta"]); // Main User is a Developer at Meta

// Bind

let bindFun = obj.method.bind(newObj);
bindFun("Developer", "Meta"); // Main User is a Developer at Meta

let bindFun_1 = obj.method.bind(newObj, "Developer", "Meta");
bindFun_1(); // Main User is a Developer at Meta

// Polyfill for bind

Function.prototype.myBind = function (refObj, ...params) {
  const fn = this;

  return function (...args) {
    fn.call(refObj, ...params, ...args);
  };
};

let bindFun_2 = obj.method.myBind(newObj);
bindFun_2("Developer", "Google"); // Main User is a Developer at Meta
