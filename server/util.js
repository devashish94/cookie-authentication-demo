const { readFileSync, writeFileSync } = require("fs")

exports.getUser = function (username) {
  const usersJSON = readFileSync("./db.json")
  const users = JSON.parse(usersJSON)

  if (users[username]) {
    return users[username]
  }
  return null
}

exports.addUser = function ({ username, password }) {
  const usersJSON = readFileSync("./db.json", "utf8")
  const users = JSON.parse(usersJSON)
  users[username] = { username, password }
  writeFileSync("./db.json", JSON.stringify(users))
  return { username, password }
}

exports.allUsers = function () {
  const usersJSON = readFileSync("./db.json", "utf-8")
  return JSON.parse(usersJSON)
}

