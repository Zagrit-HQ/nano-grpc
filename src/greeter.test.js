const assert = require("node:assert/strict");
const test = require("node:test");
const greeter = require("./greeter");

test("greets the requested person", () => {
  for (const [method, message] of [
    ["sayHello", "Hello Depot"],
    ["sayHi", "Hi Depot"],
  ]) {
    let response;
    greeter[method]({ request: { name: "Depot" } }, (error, reply) => {
      assert.equal(error, null);
      response = reply;
    });
    assert.deepEqual(response, { message });
  }
});

test("greets World when the requested name is blank", () => {
  for (const name of ["", "   "]) {
    for (const [method, message] of [
      ["sayHello", "Hello World"],
      ["sayHi", "Hi World"],
    ]) {
      let response;
      greeter[method]({ request: { name } }, (error, reply) => {
        assert.equal(error, null);
        response = reply;
      });
      assert.deepEqual(response, { message });
    }
  }
});
