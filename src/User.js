class User {
  constructor(userObj) {
    this.username = userObj.username;
    this.password = userObj.password;
    this.age = userObj.age;
    this.loggedIn = false;
  }

  login(password) {
    if (password === this.password) {
      this.loggedIn = true;
    } else {
      throw new Error("incorrect password");
    }
  }

  logout() {
    this.loggedIn = false;
  }
}

module.exports = User;
