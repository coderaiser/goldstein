(() => {
  // ~1.js
  var a = () => {
    throw "hello";
  };
  if (a > 2) {
    log("hello");
  }
})();
