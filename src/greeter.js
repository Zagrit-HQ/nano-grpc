const requestedName = (call) => call.request.name.trim() || "World";

module.exports = {
  sayHello: (call, callback) => {
    callback(null, { message: "Hello " + requestedName(call) });
  },
  sayHi: (call, callback) => {
    callback(null, { message: "Hi " + requestedName(call) });
  },
};
