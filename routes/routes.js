
let express = require("express");
let app = express();
let router = express.Router();

let HomeController = require("../controllers/HomeController");
let UserController = require("../controllers/UserController");

router.get('/',HomeController.index);
router.post('/user',UserController.created);
router.get('/user',UserController.index);
router.get ('/user/:id',UserController.findUser)

module.exports = router;