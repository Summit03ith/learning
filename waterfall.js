const waterfall = require("async-waterfall");

const waterfallFun = () => {
  waterfall(
    [
      function (callback) {
        callback(null, "one", "two");
      },
      function (arg1, arg2, callback) {
        console.log(arg1, arg2);
        callback(null, "three");
      },
      function (arg1, callback) {
        // arg1 now equals 'three'
        console.log(arg1);
        callback(null, "done");
      },
    ],
    function (err, result) {
      // result now equals 'done'
      if (err) return err;
      console.log(result, "result");
      return result;
    }
  );
};

module.exports = {
  waterfallFun,
};
