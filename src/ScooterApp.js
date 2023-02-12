const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      Piccadily: [],
      Victoria: [],
      Oxford: [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (age < 18) {
      throw new Error("too young to register");
    }
    for (const user in this.registeredUsers) {
      if (user === username) {
        throw new Error(`username ${username} is already in use`);
      }
    }

    let newUser = new User({
      username: username,
      password: password,
      age: age,
    });
    this.registeredUsers[username] = newUser;
    console.log(`user ${newUser.username} has been registered`);

    return newUser;
  }

  loginUser(username, password) {
    for (const user in this.registeredUsers) {
      if (user === username) {
        this.registeredUsers[user].login(password);
        console.log(`user ${username} has been logged in`);

        return;
      }
    }

    throw new Error("Username is incorrect");
  }

  logoutUser(username) {
    for (const user in this.registeredUsers) {
      if (user === username) {
        this.registeredUsers[user].logout();
        console.log(`user ${username} is logged out`);

        return;
      }
    }

    throw new Error("no such user is logged in");
  }

  createScooter(station) {
    for (const stationName in this.stations) {
      if (stationName === station) {
        let newScooter = new Scooter(station);
        this.stations[station].push(newScooter);
        console.log(`created new scooter #${newScooter.serial}`);

        return newScooter;
      }
    }

    throw new Error("no such station");
  }

  rentScooter(scooter, user) {
    // check each station
    for (const stationName in this.stations) {
      // check current stations array for scooter
      for (let i = 0; i < this.stations[stationName].length; i++) {
        if (this.stations[stationName][i] === scooter) {
          scooter.rent();
          this.stations[stationName].splice(i, 1);
          scooter.user = user;
          console.log(`scooter #${scooter.serial} is rented`);

          return;
        }
      }
    }

    throw new Error(`scooter #${scooter.serial} already rented`);
  }

  dockScooter(scooter, station) {
    for (const stationName in this.stations) {
      // first check if station exists
      if (stationName === station) {
        // then check if stations array has scooter already
        for (let i = 0; i < this.stations[station].length; i++) {
          if (this.stations[station][i] === scooter) {
            throw new Error(
              `scooter #${scooter.serial} is already at ${station}`
            );
          }
        }

        // if scooter is not found then dock scooter
        scooter.dock(station);
        this.stations[station].push(scooter);
        console.log(`scooter #${scooter.serial} is docked`);

        return;
      }
    }

    throw new Error("no such station");
  }

  print() {
    for (const user in this.registeredUsers) {
      console.log(`Registered User: ${this.registeredUsers[user].username}`);
    }

    for (const station in this.stations) {
      console.log(station);
      console.log(
        `${this.stations[station].length} scooters at ${station} station`
      );
    }
  }
}

module.exports = ScooterApp;
