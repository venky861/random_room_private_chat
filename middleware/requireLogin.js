const jwt = require("jsonwebtoken")
const keys = require("../config/keys.json")

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token")

  if (!token) {
    return res.status(401).json({ erros: "token does not exist" })
  }

  try {
    const decode = jwt.verify(token, keys.jwtSecret)
    req.user = decode.user
    next()
  } catch (err) {
    res.status(500).json({ errors: "Invalid token , authorization denied" })
  }
}
