
let express = require("express");
let router = express.Router();

let HomeController = require("../controllers/HomeController");
let UserController = require("../controllers/UserController");

router.get('/',HomeController.index);
router.post('/user',UserController.created);
router.get('/user',UserController.index);
router.get ('/user/:id',UserController.findUser);
router.put('/user',UserController.edit);

module.exports = router;