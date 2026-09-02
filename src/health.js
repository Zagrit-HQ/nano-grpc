module.exports = {
  check: (_call, callback) => {
    callback(null, { status: 1 });
  },
  watch: (call) => {
    call.write({ status: 1 });
    call.end();
  },
};
