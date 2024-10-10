const { Router } = require("express")
const usersRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../config/upload")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const upload = multer(uploadConfig.MULTER)

const UserAvatarController = require("../controllers/UserAvatarController")
const UsersController = require("../controllers/usersController")
const userAvatarController = new UserAvatarController()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes