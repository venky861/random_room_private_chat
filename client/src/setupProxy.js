const proxy = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(proxy("/auth/google", { target: "http://localhost:5000/" }))
  app.use(proxy("/sms", { target: "http://localhost:5000/" }))
  app.use(proxy("/token", { target: "http://localhost:5000/" }))
  app.use(proxy("/messages", { target: "http://localhost:5000/" }))
}
