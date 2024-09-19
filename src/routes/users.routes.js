const { Router } = require("express")
const usersRoutes = Router()

const UsersController = require("../controllers/usersController")
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)

module.exports = usersRoutes