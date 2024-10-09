const { verify } = require("jsonwebtoken")
const authConfig = require("../config/auth")

const AppError = require("../utils/AppError")

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT not informed!", 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id)
    }

    return next()
  }
  catch {
    throw new AppError("Invalid JWT token!", 401)
  }
}

module.exports = ensureAuthenticated