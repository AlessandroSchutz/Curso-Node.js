module.exports.checkAuth = function (req, res, next) {
  const userId = req.session.userid;

  if (!userId) {
    req.flash("message", "Realize a autenticação!");
    res.redirect("/login");
  }

  next();
};
