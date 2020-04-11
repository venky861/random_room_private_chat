const express = require("express")
const router = express.Router()
const Nexmo = require("nexmo")
const requireLogin = require("../middleware/requireLogin")

const nexmo = new Nexmo(
  {
    apiKey: "892a5584",
    apiSecret: "iysLEahSFOWDY1GM",
  },
  { debug: true }
)

router.post("/check", (req, res) => {
  const { name } = req.body
  console.log(name)
})

router.post("/sms", requireLogin, (req, res) => {
  const { num, textmessage } = req.body
  console.log(num, textmessage)
  nexmo.message.sendSms(
    "NEXMO",
    num,
    textmessage,
    { type: "unicode" },
    (err, data) => {
      if (err) throw error
      res.send("message sent")
      // res.send(data.messages[0].to)
    }
  )
})

module.exports = router
