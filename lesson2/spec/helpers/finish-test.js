module.exports = (done) => (err, res) => {
  if (err) {
    done.fail(err);
  } else {
    done();
  }
};
