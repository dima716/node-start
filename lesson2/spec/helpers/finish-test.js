module.exports = (done) => (err) => {
  if (err) {
    done.fail(err);
  } else {
    done();
  }
};
