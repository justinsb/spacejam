var page = require('webpage').create();
var system = require('system');
var platform = system.args[1] || system.env.TEST_PLATFORM || "local";
console.log("Running Meteor tests in PhantomJS... " + system.env.ROOT_URL);
page.onConsoleMessage = function (message) {
  console.log(message);
};
page.open(system.env.ROOT_URL + platform);
setInterval(function () {
  var done = page.evaluate(function () {
    if (typeof TEST_STATUS !== 'undefined')
      return TEST_STATUS.DONE;
    return typeof DONE !== 'undefined' && DONE;
  });
  if (done) {
    var failures = page.evaluate(function () {
      if (typeof TEST_STATUS !== 'undefined')
        return TEST_STATUS.FAILURES;
      if (typeof FAILURES === 'undefined') {
        return 1;
      }
      return 0;
    });
    phantom.exit(failures ? 2 : 0);
  }
}, 500);