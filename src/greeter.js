module.exports = {
  sayHello: (call, callback) => {
    callback(null, { message: "Hello " + call.request.name });
  },
  sayHi: (call, callback) => {
    callback(null, { message: "Hi " + call.request.name });
  },
};
