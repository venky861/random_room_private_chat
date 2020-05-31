const proxy = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(proxy("/auth/google", { target: "http://localhost:5000/" }))
  app.use(proxy("/sms", { target: "http://localhost:5000/" }))
  app.use(proxy("/token", { target: "http://localhost:5000/" }))
  // app.use(proxy("/messages", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/logout", { target: "http://localhost:5000/" }))
  app.use(proxy("/auth/all_user", { target: "http://localhost:5000/" }))
  app.use(proxy("/auth/current_user", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/privatemsg", { target: "http://localhost:5000/" }))
  app.use(proxy("/api/dbuserstatus", { target: "http://localhost:5000/" }))
  app.use(
    proxy("/api/dbuserstatus/:user_id", { target: "http://localhost:5000/" })
  )
}
