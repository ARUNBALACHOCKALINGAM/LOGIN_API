const userController = require("./controllers/userController")

const router = require("express").Router()
const cors = require("cors")

router.use(cors())

router.get("/", (req, res) => res.json("Server up and running at PORT 3000"))


router.post('/login',userController.login)



module.exports = router