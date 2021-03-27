const router = require("express").Router();
const { authenticateUser, grantToken, revokeToken, verifyToken } = require("../middleware/auth");

const sendSuccess = (_, res) => res.sendStatus(200);

router.post("/login", authenticateUser, grantToken, sendSuccess);

router.get("/login", verifyToken, sendSuccess);

router.post("/logout", revokeToken, sendSuccess);

module.exports = router;