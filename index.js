const express = require("express");
const waterfall = require("async-waterfall");
const parallel = require("async-parallel");
const series = require("async-series");
const { waterfallFun } = require("./waterfall");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/waterfall", (req, res) => {
  const datas = async () => {
    let d = (await waterfallFun()).then((r) => r);
    console.log(d, "DDDDDDDDDDDDDDDDDd");
    return d;
  };
  //   let result = datas.then((r) => {
  //     console.log(r);
  //     return r;
  //   });
  console.log(datas);
  // await waterfallFun();
  // console.log(waterfallFun())
  //   let data =
  //   console.log(data, "main");
  //   res.send(datas);
});

//? &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

app.get("/water", (req, res) => {
  waterfall(
    [
      function (callback) {
        callback(null, "one", "two");
      },
      function (arg1, arg2, callback) {
        if (arg1 !== arg2) {
          callback("error");
        } else {
          console.log(arg1, arg2);
          callback(null, "three");
        }
      },
      function (arg1, callback) {
        // arg1 now equals 'three'
        console.log(arg1);
        callback(null, "done");
      },
    ],
    function (err, result) {
      // result now equals 'done'
      if (err) {
        console.warn(err);
        return res.send(err);
      }
      console.log(result, "result");
      return res.send(result);
    }
  );
});

//TODO --- Paraller----  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo

//! Paraller Operations for async function with callback ,
app.get("/parallarcallback", (req, res) => {
  parallel(
    [
      function (callback) {
        setTimeout(function () {
          callback(null, "one");
        }, 200);
      },
      function (callback) {
        setTimeout(function () {
          callback(null, "two");
        }, 100);
      },
    ],
    function (err, results) {
      console.log(results);
      // results is equal to ['one','two'] even though
      // the second function had a shorter timeout.
      return res.send(results);
    }
  );
});

app.get("/parallarObj_noArray", (req, res) => {
  //{key1:fun(cb1){}, key2:fun(cb2){}}
  parallel(
    {
      one: function (callback) {
        setTimeout(function () {
          callback(null, 1);
        }, 200);
      },
      two: function (callback) {
        setTimeout(function () {
          callback(null, 2);
        }, 100);
      },
    },
    function (err, results) {
      console.log(results);
      // results is equal to: { one: 1, two: 2 }
    }
  );
});
//! Paraller Operations for async function with promises ,
app.get("/parallarPromisesArray", (req, res) => {
  parallel([
    function (callback) {
      setTimeout(function () {
        callback(null, "one");
      }, 200);
    },
    function (callback) {
      setTimeout(function () {
        callback(null, "two");
      }, 100);
    },
  ])
    .then((results) => {
      console.log(results);
      // results is equal to ['one','two'] even though
      // the second function had a shorter timeout.
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/parallarPromisesObj", (req, res) => {
  async
    .parallel({
      one: function (callback) {
        setTimeout(function () {
          callback(null, 1);
        }, 200);
      },
      two: function (callback) {
        setTimeout(function () {
          callback(null, 2);
        }, 100);
      },
    })
    .then((results) => {
      console.log(results);
      // results is equal to: { one: 1, two: 2 }
    })
    .catch((err) => {
      console.log(err);
    });
});

//! Paraller Operations for async function with Async Await try catch block
app.get("/parallarAsyncAwaitArray", (req, res) => {
  async () => {
    try {
      let results = await async.parallel([
        function (callback) {
          setTimeout(function () {
            callback(null, "one");
          }, 200);
        },
        function (callback) {
          setTimeout(function () {
            callback(null, "two");
          }, 100);
        },
      ]);
      console.log(results);
      // results is equal to ['one','two'] even though
      // the second function had a shorter timeout.
    } catch (err) {
      console.log(err);
    }
  };
});

app.get("/parallarAsyncAwaitObj", (req, res) => {
  async () => {
    try {
      let results = await async.parallel({
        one: function (callback) {
          setTimeout(function () {
            callback(null, 1);
          }, 200);
        },
        two: function (callback) {
          setTimeout(function () {
            callback(null, 2);
          }, 100);
        },
      });
      console.log(results);
      // results is equal to: { one: 1, two: 2 }
    } catch (err) {
      console.log(err);
    }
  };
});

//TODO --- Series----  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo

//! Series Operations for async function with callback ,
app.get("/series_callback", (req, res) => {
  series(
    [
      function (callback) {
        setTimeout(function () {
          // do some async task
          callback(null, "one");
        }, 200);
      },
      function (callback) {
        setTimeout(function () {
          // then do another async task
          callback(null, "two");
        }, 100);
      },
    ],
    function (err, results) {
      console.log(results);
      // results is equal to ['one','two']
    }
  );
});

app.get("/series_Obj_noArray", (req, res) => {
  //{key1:fun(cb1){}, key2:fun(cb2){}}
  // an example using objects instead of arrays
  series(
    {
      one: function (callback) {
        setTimeout(function () {
          // do some async task
          callback(null, 1);
        }, 200);
      },
      two: function (callback) {
        setTimeout(function () {
          // then do another async task
          callback(null, 2);
        }, 100);
      },
    },
    function (err, results) {
      console.log(results);
      // results is equal to: { one: 1, two: 2 }
    }
  );
});
//! Series Operations for async function with promises ,
app.get("/series_PromisesArray", (req, res) => {
  //Using Promises
  series([
    function (callback) {
      setTimeout(function () {
        callback(null, "one");
      }, 200);
    },
    function (callback) {
      setTimeout(function () {
        callback(null, "two");
      }, 100);
    },
  ])
    .then((results) => {
      console.log(results);
      // results is equal to ['one','two']
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/series_PromisesObj", (req, res) => {
  // an example using an object instead of an array
  series({
    one: function (callback) {
      setTimeout(function () {
        // do some async task
        callback(null, 1);
      }, 200);
    },
    two: function (callback) {
      setTimeout(function () {
        // then do another async task
        callback(null, 2);
      }, 100);
    },
  })
    .then((results) => {
      console.log(results);
      // results is equal to: { one: 1, two: 2 }
    })
    .catch((err) => {
      console.log(err);
    });
});

//! Series Operations for async function with Async Await try catch block
app.get("/series_AsyncAwaitArray", (req, res) => {
  //Using async/await
  async () => {
    try {
      let results = await series([
        function (callback) {
          setTimeout(function () {
            // do some async task
            callback(null, "one");
          }, 200);
        },
        function (callback) {
          setTimeout(function () {
            // then do another async task
            callback(null, "two");
          }, 100);
        },
      ]);
      console.log(results);
      // results is equal to ['one','two']
    } catch (err) {
      console.log(err);
    }
  };
});

app.get("/series_AsyncAwaitObj", (req, res) => {
  // an example using an object instead of an array
  async () => {
    try {
      let results = await series({
        one: function (callback) {
          setTimeout(function () {
            // do some async task
            callback(null, 1);
          }, 200);
        },
        two: function (callback) {
          setTimeout(function () {
            // then do another async task
            callback(null, 2);
          }, 100);
        },
      });
      console.log(results);
      // results is equal to: { one: 1, two: 2 }
    } catch (err) {
      console.log(err);
    }
  };
});

//? Server Listen LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
