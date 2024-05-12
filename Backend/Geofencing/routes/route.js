const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controller")

router.post("/geofence", controller.geofence);
router.post("/userLocation", controller.addUserLocation)

module.exports = router;