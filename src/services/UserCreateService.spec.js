const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')

const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };

    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)
    const userCreated = await userCreateService.execute(user)

    console.log(userCreated)
    expect(userCreated).toHaveProperty("id")
  })

  it("User created email shouldn't already exist", async () => {
    const user1 = {
      name: "User teste 1",
      email: "user@test.com",
      password: "123"
    }

    const user2 = {
      name: "User teste 2",
      email: "user@test.com",
      password: "456"
    }

    const userRepositoryInMemory = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepositoryInMemory)

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email already registered!"))
  })
})