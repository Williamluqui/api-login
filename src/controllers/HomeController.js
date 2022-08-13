

class HomeController {
  async index(req, res) {
    res.send("App Express!");
  }
}

module.exports = new HomeController();