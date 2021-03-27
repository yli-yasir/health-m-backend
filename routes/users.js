const router = require("express").Router();
const { authenticateUser, grantToken, verifyToken } = require("../middleware/auth");


router.post("/login", authenticateUser, grantToken);

router.get("/login", verifyToken, (_, res) => res.sendStatus(200));


module.exports = router;