const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller")

router.post("/geofence", controller.geofence);

module.exports = router;