const validator = require("validator")
const bcrypt = require("bcrypt")

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}
    this.data = {
      username: this.data.username,
      password: this.data.password,
    }
}


User.prototype.validate = function() {
    return new Promise(async (resolve, reject) => {
      if (this.data.username == "") {this.errors.push("You must provide a username.")}
      if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}
      if (this.data.password == "") {this.errors.push("You must provide a password.")}
      if (this.data.password.length !== 6) {this.errors.push("Password must be at least 12 characters.")}
      if (this.data.username.length > 0 && this.data.username.length < 6) {this.errors.push("Username must be at least 6 characters.")}
      if (this.data.username.length > 12) {this.errors.push("Username cannot exceed 12 characters.")}
      resolve()
    })
}


User.prototype.login = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate()
        if (!this.errors.length) {
          resolve(this.data)
        } else {
          reject(this.errors)
        }
      })
  }
module.exports = User