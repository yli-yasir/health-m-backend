const router = require("express").Router();
const { authenticateUser, grantToken,revokeToken } = require("../middleware/auth");

router.post("/login", authenticateUser, grantToken, (req, res) =>{
  res.sendStatus(200);
}
);

router.post("/logout",revokeToken,(req,res)=>res.sendStatus(200));

module.exports = router;