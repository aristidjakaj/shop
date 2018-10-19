const jwt = require(`jsonwebtoken`);

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(` `)[1];
  const decoded = jwt.verify(token, `process.env.JWT_KEY`);
  if (decoded.email === `aristidjakaj3@gmail.com`){
    next();
  } else {
    return res.status(401).json({
      message: `You are not authorized for this kind of action`
    });
  }
}
